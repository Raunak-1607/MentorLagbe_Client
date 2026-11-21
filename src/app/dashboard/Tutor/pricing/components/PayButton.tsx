"use client";

export default function PayButton({ isPro }: { isPro: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPro}
      className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-6 py-3 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#3730a3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      {isPro ? "Current plan: Pro" : "Subscribe with Stripe"}
    </button>
  );
}
