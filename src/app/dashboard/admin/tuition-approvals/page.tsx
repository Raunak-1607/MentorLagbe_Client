import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTuition } from "@/lib/actions/Tuition";
import TuitionApprovalsTable from "./components/TuitionApprovalsTable";

export default async function TuitionApprovalsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-admins immediately
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const tuitions = await getTuition();

  return (
    <section className="max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
          Tuition approvals
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Approve or reject every submitted listing.
        </p>
      </div>

      <TuitionApprovalsTable initialTuitions={tuitions} />
    </section>
  );
}
