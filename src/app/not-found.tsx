import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f1ff] px-5 text-center">
      <div className="max-w-md space-y-6">
        {/* Big 404 */}
        <p className="text-8xl font-extrabold text-indigo-700 select-none">404</p>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#0e1d4b]">Page not found</h1>
          <p className="text-slate-500">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
            have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-700 px-6 text-sm font-semibold text-white hover:bg-indigo-800 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/AllTuition"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-indigo-200 px-6 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            Browse tuitions
          </Link>
        </div>
      </div>
    </main>
  );
}
