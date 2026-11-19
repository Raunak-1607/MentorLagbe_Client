import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/auth";
import type { Tuition } from "@/types/tuition";

export default async function TutorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tutorId = session?.user.role === "tutor" ? session.user.id : "";

  const tuitionsPosted = tutorId
    ? await db.collection<Tuition>("tuition").countDocuments({ tutorId })
    : 0;

  const activeAndApproved = tutorId
    ? await db.collection<Tuition>("tuition").countDocuments({
        tutorId,
        approvalStatus: "approved",
        isActive: true,
      })
    : 0;

  const currentPlan = session?.user.plan === "premium" ? "Pro" : "Free";

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
      value: 0,
      description: "Across all posts",
    },
    {
      label: "Current plan",
      value: currentPlan,
      description: currentPlan === "Pro" ? "Unlimited posts" : "Upgrade for unlimited",
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