import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">

        {/* Animated checkmark circle */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#eef2ff] ring-8 ring-[#eef2ff]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4338ca]">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">
          Payment Successful!
        </h1>
        <p className="mt-3 text-base text-gray-500">
          Welcome to <span className="font-semibold text-[#4338ca]">Pro Tutor</span>. Your account has been upgraded successfully.
        </p>

        {/* Divider */}
        <div className="my-8 border-t border-gray-100" />

        {/* Perks unlocked */}
        <div className="rounded-2xl border border-[#dedff3] bg-white p-6 text-left shadow-xs">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            What you&apos;ve unlocked
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef2ff]">
                <svg className="h-4 w-4 text-[#4338ca]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-gray-700">Unlimited tuition posts</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef2ff]">
                <svg className="h-4 w-4 text-[#4338ca]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-gray-700">Verified tutor badge on your profile</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef2ff]">
                <svg className="h-4 w-4 text-[#4338ca]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-gray-700">Priority listing in search results</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/Tutor/post-tuition"
            className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-6 py-3 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#3730a3]"
          >
            Post a Tuition
          </Link>
          <Link
            href="/dashboard/Tutor"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-xs transition-colors hover:bg-gray-50"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Receipt note */}
        <p className="mt-8 text-xs text-gray-400">
          A receipt has been sent to your email by Stripe. Keep it for your records.
        </p>
      </div>
    </div>
  );
}
