export default function DashboardLoading() {
  return (
    <div className="w-full max-w-6xl animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-4 w-72 rounded-md bg-gray-100" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-gray-200" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3 shadow-xs">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-8 w-16 rounded bg-gray-200" />
            <div className="h-3 w-32 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
        <div className="h-6 w-36 rounded bg-gray-200" />
        <div className="h-40 rounded-xl bg-gray-50" />
      </div>
    </div>
  );
}
