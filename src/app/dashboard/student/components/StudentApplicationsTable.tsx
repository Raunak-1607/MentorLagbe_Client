"use client";

import React, { useState } from "react";
import { toast } from "@heroui/react/toast";
import { deleteApplication } from "@/lib/actions/application";
import type { Application } from "@/types/application";

interface StudentApplicationsTableProps {
  initialApplications: Application[];
}

export default function StudentApplicationsTable({
  initialApplications,
}: StudentApplicationsTableProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const formatDate = (dateVal: string | Date | undefined) => {
    if (!dateVal) return "—";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }); // e.g. "12 Nov 2026"
    } catch {
      return String(dateVal);
    }
  };

  const handleCancel = async (id: string | undefined) => {
    if (!id) return;
    setCancelingId(id);

    try {
      const res = await deleteApplication(id);
      if (res.ok || res.acknowledged || res.deletedCount !== undefined) {
        toast.success("Application canceled successfully!");
        setApplications((prev) =>
          prev.filter((a) => (a._id || a.id) !== id)
        );
      } else {
        toast.danger(res.message || "Failed to cancel application.");
      }
    } catch {
      toast.danger("Network error. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  const handleRate = (tuitionTitle: string) => {
    toast.info(`Rating feature for "${tuitionTitle}" will be available soon!`);
  };

  return (
    <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
        Recent applications
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-gray-100 bg-[#fbfcfd] text-xs font-medium text-gray-500">
            <tr>
              <th className="px-6 py-3.5">Tuition</th>
              <th className="px-6 py-3.5">Tutor</th>
              <th className="px-6 py-3.5">Fee</th>
              <th className="px-6 py-3.5">Applied</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {applications.length > 0 ? (
              applications.map((app, index) => {
                const appId = app._id || app.id || String(index);
                const isCanceling = cancelingId === appId;
                const status = (app.status || "pending").toLowerCase();

                const subtitle = [app.subject, app.mode].filter(Boolean).join(" · ");

                return (
                  <tr key={appId} className="hover:bg-gray-50/50 transition">
                    {/* Tuition Title & Subtitle */}
                    <td className="px-6 py-4 align-middle">
                      <p className="font-semibold text-gray-900 leading-tight">
                        {app.tuitionTitle}
                      </p>
                      {subtitle ? (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {subtitle}
                        </p>
                      ) : null}
                    </td>

                    {/* Tutor Name & Email */}
                    <td className="px-6 py-4 align-middle">
                      <p className="font-medium text-gray-800 leading-tight">
                        {app.tutorName || "Tutor"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {app.tutorEmail}
                      </p>
                    </td>

                    {/* Fee */}
                    <td className="px-6 py-4 align-middle whitespace-nowrap text-gray-700">
                      ৳{Number(app.monthlyFee || 0).toLocaleString()}
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-4 align-middle whitespace-nowrap text-gray-600">
                      {formatDate(app.appliedAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 align-middle whitespace-nowrap">
                      {status === "accepted" ? (
                        <span className="inline-flex items-center rounded-full bg-[#dcfce7] px-3.5 py-1 text-xs font-semibold text-[#15803d] capitalize">
                          Accepted
                        </span>
                      ) : status === "rejected" ? (
                        <span className="inline-flex items-center rounded-full bg-[#fee2e2] px-3.5 py-1 text-xs font-semibold text-[#b91c1c] capitalize">
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-[#fef9c3] px-3.5 py-1 text-xs font-semibold text-[#a16207] capitalize">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4 align-middle text-right whitespace-nowrap">
                      {status === "pending" ? (
                        <button
                          type="button"
                          onClick={() => handleCancel(appId)}
                          disabled={isCanceling}
                          className="rounded-lg bg-[#fee2e2] px-4 py-1.5 text-xs font-semibold text-[#ef4444] transition hover:bg-[#fecaca] disabled:opacity-50 cursor-pointer"
                        >
                          {isCanceling ? "..." : "Cancel"}
                        </button>
                      ) : status === "accepted" ? (
                        <button
                          type="button"
                          onClick={() => handleRate(app.tuitionTitle)}
                          className="rounded-lg border border-[#4338ca] px-4 py-1.5 text-xs font-semibold text-[#4338ca] transition hover:bg-indigo-50 cursor-pointer"
                        >
                          Rate
                        </button>
                      ) : (
                        <span className="text-gray-400 font-medium px-4">
                          —
                        </span>
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
                  No applications yet. Browse available tuitions to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
