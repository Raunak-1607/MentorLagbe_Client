"use client";

import React, { useState } from "react";
import { toast } from "@heroui/react/toast";
import { updateTuition } from "@/lib/actions/Tuition";
import type { Tuition } from "@/types/tuition";

interface TuitionApprovalsTableProps {
  initialTuitions: Tuition[];
  serverToken?: string;
}

type FilterType = "all" | "pending" | "approved" | "rejected";

export default function TuitionApprovalsTable({
  initialTuitions,
  serverToken,
}: TuitionApprovalsTableProps) {
  const [tuitions, setTuitions] = useState<Tuition[]>(initialTuitions);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Dynamic counts
  const allCount = tuitions.length;
  const pendingCount = tuitions.filter(
    (t) => !t.approvalStatus || t.approvalStatus.toLowerCase() === "pending"
  ).length;
  const approvedCount = tuitions.filter(
    (t) => t.approvalStatus?.toLowerCase() === "approved"
  ).length;
  const rejectedCount = tuitions.filter(
    (t) => t.approvalStatus?.toLowerCase() === "rejected"
  ).length;

  const handleDecision = async (
    id: string | undefined,
    decision: "approved" | "rejected"
  ) => {
    if (!id) return;
    setLoadingId(id);

    try {
      const res = await updateTuition(id, { approvalStatus: decision }, serverToken);

      if (res.ok || res.acknowledged || res.modifiedCount !== undefined) {
        toast.success(
          `Tuition ${decision === "approved" ? "approved" : "rejected"} successfully!`
        );
        setTuitions((prev) =>
          prev.map((t) =>
            (t as { _id?: string; id?: string })._id === id ||
            (t as { _id?: string; id?: string }).id === id
              ? { ...t, approvalStatus: decision }
              : t
          )
        );
      } else {
        toast.danger(res.message || "Failed to update tuition status.");
      }
    } catch {
      toast.danger("Network error. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredTuitions = tuitions.filter((t) => {
    if (filter === "all") return true;
    const s = (t.approvalStatus || "pending").toLowerCase();
    return s === filter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
            filter === "all"
              ? "bg-[#4338ca] text-white shadow-xs"
              : "bg-[#eef2ff] text-[#4338ca] hover:bg-[#e0e7ff]"
          }`}
        >
          All {allCount}
        </button>

        <button
          type="button"
          onClick={() => setFilter("pending")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
            filter === "pending"
              ? "bg-[#d97706] text-white shadow-xs"
              : "bg-[#fef9c3] text-[#a16207] hover:bg-[#fef08a]"
          }`}
        >
          Pending {pendingCount}
        </button>

        <button
          type="button"
          onClick={() => setFilter("approved")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
            filter === "approved"
              ? "bg-[#16a34a] text-white shadow-xs"
              : "bg-[#dcfce7] text-[#15803d] hover:bg-[#bbf7d0]"
          }`}
        >
          Approved {approvedCount}
        </button>

        <button
          type="button"
          onClick={() => setFilter("rejected")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
            filter === "rejected"
              ? "bg-[#dc2626] text-white shadow-xs"
              : "bg-[#fee2e2] text-[#b91c1c] hover:bg-[#fecaca]"
          }`}
        >
          Rejected {rejectedCount}
        </button>
      </div>

      {/* Tuition Posts Card */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
        <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
          Tuition posts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-[#fbfcfd] text-xs font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3.5">Tuition</th>
                <th className="px-6 py-3.5">Tutor</th>
                <th className="px-6 py-3.5">Fee</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredTuitions.length > 0 ? (
                filteredTuitions.map((tuition, index) => {
                  const tWithId = tuition as Tuition & { _id?: string; id?: string };
                  const tId = tWithId._id || tWithId.id || String(index);
                  const isLoading = loadingId === tId;
                  const status = (tuition.approvalStatus || "pending").toLowerCase();
                  const subtitle = [tuition.subject, tuition.mode].filter(Boolean).join(" · ");

                  return (
                    <tr key={tId} className="hover:bg-gray-50/50 transition">
                      {/* Tuition Title & Subtitle */}
                      <td className="px-6 py-4 align-middle">
                        <p className="font-semibold text-gray-900 leading-tight">
                          {tuition.title}
                        </p>
                        {subtitle ? (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {subtitle}
                          </p>
                        ) : null}
                      </td>

                      {/* Tutor Name */}
                      <td className="px-6 py-4 align-middle font-medium text-gray-800">
                        {tuition.tutorName}
                      </td>

                      {/* Fee */}
                      <td className="px-6 py-4 align-middle whitespace-nowrap text-gray-700">
                        ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        {status === "approved" ? (
                          <span className="inline-flex items-center rounded-full bg-[#dcfce7] px-3.5 py-1 text-xs font-semibold text-[#15803d] capitalize">
                            Approved
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

                      {/* Decision Column */}
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        {status === "pending" ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleDecision(tId, "approved")}
                              disabled={isLoading}
                              className="rounded-lg bg-[#4338ca] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#3730a3] disabled:opacity-50 cursor-pointer"
                            >
                              {isLoading ? "..." : "Approve"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDecision(tId, "rejected")}
                              disabled={isLoading}
                              className="rounded-lg bg-[#fee2e2] px-4 py-1.5 text-xs font-semibold text-[#ef4444] transition hover:bg-[#fecaca] disabled:opacity-50 cursor-pointer"
                            >
                              {isLoading ? "..." : "Reject"}
                            </button>
                          </div>
                        ) : status === "approved" ? (
                          <button
                            type="button"
                            onClick={() => handleDecision(tId, "rejected")}
                            disabled={isLoading}
                            className="rounded-lg bg-[#fee2e2] px-4 py-1.5 text-xs font-semibold text-[#ef4444] transition hover:bg-[#fecaca] disabled:opacity-50 cursor-pointer"
                          >
                            {isLoading ? "..." : "Reject"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDecision(tId, "approved")}
                            disabled={isLoading}
                            className="rounded-lg bg-[#4338ca] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#3730a3] disabled:opacity-50 cursor-pointer"
                          >
                            {isLoading ? "..." : "Approve"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-sm text-gray-400"
                  >
                    No {filter !== "all" ? `${filter} ` : ""}tuitions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
