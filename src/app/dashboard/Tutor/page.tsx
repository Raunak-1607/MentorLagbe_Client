import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import type { Tuition } from "@/types/tuition";

export default async function TutorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-tutors immediately
  if (!session || session.user.role !== "tutor") {
    redirect("/");
  }

  // Fetch this tutor's tuitions from the external backend (port 5000)
  let tuitionsPosted = 0;
  let activeAndApproved = 0;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tuition`, {
      cache: "no-store",
    });

    if (res.ok) {
      const tuitions: Tuition[] = await res.json();
      tuitionsPosted = tuitions.length;
      activeAndApproved = tuitions.filter(
        (t) => t.approvalStatus === "approved" && t.isActive
      ).length;
    }
  } catch {
    // Backend unreachable — show zeros gracefully
  }

  const currentPlan = session.user.plan === "premium" ? "Pro" : "Free";

  const stats = [
    {
      label: "Tuitions posted",
      value: tuitionsPosted,
      description: "Free plan limit: 2",
    },
    {
      label: "Active and approved",
      value: activeAndApproved,
      description: "Visible to students",
    },
    {
      label: "Total applicants",
      value: "—",
      description: "Coming soon",
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
          render={<Link href="/dashboard/Tutor/post-tuition" />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Post new tuition
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

          {/* "Manage applicants" button is removed until the applicants page is built */}
        </div>
      </div>
    </section>
  );
}
