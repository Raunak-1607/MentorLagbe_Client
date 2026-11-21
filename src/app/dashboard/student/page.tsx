import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import StudentApplicationsTable from "./components/StudentApplicationsTable";
import type { Application } from "@/types/application";

export default async function StudentDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-students immediately
  if (!session || session.user.role !== "student") {
    redirect("/");
  }

  const studentEmail = session.user.email;
  let applications: Application[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/applications?studentEmail=${studentEmail}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      applications = Array.isArray(data)
        ? data.filter((a: { studentEmail?: string }) => a.studentEmail === studentEmail)
        : [];
    }
  } catch {
    applications = [];
  }

  // Calculate statistics
  const totalApplied = applications.length;
  const acceptedCount = applications.filter((a) => a.status === "accepted").length;
  const pendingCount = applications.filter(
    (a) => !a.status || a.status === "pending"
  ).length;

  const isPro = session.user.plan === "pro";
  const firstName = session.user.name ? session.user.name.split(" ")[0] : "Student";

  const stats = [
    {
      label: "Total applied",
      value: totalApplied,
      description: "Across all tuitions",
    },
    {
      label: "Accepted",
      value: acceptedCount,
      description: "Ready to start",
    },
    {
      label: "Pending",
      value: pendingCount,
      description: "Waiting for tutors",
    },
    {
      label: "Current plan",
      value: isPro ? "Pro" : "Free",
      description: isPro ? "Priority applications" : "Upgrade for priority",
    },
  ];

  return (
    <section className="max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
            Welcome back, {firstName}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your applications at a glance.
          </p>
        </div>

        <Link
          href="/AllTuition"
          className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3]"
        >
          Browse tuitions
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs"
          >
            <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-2 text-xs text-gray-400">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Applications Table */}
      <StudentApplicationsTable initialApplications={applications} />
    </section>
  );
}
