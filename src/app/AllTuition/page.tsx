import React, { Suspense } from "react";
import TuitionCard, { TuitionCardProps } from "@/components/TuitionCard";
import { getTuition } from "@/lib/actions/Tuition";
import TuitionFilterBar from "./components/TuitionFilterBar";

interface AllTuitionPageProps {
  searchParams?: Promise<{
    search?: string;
    subject?: string;
    classLevel?: string;
    mode?: string;
  }>;
}

export default async function AllTuitionPage({
  searchParams,
}: AllTuitionPageProps = {}) {
  const params = searchParams ? await searchParams : {};
  const { search, subject, classLevel, mode } = params;

  const allTuitions: TuitionCardProps[] = await getTuition();

  // 1. Filter approved tuitions (case-insensitive)
  const approvedTuitions = Array.isArray(allTuitions)
    ? allTuitions.filter(
        (t: any) =>
          !t.approvalStatus ||
          t.approvalStatus.toLowerCase() === "approved"
      )
    : [];

  // 2. Filter by search params
  const filteredTuitions = approvedTuitions.filter((t) => {
    // Search by title or subject
    if (search) {
      const q = search.toLowerCase().trim();
      const matchTitle = t.title?.toLowerCase().includes(q);
      const matchSubject = t.subject?.toLowerCase().includes(q);
      if (!matchTitle && !matchSubject) return false;
    }

    // Filter by subject
    if (subject && subject !== "all") {
      const qSub = subject.toLowerCase().trim();
      const tSub = t.subject?.toLowerCase().trim() || "";
      const isMath =
        (qSub === "math" || qSub === "mathematics") &&
        (tSub === "math" || tSub === "mathematics");
      if (!isMath && tSub !== qSub && !tSub.includes(qSub)) return false;
    }

    // Filter by class level
    if (classLevel && classLevel !== "all") {
      const normClass = t.classLevel?.toLowerCase().replace(/\s+/g, "-");
      const normQuery = classLevel.toLowerCase().replace(/\s+/g, "-");
      if (!normClass?.includes(normQuery) && !normQuery.includes(normClass || "")) {
        return false;
      }
    }

    // Filter by mode
    if (mode && mode !== "all") {
      if (t.mode?.toLowerCase() !== mode.toLowerCase()) return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-[#f8f9fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
            Browse tuitions
          </h1>
        </div>

        {/* Search & Filter Bar */}
        <Suspense fallback={<div className="h-14 rounded-2xl bg-white shadow-xs" />}>
          <TuitionFilterBar
            initialSearch={search}
            initialSubject={subject}
            initialClassLevel={classLevel}
            initialMode={mode}
          />
        </Suspense>

        {/* Counter */}
        <div className="text-xs font-medium text-gray-500">
          Showing {filteredTuitions.length} of {approvedTuitions.length} approved tuitions
        </div>

        {/* Tuition Cards Grid */}
        {filteredTuitions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTuitions.map((tuition, index) => (
              <TuitionCard
                key={tuition.id || tuition._id || index}
                tuition={tuition}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-500">
            No tuitions match your search criteria. Try adjusting your filters.
          </div>
        )}
      </div>
    </main>
  );
}
