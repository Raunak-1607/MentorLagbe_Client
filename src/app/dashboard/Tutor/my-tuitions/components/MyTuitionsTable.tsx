"use client";

import React, { useState } from "react";
import { MyTuitionCard, MyTuitionCardProps } from "@/components/my-tuition-card";

const tableHeaders = ["Tuition", "Fee", "Admin status", "Active", "Actions"];

interface MyTuitionsTableProps {
  initialTuitions: MyTuitionCardProps[];
}

export default function MyTuitionsTable({
  initialTuitions,
}: MyTuitionsTableProps) {
  const [tuitions, setTuitions] = useState<MyTuitionCardProps[]>(initialTuitions);

  const handleDelete = (id: string) => {
    setTuitions((prev) =>
      prev.filter((t) => (t._id || t.id) !== id)
    );
  };

  const handleUpdate = (id: string, updated: Partial<MyTuitionCardProps>) => {
    setTuitions((prev) =>
      prev.map((t) =>
        (t._id || t.id) === id ? { ...t, ...updated } : t
      )
    );
  };

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border bg-card shadow-xs">
      <h3 className="px-5 py-4 text-lg font-semibold text-gray-900 border-b border-gray-100">
        My tuitions
      </h3>
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="border-b bg-muted/40 text-muted-foreground text-xs">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className="px-5 py-3.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tuitions.length > 0 ? (
            tuitions.map((tuition, index) => {
              const tId = tuition._id || tuition.id || String(index);
              return (
                <MyTuitionCard
                  key={tId}
                  {...tuition}
                  onDelete={() => handleDelete(tId)}
                  onUpdate={(updated) => handleUpdate(tId, updated)}
                />
              );
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-sm text-muted-foreground"
              >
                No tuitions posted yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
