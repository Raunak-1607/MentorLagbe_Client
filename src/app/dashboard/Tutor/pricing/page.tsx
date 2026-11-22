import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import PayButton from "./components/PayButton";

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready.",
    );
  }

  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";

  // Fetch fresh user data from backend API to reflect latest plan
  let freshPlan: string = session?.user?.plan ?? "free";
  if (session?.user?.id) {
    try {
      const userRes = await fetch(`${baseUrl}/users/${session.user.id}`, {
        cache: "no-store",
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData?.plan) freshPlan = userData.plan;
      }
    } catch {
      // fallback
    }
  }

  // Simple condition: check if user is on Pro plan
  const isPro = freshPlan === "pro";

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
            {isPro ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center rounded-xl bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-500 cursor-not-allowed"
              >
                Current plan: Pro
              </button>
            ) : (
              <form action="/api/checkout_sessions" method="POST">
                <PayButton isPro={false} />
              </form>
            )}
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
              {isPro
                ? "You have full access to unlimited tuition posts and priority search listing."
                : "You pay on Stripe Checkout. After paying you land on a success page and your plan changes to Pro."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
