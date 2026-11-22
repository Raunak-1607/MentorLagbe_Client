import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTokenByServer } from "@/lib/GetTokenServer";
import ApplicantsTable from "./components/ApplicantsTable";
import type { Application } from "@/types/application";

export default async function ApplicantsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // 🔒 Auth guard — redirect non-tutors immediately
  if (!session || session.user.role !== "tutor") {
    redirect("/");
  }

  const tokenRes = await getTokenByServer();
  const token = typeof tokenRes === "string" ? tokenRes : tokenRes?.token;
  const authHeaders: Record<string, string> = token
    ? { authorization: `Barer ${token}` }
    : {};

  const tutorEmail = session.user.email;
  let applications: Application[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/applications?tutorEmail=${tutorEmail}`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (res.ok) {
      const data = await res.json();
      applications = Array.isArray(data)
        ? data.filter((a: { tutorEmail?: string }) => a.tutorEmail === tutorEmail)
        : [];
    }
  } catch {
    applications = [];
  }

  return (
    <section className="max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">Applicants</h2>
        <p className="mt-1 text-sm text-gray-500">
          Accept or reject students who applied.
        </p>
      </div>

      <ApplicantsTable initialApplications={applications} />
    </section>
  );
}
