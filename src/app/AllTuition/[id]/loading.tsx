export default function TuitionDetailsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-pulse space-y-6">
      <div className="h-8 w-2/3 rounded-lg bg-gray-200" />
      <div className="h-64 w-full rounded-2xl bg-gray-100" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="h-6 w-1/3 rounded bg-gray-200" />
          <div className="h-24 w-full rounded-xl bg-gray-100" />
        </div>
        <div className="h-48 rounded-2xl bg-gray-100" />
      </div>
    </div>
  );
}
