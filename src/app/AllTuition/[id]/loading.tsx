export default function TuitionLoading() {
  return (
    <main className="min-h-screen bg-[#f8f9fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left column skeleton */}
          <div className="lg:col-span-8 space-y-6">
            {/* Banner */}
            <div className="h-64 sm:h-72 w-full rounded-3xl bg-slate-200" />
            {/* Title */}
            <div className="h-8 w-2/3 rounded-lg bg-slate-200" />
            {/* Badges */}
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-200" />
              <div className="h-6 w-16 rounded-full bg-slate-200" />
              <div className="h-6 w-24 rounded-full bg-slate-200" />
            </div>
            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-slate-200" />
              ))}
            </div>
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-4 w-4/6 rounded bg-slate-200" />
            </div>
          </div>

          {/* Right column skeleton */}
          <div className="lg:col-span-4">
            <div className="h-96 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
