import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTokenByServer } from "@/lib/GetTokenServer";
import type { PaymentRecord } from "@/types/payment";
import type { AppUser } from "@/types/user";

export default async function AdminTransactionsPage() {
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

  // Fetch payments and users in parallel
  let payments: PaymentRecord[] = [];
  let users: AppUser[] = [];

  try {
    const [paymentsRes, usersRes] = await Promise.all([
      fetch(`${baseUrl}/payments`, { cache: "no-store", headers: authHeaders }),
      fetch(`${baseUrl}/users`, { cache: "no-store", headers: authHeaders }),
    ]);

    if (paymentsRes.ok) {
      const pData = await paymentsRes.json();
      payments = Array.isArray(pData) ? pData : [];
    }

    if (usersRes.ok) {
      const uData = await usersRes.json();
      users = Array.isArray(uData) ? uData : [];
    }
  } catch {
    // Graceful fallback if backend is unreachable
  }

  // Create a fast lookup map for users
  const userMap = new Map<string, AppUser>();
  users.forEach((u) => {
    if (u._id) userMap.set(String(u._id), u);
    if (u.id) userMap.set(String(u.id), u);
    if (u.email) userMap.set(u.email.toLowerCase(), u);
  });

  // Counts of Pro users
  const proTutorsCount = users.filter(
    (u) => u.role === "tutor" && u.plan === "pro"
  ).length;

  const proStudentsCount = users.filter(
    (u) => u.role === "student" && u.plan === "pro"
  ).length;

  // Filter paid payments
  const paidPayments = payments.filter(
    (p) => p.payment_status === "paid" || p.status === "complete"
  );

  // Current month date calculations
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const thisMonthSubtitle = `${now.toLocaleString("en-US", {
    month: "short",
  })} ${currentYear}`;

  let totalRevenue = 0;
  let thisMonthRevenue = 0;

  // Enriched payment list for table display
  const enrichedPayments = paidPayments.map((payment) => {
    // Find associated user
    const matchedUser =
      (payment.userId ? userMap.get(payment.userId) : null) ||
      (payment.customer_email
        ? userMap.get(payment.customer_email.toLowerCase())
        : null);

    const isStudent = matchedUser?.role === "student";
    const role = isStudent ? "Student" : "Tutor";
    const plan = isStudent ? "Pro Student" : "Pro Tutor";

    // Amount: if amount_total exists (in cents), convert to dollars, else default by plan
    const amount =
      typeof payment.amount_total === "number" && payment.amount_total > 0
        ? payment.amount_total / 100
        : isStudent
        ? 10
        : 15;

    totalRevenue += amount;

    // Check if payment was made in the current month
    if (payment.payment_date) {
      const pDate = new Date(payment.payment_date);
      if (
        !isNaN(pDate.getTime()) &&
        pDate.getMonth() === currentMonth &&
        pDate.getFullYear() === currentYear
      ) {
        thisMonthRevenue += amount;
      }
    }

    const userName =
      payment.customer_details?.name ||
      matchedUser?.name ||
      "Customer";

    const userEmail =
      payment.customer_email ||
      matchedUser?.email ||
      "—";

    const txId = payment.payment_intent || payment.sessionId || "—";
    const formattedTxId =
      txId.length > 13 ? `${txId.slice(0, 8)}...${txId.slice(-3)}` : txId;

    let formattedDate = "—";
    if (payment.payment_date) {
      const d = new Date(payment.payment_date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }
    }

    return {
      id: payment._id || payment.id || payment.sessionId,
      userName,
      userEmail,
      role,
      plan,
      amount,
      txId,
      formattedTxId,
      formattedDate,
    };
  });

  const stats = [
    {
      label: "Total revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      description: "All time",
    },
    {
      label: "Pro tutors",
      value: proTutorsCount,
      description: "$15 each",
    },
    {
      label: "Pro students",
      value: proStudentsCount,
      description: "$10 each",
    },
    {
      label: "This month",
      value: `$${thisMonthRevenue.toLocaleString()}`,
      description: thisMonthSubtitle,
    },
  ];

  return (
    <section className="max-w-6xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
          Transactions
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Every Stripe Pro subscription payment.
        </p>
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

      {/* Payments Table Card */}
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
        <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
          Payments
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-[#fbfcfd] text-xs font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Plan</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Transaction ID</th>
                <th className="px-6 py-3.5">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {enrichedPayments.length > 0 ? (
                enrichedPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition">
                    {/* User Name & Email */}
                    <td className="px-6 py-4 align-middle">
                      <p className="font-semibold text-gray-900 leading-tight">
                        {p.userName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.userEmail}
                      </p>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 align-middle font-medium text-gray-800">
                      {p.role}
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4 align-middle font-medium text-gray-800">
                      {p.plan}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 align-middle whitespace-nowrap font-medium text-gray-900">
                      ${p.amount}
                    </td>

                    {/* Transaction ID */}
                    <td
                      className="px-6 py-4 align-middle font-mono text-xs text-gray-700 whitespace-nowrap"
                      title={p.txId}
                    >
                      {p.formattedTxId}
                    </td>

                    {/* Paid Date */}
                    <td className="px-6 py-4 align-middle whitespace-nowrap text-gray-600">
                      {p.formattedDate}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-sm text-gray-400"
                  >
                    No payments recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
