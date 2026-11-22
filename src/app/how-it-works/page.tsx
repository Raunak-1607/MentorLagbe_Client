import React from "react";
import Link from "next/link";

export default function HowItWorksPage() {
  const studentSteps = [
    {
      step: "01",
      title: "Browse & filter",
      description:
        "Explore approved tuitions across Physics, Math, English, Programming, and more. Filter by online or offline mode, class level, and monthly fee.",
    },
    {
      step: "02",
      title: "Apply in seconds",
      description:
        "Submit your contact phone number, preferred schedule (e.g. Sat, Mon evenings), and a short learning note directly to the tutor.",
    },
    {
      step: "03",
      title: "Get accepted & learn",
      description:
        "Track your application status in real-time. When the tutor accepts, you'll connect directly to start your lessons.",
    },
  ];

  const tutorSteps = [
    {
      step: "01",
      title: "Post your tuition listing",
      description:
        "Set your subject, class level, weekly schedule, location, and monthly fee. Free tutors can post up to 2 tuitions, or upgrade to Pro for unlimited posts.",
    },
    {
      step: "02",
      title: "Admin review & approval",
      description:
        "Platform admins review each submitted tuition to maintain high quality and prevent spam. Once approved, your listing goes live immediately.",
    },
    {
      step: "03",
      title: "Manage student applicants",
      description:
        "Review student applications in your tutor dashboard. Accept qualified students or reject applications with one click.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fd] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center rounded-full bg-[#f0edff] px-4 py-1 text-xs font-semibold text-[#4338ca]">
            Simple & Transparent
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">
            How MentorLagbe works
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            A seamless platform designed to connect qualified tutors with eager students
            for online and in-person learning across Bangladesh.
          </p>
        </div>

        {/* For Students Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f7f6] text-xs font-bold text-[#0e7490]">
              S
            </span>
            <h2 className="text-2xl font-bold text-[#0f172a]">For Students</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-xs space-y-3"
              >
                <div className="text-2xl font-black text-[#4338ca]">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/AllTuition"
              className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3]"
            >
              Browse available tuitions
            </Link>
          </div>
        </div>

        {/* For Tutors Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0edff] text-xs font-bold text-[#4338ca]">
              T
            </span>
            <h2 className="text-2xl font-bold text-[#0f172a]">For Tutors</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-xs space-y-3"
              >
                <div className="text-2xl font-black text-[#0e7490]">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/SignUp"
              className="inline-flex items-center justify-center rounded-xl border border-[#4338ca] px-6 py-3 text-sm font-semibold text-[#4338ca] transition hover:bg-indigo-50"
            >
              Join as a Tutor
            </Link>
          </div>
        </div>

        {/* Platform Trust Highlights */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 shadow-xs">
          <h3 className="text-xl font-bold text-[#0f172a] text-center mb-8">
            Why choose MentorLagbe?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff2fe] text-lg font-bold text-[#4338ca]">
                ✓
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Verified Listings</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Every tuition is checked and verified by administrators before appearing publicly.
              </p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0f7f6] text-lg font-bold text-[#0e7490]">
                ৳
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Zero Commission</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tutors keep 100% of their tuition earnings. Students pay tutors directly.
              </p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fef9c3] text-lg font-bold text-[#a16207]">
                ★
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Online & Offline</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Choose online video mentorship or in-person home tutoring near your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
