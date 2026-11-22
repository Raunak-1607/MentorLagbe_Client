import Link from "next/link";

export default function TuitionNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f1ff] px-5 text-center">
      <div className="max-w-md space-y-6">
        <p className="text-8xl font-extrabold text-indigo-700 select-none">404</p>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#0e1d4b]">Tuition not found</h1>
          <p className="text-slate-500">
            This tuition listing doesn&apos;t exist or has been removed.
          </p>
        </div>

        <Link
          href="/AllTuition"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-700 px-6 text-sm font-semibold text-white hover:bg-indigo-800 transition-colors"
        >
          Browse all tuitions
        </Link>
      </div>
    </main>
  );
}
