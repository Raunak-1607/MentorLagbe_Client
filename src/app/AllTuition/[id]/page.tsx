import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTuitionDetails } from "@/lib/actions/Tuition";

export default async function TuitionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Fetch tuition details via getTuitionDetails action
  const rawTuition = await getTuitionDetails(id);
  const tuition = Array.isArray(rawTuition) ? rawTuition[0] : rawTuition;

  if (!tuition) {
    notFound();
  }

  // 2. Get logged in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role; // "student" | "tutor" | "admin"

  // Condition checks
  const isStudent = role === "student";
  const isTutorOrAdmin = role === "tutor" || role === "admin";
  const isLoggedOut = !user;

  // Helper text formatters
  const formattedClass = tuition.classLevel?.toLowerCase().startsWith("class-")
    ? `Class ${tuition.classLevel.replace(/^class-/i, "")}`
    : tuition.classLevel;

  const formattedSubject = tuition.subject
    ? tuition.subject.charAt(0).toUpperCase() + tuition.subject.slice(1)
    : "";

  // Tutor initials for avatar
  const initials = tuition.tutorName
    ? tuition.tutorName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "TR";

  return (
    <main className="min-h-screen bg-[#f8f9fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column (Tuition Details) */}
          <div className="lg:col-span-8">
            {/* Banner Section */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-3xl bg-[#3730a3] p-6 sm:p-8 flex items-end text-white shadow-xs">
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#4338ca] opacity-70 pointer-events-none" />

              {tuition.bannerImage ? (
                <Image
                  src={tuition.bannerImage}
                  alt={tuition.title || "Tuition Banner"}
                  fill
                  className="object-cover"
                  priority
                />
              ) : null}

              <p className="relative z-10 text-sm font-medium text-white/90">
                Banner photo / illustration
              </p>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
              {tuition.title}
            </h1>

            {/* Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-[#f0edff] px-3 py-1 text-xs font-semibold text-[#4338ca]">
                {formattedSubject}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#e0f7f6] px-3 py-1 text-xs font-semibold text-[#0e7490]">
                {tuition.mode}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#f1f3f7] px-3 py-1 text-xs font-semibold text-[#475569]">
                {formattedClass}
              </span>
            </div>

            {/* 3 Metric Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                <span className="text-xs font-medium text-gray-500">Monthly fee</span>
                <p className="mt-1 text-xl font-bold text-[#0f172a]">
                  ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                <span className="text-xs font-medium text-gray-500">Schedule</span>
                <p className="mt-1 text-xl font-bold text-[#0f172a]">
                  {tuition.daysPerWeek} days a week
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                <span className="text-xs font-medium text-gray-500">Location</span>
                <p className="mt-1 text-xl font-bold text-[#0f172a]">
                  {tuition.mode}, {tuition.location}
                </p>
              </div>
            </div>

            {/* About this batch */}
            <div className="mt-8">
              <h2 className="text-base font-bold text-[#0f172a]">About this batch</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {tuition.description ||
                  "Full syllabus coverage with weekly tests, doubt-clearing sessions and recorded lessons."}
              </p>
            </div>

            {/* Your tutor Card */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0f172a]">Your tutor</span>
                <span className="rounded-full bg-[#fef3c7] px-3 py-0.5 text-xs font-semibold text-[#b45309]">
                  Verified
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4338ca] text-sm font-bold text-white">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{tuition.tutorName}</p>
                  <p className="text-xs text-gray-500">{tuition.tutorEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Application Form) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-bold text-[#0f172a] mb-5">Apply for tuition</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="01XXX XXXXXX"
                    disabled={isTutorOrAdmin}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Preferred schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sat, Mon evenings"
                    disabled={isTutorOrAdmin}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Learning note
                  </label>
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    disabled={isTutorOrAdmin}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>

                {/* Role-based Apply Button */}
                <div className="pt-2">
                  {isLoggedOut ? (
                    <Link
                      href="/SignIn"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3]"
                    >
                      Sign in to apply
                    </Link>
                  ) : isTutorOrAdmin ? (
                    <div className="space-y-2">
                      <button
                        type="button"
                        disabled
                        className="w-full rounded-xl bg-gray-200 py-3 text-sm font-semibold text-gray-500 cursor-not-allowed"
                      >
                        Apply now
                      </button>
                      <p className="text-center text-xs font-medium text-amber-600">
                        Only students can apply.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3] cursor-pointer"
                    >
                      Apply now
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Information Card (Other states) */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs text-xs text-gray-500 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-gray-800">Other states.</p>
              <p>
                <span className="font-medium text-gray-700">Tutor or admin:</span> button disabled, notice &quot;Only students can apply.&quot;
              </p>
              <p>
                <span className="font-medium text-gray-700">Already applied:</span> button reads &quot;Application sent&quot; with a Pending badge.
              </p>
              <p>
                <span className="font-medium text-gray-700">Signed out:</span> button reads &quot;Sign in to apply&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
