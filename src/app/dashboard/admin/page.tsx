import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenByServer } from "@/lib/GetTokenServer";
import PendingTuitionsTable from "./components/PendingTuitionsTable";
import type { Tuition } from "@/types/tuition";

type UserDoc = {
  _id?: string;
  role?: string;
  plan?: string;
};

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-admins immediately
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const tokenRes = await getTokenByServer();
  const token = typeof tokenRes === "string" ? tokenRes : tokenRes?.token;
  const authHeaders: Record<string, string> = token
    ? { authorization: `Barer ${token}` }
    : {};

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";

  // --- Fetch all users ---
  let totalUsers = 0;
  let totalStudents = 0;
  let totalTutors = 0;
  let tutorsOnPro = 0;

  try {
    const usersRes = await fetch(`${baseUrl}/users`, {
      cache: "no-store",
      headers: authHeaders,
    });
    if (usersRes.ok) {
      const allUsers: UserDoc[] = await usersRes.json();
      totalUsers = allUsers.length;
      totalStudents = allUsers.filter((u) => u.role === "student").length;
      totalTutors = allUsers.filter((u) => u.role === "tutor").length;
      tutorsOnPro = allUsers.filter(
        (u) => u.role === "tutor" && u.plan === "pro"
      ).length;
    }
  } catch {
    // ignore
  }

  // --- Fetch all tuitions ---
  let pendingCount = 0;
  let approvedCount = 0;
  let pendingTuitions: Tuition[] = [];

  try {
    const tuitionsRes = await fetch(`${baseUrl}/tuition`, {
      cache: "no-store",
      headers: authHeaders,
    });
    if (tuitionsRes.ok) {
      const allTuitions: Tuition[] = await tuitionsRes.json();
      pendingTuitions = Array.isArray(allTuitions)
        ? allTuitions.filter((t) => t.approvalStatus === "pending")
        : [];
      pendingCount = pendingTuitions.length;
      approvedCount = Array.isArray(allTuitions)
        ? allTuitions.filter((t) => t.approvalStatus === "approved").length
        : 0;
    }
  } catch {
    // ignore
  }

  // --- Fetch payments for Stripe revenue ---
  let totalRevenueCents = 0;
  let totalTransactions = 0;

  try {
    const paymentsRes = await fetch(`${baseUrl}/payments`, {
      cache: "no-store",
      headers: authHeaders,
    });
    if (paymentsRes.ok) {
      const allPayments = await paymentsRes.json();
      if (Array.isArray(allPayments)) {
        const paidPayments = allPayments.filter(
          (p: { payment_status?: string }) => p.payment_status === "paid"
        );
        totalTransactions = paidPayments.length;
        totalRevenueCents = paidPayments.reduce(
          (sum: number, p: { amount_total?: number }) =>
            sum + (p.amount_total || 0),
          0
        );
      }
    }
  } catch {
    // ignore
  }

  // amount_total from Stripe is in cents — convert to dollars
  const totalRevenueDollars = (totalRevenueCents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const stats = [
    {
      label: "Total users",
      value: totalUsers.toLocaleString(),
      description: `${totalStudents.toLocaleString()} students`,
    },
    {
      label: "Total tutors",
      value: totalTutors.toLocaleString(),
      description: `${tutorsOnPro} on Pro`,
    },
    {
      label: "Pending / approved",
      value: `${pendingCount} / ${approvedCount}`,
      description: "Tuitions",
    },
    {
      label: "Stripe revenue",
      value: `$${totalRevenueDollars}`,
      description: `${totalTransactions} paid transactions`,
    },
  ];

  return (
    <section className="max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
            Platform overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Moderate listings, manage users and track revenue.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/admin/tuition-approvals" />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Review pending
        </Button>
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

      {/* Pending Tuitions Table */}
      <PendingTuitionsTable initialTuitions={pendingTuitions} />

      {/* Quick Actions */}
      <div className="mt-6 rounded-xl border bg-card">
        <h3 className="border-b px-5 py-4 text-lg font-semibold">
          Quick actions
        </h3>
        <div className="flex flex-wrap gap-3 p-5">
          <Button
            render={<Link href="/dashboard/admin/tuition-approvals" />}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Tuition approvals
          </Button>
          <Button
            render={<Link href="/dashboard/admin/users" />}
            variant="outline"
          >
            Manage users
          </Button>
          <Button
            render={<Link href="/dashboard/admin/transactions" />}
            variant="outline"
          >
            View transactions
          </Button>
        </div>
      </div>
    </section>
  );
}
