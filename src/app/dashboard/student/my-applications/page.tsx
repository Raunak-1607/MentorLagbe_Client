import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTokenByServer } from "@/lib/GetTokenServer";
import MyApplicationsList from "./components/MyApplicationsList";
import type { Application } from "@/types/application";

export default async function MyApplicationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-students immediately
  if (!session || session.user.role !== "student") {
    redirect("/");
  }

  const tokenRes = await getTokenByServer();
  const token = typeof tokenRes === "string" ? tokenRes : tokenRes?.token;
  const authHeaders: Record<string, string> = token
    ? { authorization: `Barer ${token}` }
    : {};

  const studentEmail = session.user.email;
  let applications: Application[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/applications?studentEmail=${studentEmail}`, {
      cache: "no-store",
      headers: authHeaders,
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

  return (
    <section className="max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
          My applications
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Cancel an application while it is still pending.
        </p>
      </div>

      <MyApplicationsList initialApplications={applications} />
    </section>
  );
}
