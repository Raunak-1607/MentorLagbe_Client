"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function PricingPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  // Check if current user is already Pro/Premium
  const isPro = (session?.user as { plan?: string } | undefined)?.plan === "premium";

  const handleSubscribe = async () => {
    // Stripe integration will be added here
    setLoading(true);
    try {
      console.log("Stripe checkout trigger placeholder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-2">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">
          Upgrade to Pro
        </h1>
        <p className="mt-1 text-base text-gray-500">
          Unlimited posts and a verified badge.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 max-w-5xl">
        {/* Pro Tutor Card */}
        <div className="rounded-2xl border-2 border-[#4338ca] bg-white p-7 shadow-xs">
          {/* Card Title & Recommended Badge */}
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">Pro Tutor</h2>
            <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-0.5 text-xs font-semibold text-[#b45309]">
              Recommended
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold tracking-tight text-gray-900">
              $15
            </span>
            <span className="text-sm font-normal text-gray-500">one-time</span>
          </div>

          {/* Feature List */}
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Unlimited tuition posts</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Verified tutor badge</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Priority listing in search</span>
            </li>
          </ul>

          {/* Stripe Subscribe Button */}
          <div className="mt-8">
            <button
              onClick={handleSubscribe}
              disabled={loading || isPro}
              className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-6 py-3 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#3730a3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isPro ? "Already Subscribed" : loading ? "Processing..." : "Subscribe with Stripe"}
            </button>
          </div>
        </div>

        {/* Your Plan Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xs">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-bold text-gray-900">Your plan</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Current plan:</span>
              <span className="inline-flex items-center rounded-full bg-[#eff2fe] px-3 py-1 text-xs font-semibold text-[#4338ca]">
                {isPro ? "Pro" : "Free"}
              </span>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-500">
              You pay on Stripe Checkout. After paying you land on a success page
              and your plan changes to Pro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
