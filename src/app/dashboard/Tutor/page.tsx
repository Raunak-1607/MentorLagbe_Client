import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenByServer } from "@/lib/GetTokenServer";
import type { Tuition } from "@/types/tuition";

export default async function TutorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-tutors immediately
  if (!session || session.user.role !== "tutor") {
    redirect("/");
  }

  const tokenRes = await getTokenByServer();
  const token = typeof tokenRes === "string" ? tokenRes : tokenRes?.token;
  const authHeaders: Record<string, string> = token
    ? { authorization: `Barer ${token}` }
    : {};

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";

  // Fetch this tutor's tuitions from the external backend (port 5000)
  let tuitionsPosted = 0;
  let activeAndApproved = 0;

  try {
    const res = await fetch(`${baseUrl}/tuition?email=${session.user.email}`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (res.ok) {
      const allTuitions = await res.json();
      const tuitions: Tuition[] = Array.isArray(allTuitions)
        ? allTuitions.filter((t: { tutorEmail?: string }) => t.tutorEmail === session.user.email)
        : [];
      tuitionsPosted = tuitions.length;
      activeAndApproved = tuitions.filter(
        (t) => t.approvalStatus === "approved" && t.isActive
      ).length;
    }
  } catch {
    // Backend unreachable — show zeros gracefully
  }

  // Fetch this tutor's total applicants and accepted applicants
  let totalApplicants = 0;
  let acceptedApplicants = 0;

  try {
    const appRes = await fetch(`${baseUrl}/applications?tutorEmail=${session.user.email}`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (appRes.ok) {
      const allApps = await appRes.json();
      const apps = Array.isArray(allApps)
        ? allApps.filter((a: { tutorEmail?: string }) => a.tutorEmail === session.user.email)
        : [];
      totalApplicants = apps.length;
      acceptedApplicants = apps.filter((a: { status?: string }) => a.status === "accepted").length;
    }
  } catch {
    totalApplicants = 0;
    acceptedApplicants = 0;
  }

  // Fetch fresh user data from backend API
  let freshPlan: string = session.user.plan ?? "free";
  try {
    const userRes = await fetch(`${baseUrl}/users/${session.user.id}`, {
      cache: "no-store",
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      if (userData?.plan) freshPlan = userData.plan;
    }
  } catch {
    // fallback to session plan
  }

  const isPro = freshPlan === "pro";
  const currentPlan = isPro ? "Pro" : "Free";

  const stats = [
    {
      label: "Tuitions posted",
      value: tuitionsPosted,
      description: isPro ? "Unlimited posts" : "Free plan limit: 2",
    },
    {
      label: "Active and approved",
      value: activeAndApproved,
      description: "Tuition posts approved by admin",
    },
    {
      label: "Total applicants",
      value: totalApplicants,
      description: "Across your posts",
    },
    {
      label: "Accepted students",
      value: acceptedApplicants,
      description: "Accepted by you",
    },
    {
      label: "Current plan",
      value: currentPlan,
      description:
        currentPlan === "Pro" ? "Unlimited posts" : "Upgrade for unlimited",
    },
  ];

  return (
    <section className="max-w-6xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Tutor dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Manage your listings and student applicants.
          </p>
        </div>

        <Button
          render={
            <Link
              href={
                !isPro && tuitionsPosted >= 2
                  ? "/dashboard/Tutor/pricing"
                  : "/dashboard/Tutor/post-tuition"
              }
            />
          }
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Post new tuition
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border bg-card">
        <h3 className="border-b px-5 py-4 text-lg font-semibold">
          Quick actions
        </h3>

        <div className="flex flex-wrap gap-3 p-5">
          <Button
            render={<Link href="/dashboard/Tutor/post-tuition" />}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Post new tuition
          </Button>

          <Button
            render={<Link href="/dashboard/Tutor/my-tuitions" />}
            variant="outline"
          >
            My tuitions
          </Button>

          <Button
            render={<Link href="/dashboard/Tutor/applicants" />}
            variant="outline"
          >
            Manage applicants
          </Button>
        </div>
      </div>
    </section>
  );
}
