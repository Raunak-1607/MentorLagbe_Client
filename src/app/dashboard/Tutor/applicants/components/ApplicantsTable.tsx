"use client";

import React, { useState } from "react";
import { toast } from "@heroui/react/toast";
import { updateApplicationStatus } from "@/lib/actions/application";
import type { Application } from "@/types/application";

interface ApplicantsTableProps {
  initialApplications: Application[];
}

export default function ApplicantsTable({
  initialApplications,
}: ApplicantsTableProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDecision = async (
    id: string | undefined,
    status: "accepted" | "rejected"
  ) => {
    if (!id) return;
    setLoadingId(id);

    try {
      const res = await updateApplicationStatus(id, status);

      if (res.ok || res.acknowledged || res.modifiedCount !== undefined) {
        toast.success(`Application marked as ${status}!`);
        setApplications((prev) =>
          prev.map((item) =>
            item._id === id || item.id === id ? { ...item, status } : item
          )
        );
      } else {
        toast.danger(res.message || `Failed to update status to ${status}.`);
      }
    } catch {
      toast.danger("Network error. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-xs">
      <h3 className="px-6 py-4 text-base font-semibold text-gray-900 border-b border-gray-50">
        Applicants
      </h3>

      <table className="w-full min-w-[750px] text-left text-sm">
        <thead className="border-b border-gray-100 bg-[#fbfcfd] text-xs font-medium text-gray-500">
          <tr>
            <th className="px-6 py-3.5">Student</th>
            <th className="px-6 py-3.5">Phone</th>
            <th className="px-6 py-3.5">Schedule</th>
            <th className="px-6 py-3.5">Note</th>
            <th className="px-6 py-3.5">Tuition</th>
            <th className="px-6 py-3.5 text-right">Decision</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {applications.length > 0 ? (
            applications.map((app, index) => {
              const appId = app._id || app.id || String(index);
              const realId = app._id || app.id;
              const isActionLoading = loadingId === realId;

              return (
                <tr key={appId} className="hover:bg-gray-50/50 transition">
                  {/* Student Name & Email */}
                  <td className="px-6 py-4 align-middle">
                    <p className="font-semibold text-gray-900 leading-tight">
                      {app.studentName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {app.studentEmail}
                    </p>
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 align-middle text-gray-700 whitespace-nowrap">
                    {app.studentPhone}
                  </td>

                  {/* Schedule */}
                  <td className="px-6 py-4 align-middle text-gray-700">
                    {app.preferredSchedule}
                  </td>

                  {/* Note */}
                  <td className="px-6 py-4 align-middle text-gray-700 max-w-[220px]">
                    <span className="line-clamp-2">
                      {app.studentNote || "—"}
                    </span>
                  </td>

                  {/* Tuition Title */}
                  <td className="px-6 py-4 align-middle text-gray-900 font-medium">
                    {app.tuitionTitle}
                  </td>

                  {/* Decision (Accept / Reject / Accepted / Rejected) */}
                  <td className="px-6 py-4 align-middle text-right whitespace-nowrap">
                    {app.status === "accepted" ? (
                      <span className="inline-flex items-center rounded-lg bg-[#ecfdf5] px-3.5 py-1.5 text-xs font-semibold text-[#059669]">
                        Accepted
                      </span>
                    ) : app.status === "rejected" ? (
                      <span className="inline-flex items-center rounded-lg bg-[#fef2f2] px-3.5 py-1.5 text-xs font-semibold text-[#ef4444]">
                        Rejected
                      </span>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleDecision(realId, "accepted")}
                          disabled={isActionLoading || !realId}
                          className="rounded-lg bg-[#4338ca] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#3730a3] disabled:opacity-50 cursor-pointer"
                        >
                          {isActionLoading ? "..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleDecision(realId, "rejected")}
                          disabled={isActionLoading || !realId}
                          className="rounded-lg bg-[#fee2e2] px-3.5 py-1.5 text-xs font-semibold text-[#ef4444] transition hover:bg-[#fecaca] disabled:opacity-50 cursor-pointer"
                        >
                          {isActionLoading ? "..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-sm text-gray-400"
              >
                No applicants yet. When students apply for your tuitions, they will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
