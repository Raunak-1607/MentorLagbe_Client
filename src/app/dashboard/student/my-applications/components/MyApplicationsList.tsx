"use client";

import React, { useState } from "react";
import { toast } from "@heroui/react/toast";
import { deleteApplication } from "@/lib/actions/application";
import type { Application } from "@/types/application";

interface MyApplicationsListProps {
  initialApplications: Application[];
}

type FilterType = "all" | "pending" | "accepted" | "rejected";

export default function MyApplicationsList({
  initialApplications,
}: MyApplicationsListProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [filter, setFilter] = useState<FilterType>("all");
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  // Dynamic status counts
  const allCount = applications.length;
  const pendingCount = applications.filter(
    (a) => !a.status || a.status.toLowerCase() === "pending"
  ).length;
  const acceptedCount = applications.filter(
    (a) => a.status?.toLowerCase() === "accepted"
  ).length;
  const rejectedCount = applications.filter(
    (a) => a.status?.toLowerCase() === "rejected"
  ).length;

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

  const handleCancelOrDelete = async (id: string | undefined, isPending: boolean) => {
    if (!id) return;
    setCancelingId(id);

    try {
      const res = await deleteApplication(id);
      if (res.ok || res.acknowledged || res.deletedCount !== undefined) {
        toast.success(
          isPending
            ? "Application canceled successfully!"
            : "Application deleted successfully!"
        );
        setApplications((prev) =>
          prev.filter((a) => (a._id || a.id) !== id)
        );
      } else {
        toast.danger(res.message || "Failed to remove application.");
      }
    } catch {
      toast.danger("Network error. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  // Filtered applications
  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    const s = (app.status || "pending").toLowerCase();
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
          onClick={() => setFilter("accepted")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
            filter === "accepted"
              ? "bg-[#16a34a] text-white shadow-xs"
              : "bg-[#dcfce7] text-[#15803d] hover:bg-[#bbf7d0]"
          }`}
        >
          Accepted {acceptedCount}
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

      {/* Applications Table Card */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
        <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
          All applications
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
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app, index) => {
                  const appId = app._id || app.id || String(index);
                  const isCanceling = cancelingId === appId;
                  const status = (app.status || "pending").toLowerCase();
                  const isPending = status === "pending";
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

                      {/* Action Column - Cancel / Delete */}
                      <td className="px-6 py-4 align-middle text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleCancelOrDelete(appId, isPending)}
                          disabled={isCanceling}
                          className="rounded-lg bg-[#fee2e2] px-4 py-1.5 text-xs font-semibold text-[#ef4444] transition hover:bg-[#fecaca] disabled:opacity-50 cursor-pointer"
                        >
                          {isCanceling ? "..." : isPending ? "Cancel" : "Delete"}
                        </button>
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
                    No {filter !== "all" ? `${filter} ` : ""}applications found.
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
