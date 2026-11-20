export default function TutorDashboardLoading() {
  return (
    <section className="max-w-6xl animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-md bg-muted" />
          <div className="h-4 w-64 rounded-md bg-muted" />
        </div>
        <div className="h-9 w-36 rounded-md bg-muted" />
      </div>

      {/* Stats skeleton */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="h-9 w-16 rounded bg-muted" />
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Quick actions skeleton */}
      <div className="mt-5 rounded-xl border bg-card">
        <div className="border-b px-5 py-4">
          <div className="h-6 w-32 rounded bg-muted" />
        </div>
        <div className="flex flex-wrap gap-3 p-5">
          <div className="h-9 w-36 rounded-md bg-muted" />
          <div className="h-9 w-28 rounded-md bg-muted" />
        </div>
      </div>
    </section>
  );
}

