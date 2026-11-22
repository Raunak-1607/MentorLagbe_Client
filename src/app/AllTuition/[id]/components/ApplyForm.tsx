"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "@heroui/react/toast";
import { createApplication } from "@/lib/actions/application";
import { getTokenByClient } from "@/lib/GetTokenClient";

interface ApplyFormProps {
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName?: string;
  studentEmail?: string;
  isLoggedOut: boolean;
  isTutorOrAdmin: boolean;
  initialApplied: boolean;
  initialStatus?: string;
  token?: string;
}

export default function ApplyForm({
  tuitionId,
  tuitionTitle,
  subject,
  monthlyFee,
  tutorEmail,
  studentName = "",
  studentEmail = "",
  isLoggedOut,
  isTutorOrAdmin,
  initialApplied,
  initialStatus = "pending",
  token,
}: ApplyFormProps) {
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(initialApplied);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (token) {
      console.log("JWT Token:", token);
    } else {
      getTokenByClient().then((clientToken) => {
        if (clientToken) {
          console.log("JWT Token (Client):", clientToken);
        }
      });
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.danger("Please provide your phone number.");
      return;
    }

    if (!schedule.trim()) {
      toast.danger("Please enter your preferred schedule.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createApplication({
        tuitionId,
        tuitionTitle,
        subject,
        monthlyFee: Number(monthlyFee),
        tutorEmail,
        studentName,
        studentEmail,
        studentPhone: phone,
        preferredSchedule: schedule,
        studentNote: note,
      });

      if (res.ok || res.insertedId || res.acknowledged) {
        toast.success("Application sent successfully!");
        setHasApplied(true);
        setStatus("pending");
      } else {
        toast.danger(res.message || "Failed to submit application.");
      }
    } catch {
      toast.danger("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isLoggedOut || isTutorOrAdmin || hasApplied || isSubmitting;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
      <h2 className="text-lg font-bold text-[#0f172a] mb-5">Apply for tuition</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXX XXXXXX"
            required={!isDisabled}
            disabled={isDisabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Preferred schedule
          </label>
          <input
            type="text"
            name="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="e.g. Sat, Mon evenings"
            required={!isDisabled}
            disabled={isDisabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Learning note
          </label>
          <input
            type="text"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What do you want to learn?"
            disabled={isDisabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        {/* Button with Role & State Conditions */}
        <div className="pt-2">
          {isLoggedOut ? (
            <Link
              href="/SignIn"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3]"
            >
              Sign in to apply
            </Link>
          ) : isTutorOrAdmin ? (
            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="w-full rounded-xl bg-gray-200 py-3 text-sm font-semibold text-gray-500 cursor-not-allowed"
              >
                Apply now
              </button>
              <p className="text-center text-xs font-medium text-amber-600">
                Only students can apply.
              </p>
            </div>
          ) : hasApplied ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm font-semibold text-gray-700">
              <span>Application sent</span>
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 capitalize">
                {status || "Pending"}
              </span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3] disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Apply now"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
