import React from "react";
import { getTuition } from "@/lib/actions/Tuition";
import TuitionCard, { TuitionCardProps } from "./TuitionCard";

const AllTuition = async () => {
  const tuitions: TuitionCardProps[] = await getTuition();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(tuitions) &&
        tuitions.map((tuition, index) => (
          <TuitionCard
            key={tuition.id || tuition._id || index}
            tuition={tuition}
          />
        ))}
    </div>
  );
};

export default AllTuition;
