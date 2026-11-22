"use client";

import React, { useState } from "react";
import { toast } from "@heroui/react/toast";
import { getTokenByClient } from "@/lib/GetTokenClient";

interface PendingTuition {
  _id?: string;
  id?: string;
  title: string;
  tutorName: string;
  tutorEmail: string;
  monthlyFee: number;
  approvalStatus: string;
}

interface PendingTuitionsTableProps {
  initialTuitions: PendingTuition[];
}

export default function PendingTuitionsTable({
  initialTuitions,
}: PendingTuitionsTableProps) {
  const [tuitions, setTuitions] = useState<PendingTuition[]>(initialTuitions);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDecision = async (
    id: string | undefined,
    decision: "approved" | "rejected"
  ) => {
    if (!id) return;
    setLoadingId(id);

    try {
      const token = await getTokenByClient();
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/tuition/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Barer ${token}` } : {}),
        },
        body: JSON.stringify({ approvalStatus: decision }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok || data.acknowledged || data.modifiedCount !== undefined) {
        toast.success(
          `Tuition ${decision === "approved" ? "approved" : "rejected"} successfully!`
        );
        // Remove from pending list immediately
        setTuitions((prev) =>
          prev.filter((t) => (t._id || t.id) !== id)
        );
      } else {
        toast.danger(data.message || "Failed to update tuition status.");
      }
    } catch {
      toast.danger("Network error. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  if (tuitions.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
        <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
          Waiting for approval
        </h3>
        <p className="px-6 py-12 text-center text-sm text-gray-400">
          No pending tuitions — all caught up!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
        Waiting for approval
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-gray-100 bg-[#fbfcfd] text-xs font-medium text-gray-500">
            <tr>
              <th className="px-6 py-3.5">Tuition</th>
              <th className="px-6 py-3.5">Tutor</th>
              <th className="px-6 py-3.5">Fee</th>
              <th className="px-6 py-3.5">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {tuitions.map((tuition, index) => {
              const tId = tuition._id || tuition.id || String(index);
              const isLoading = loadingId === tId;

              return (
                <tr key={tId} className="hover:bg-gray-50/50 transition">
                  {/* Tuition Title */}
                  <td className="px-6 py-4 align-middle font-medium text-gray-900">
                    {tuition.title}
                  </td>

                  {/* Tutor Name */}
                  <td className="px-6 py-4 align-middle text-gray-700">
                    {tuition.tutorName}
                  </td>

                  {/* Fee */}
                  <td className="px-6 py-4 align-middle whitespace-nowrap text-gray-700">
                    ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                  </td>

                  {/* Decision Buttons */}
                  <td className="px-6 py-4 align-middle whitespace-nowrap">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
