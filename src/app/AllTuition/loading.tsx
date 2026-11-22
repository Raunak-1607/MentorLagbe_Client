export default function AllTuitionLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse space-y-6">
      <div className="h-10 w-1/3 rounded-lg bg-gray-200" />
      <div className="h-12 w-full rounded-2xl bg-gray-100" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl bg-gray-100 p-4 space-y-3">
            <div className="h-40 rounded-xl bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
