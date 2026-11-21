import React from "react";
import TuitionCard, { TuitionCardProps } from "@/components/TuitionCard";
import { getTuition } from "@/lib/actions/Tuition";

export default async function AllTuitionPage() {
  const tuitions: TuitionCardProps[] = await getTuition();

  return (
    <main className="min-h-screen bg-[#f8f9fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
            Latest tuitions
          </h1>
        </div>

        {/* Tuition Cards Grid */}
        {Array.isArray(tuitions) && tuitions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition, index) => (
              <TuitionCard
                key={tuition.id || tuition._id || index}
                tuition={tuition}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-500">
            No tuitions available at the moment.
          </div>
        )}
      </div>
    </main>
  );
}
