"use client";

import { useState } from "react";

export default function SubscribeButton({ isPro }: { isPro: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      console.log("Stripe checkout trigger placeholder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading || isPro}
      className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-6 py-3 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#3730a3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      {isPro
        ? "Already Subscribed"
        : loading
          ? "Processing..."
          : "Subscribe with Stripe"}
    </button>
  );
}