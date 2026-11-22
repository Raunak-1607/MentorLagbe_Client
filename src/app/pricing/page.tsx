import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function PublicPricingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const isStudent = user?.role === "student";
  const isTutor = user?.role === "tutor";
  const isPro = user?.plan === "pro";

  return (
    <main className="min-h-screen bg-[#f8f9fd] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center rounded-full bg-[#f0edff] px-4 py-1 text-xs font-semibold text-[#4338ca]">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
            Simple plans for students and tutors
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Get started for free or upgrade to Pro with a single one-time payment.
            No hidden monthly subscription surprises.
          </p>
        </div>

        {/* Section 1: For Students */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0f172a]">For Students</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Free */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Student Free</h3>
                  <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-600">
                    Basic
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-sm text-gray-500">/ forever</span>
                </div>
                <p className="text-sm text-gray-500">
                  Ideal for discovering tutors and submitting standard applications.
                </p>

                <ul className="space-y-2.5 pt-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Browse all approved tuitions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Direct tutor contact information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Track application status in real-time</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/AllTuition"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Browse tuitions
                </Link>
              </div>
            </div>

            {/* Student Pro */}
            <div className="relative rounded-3xl border-2 border-[#4338ca] bg-white p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Student Pro</h3>
                  <span className="rounded-full bg-[#fef3c7] px-3 py-0.5 text-xs font-semibold text-[#b45309]">
                    Recommended
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">$10</span>
                  <span className="text-sm text-gray-500">one-time</span>
                </div>
                <p className="text-sm text-gray-500">
                  Get faster responses and priority matching with top-rated tutors.
                </p>

                <ul className="space-y-2.5 pt-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Everything in Student Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Unlimited tuition applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Priority application review by tutors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Verified student profile badge</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                {isStudent && isPro ? (
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  >
                    Current plan: Pro
                  </button>
                ) : (
                  <Link
                    href={
                      isStudent
                        ? "/dashboard/student/pricing"
                        : user
                        ? "/dashboard/student"
                        : "/SignIn"
                    }
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3]"
                  >
                    {isStudent ? "Upgrade to Student Pro" : "Get Student Pro"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: For Tutors */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0f172a]">For Tutors</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tutor Free */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Tutor Free</h3>
                  <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-600">
                    Starter
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-sm text-gray-500">/ forever</span>
                </div>
                <p className="text-sm text-gray-500">
                  Great for new tutors starting to build their student client base.
                </p>

                <ul className="space-y-2.5 pt-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Post up to 2 active tuitions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Receive and review student applicants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Tutor dashboard and analytics</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={isTutor ? "/dashboard/Tutor/post-tuition" : "/SignUp"}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  {isTutor ? "Post a tuition" : "Join as Tutor"}
                </Link>
              </div>
            </div>

            {/* Tutor Pro */}
            <div className="relative rounded-3xl border-2 border-[#4338ca] bg-white p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Tutor Pro</h3>
                  <span className="rounded-full bg-[#fef3c7] px-3 py-0.5 text-xs font-semibold text-[#b45309]">
                    Best Value
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">$15</span>
                  <span className="text-sm text-gray-500">one-time</span>
                </div>
                <p className="text-sm text-gray-500">
                  For active educators who want maximum reach and unlimited batches.
                </p>

                <ul className="space-y-2.5 pt-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Unlimited tuition posts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Verified tutor badge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Priority listing in search results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4338ca] font-bold">✓</span>
                    <span>Applicant contact details access</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                {isTutor && isPro ? (
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  >
                    Current plan: Pro
                  </button>
                ) : (
                  <Link
                    href={
                      isTutor
                        ? "/dashboard/Tutor/pricing"
                        : user
                        ? "/dashboard/Tutor"
                        : "/SignIn"
                    }
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3]"
                  >
                    {isTutor ? "Upgrade to Tutor Pro" : "Get Tutor Pro"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
