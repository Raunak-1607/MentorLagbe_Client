export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f1ff]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-700 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading...</p>
      </div>
    </main>
  );
}
