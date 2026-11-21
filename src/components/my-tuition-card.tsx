"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@heroui/react/toast";
import { updateTuition, deleteTuition } from "@/lib/actions/Tuition";

export interface MyTuitionCardProps {
  _id?: string;
  id?: string;
  title: string;
  subject?: string;
  mode: "Online" | "Offline";
  daysPerWeek: number;
  monthlyFee: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  onUpdate?: (updated: Partial<MyTuitionCardProps>) => void;
  onDelete?: (id: string) => void;
}

const statusStyles = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-600",
};

export function MyTuitionCard({
  _id,
  id,
  title: initialTitle,
  subject: initialSubject = "",
  mode,
  daysPerWeek: initialDays,
  monthlyFee: initialFee,
  approvalStatus,
  isActive: initialActive,
  onUpdate,
  onDelete,
}: MyTuitionCardProps) {
  const tuitionId = _id || id || "";

  // State
  const [title, setTitle] = useState(initialTitle);
  const [subject, setSubject] = useState(initialSubject);
  const [monthlyFee, setMonthlyFee] = useState(initialFee);
  const [daysPerWeek, setDaysPerWeek] = useState(initialDays);
  const [isActive, setIsActive] = useState(initialActive);

  // Dialog open states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

  // Form edit temporary states
  const [editTitle, setEditTitle] = useState(title);
  const [editSubject, setEditSubject] = useState(subject);
  const [editFee, setEditFee] = useState(String(monthlyFee));
  const [editDays, setEditDays] = useState(String(daysPerWeek));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle Edit submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tuitionId) return;

    setIsSaving(true);
    try {
      const updateData = {
        title: editTitle,
        subject: editSubject,
        monthlyFee: Number(editFee),
        daysPerWeek: Number(editDays),
      };

      const res = await updateTuition(tuitionId, updateData);

      if (res.ok || res.acknowledged || res.modifiedCount !== undefined) {
        setTitle(editTitle);
        setSubject(editSubject);
        setMonthlyFee(Number(editFee));
        setDaysPerWeek(Number(editDays));

        onUpdate?.(updateData);
        toast.success("Tuition updated successfully!");
        setIsEditDialogOpen(false);
      } else {
        toast.danger(res.message || "Failed to update tuition.");
      }
    } catch {
      toast.danger("Network error. Could not update tuition.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!tuitionId) return;

    setIsDeleting(true);
    try {
      const res = await deleteTuition(tuitionId);

      if (res.ok || res.acknowledged || res.deletedCount !== undefined) {
        toast.success("Tuition deleted successfully!");
        setIsDeleteDialogOpen(false);
        onDelete?.(tuitionId);
      } else {
        toast.danger(res.message || "Failed to delete tuition.");
      }
    } catch {
      toast.danger("Network error. Could not delete tuition.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Close / Reopen
  const handleToggleClose = async () => {
    if (!tuitionId) return;

    const newActiveState = !isActive;
    setIsClosing(true);

    try {
      const res = await updateTuition(tuitionId, { isActive: newActiveState });

      if (res.ok || res.acknowledged || res.modifiedCount !== undefined) {
        setIsActive(newActiveState);
        onUpdate?.({ isActive: newActiveState });
        toast.success(
          newActiveState
            ? "Tuition reopened and active!"
            : "Tuition closed successfully!"
        );
        setIsCloseDialogOpen(false);
      } else {
        toast.danger(res.message || "Failed to update tuition status.");
      }
    } catch {
      toast.danger("Network error. Could not update status.");
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <>
      <tr className="border-t hover:bg-gray-50/50 transition">
        <td className="px-5 py-4">
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-muted-foreground">
            {mode} · {daysPerWeek} days a week
          </p>
        </td>
        <td className="px-5 py-4 font-semibold text-gray-800">
          ৳{monthlyFee.toLocaleString()}
        </td>
        <td className="px-5 py-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[approvalStatus]}`}
          >
            {approvalStatus}
          </span>
        </td>
        <td className="px-5 py-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {isActive ? "Active" : "Closed"}
          </span>
        </td>
        <td className="px-5 py-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEditTitle(title);
                setEditSubject(subject);
                setEditFee(String(monthlyFee));
                setEditDays(String(daysPerWeek));
                setIsEditDialogOpen(true);
              }}
              className="cursor-pointer"
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCloseDialogOpen(true)}
              className="cursor-pointer"
            >
              {isActive ? "Close" : "Open"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="cursor-pointer bg-[#fee2e2] text-[#ef4444] hover:bg-[#fecaca] hover:text-[#dc2626] border-none"
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>

      {/* 1. EDIT DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg p-6 rounded-2xl bg-white">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-bold text-gray-900">
              Edit tuition
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  placeholder="e.g. Class 10 Physics Batch"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#4338ca] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  required
                  placeholder="e.g. Physics"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#4338ca] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Monthly fee
                </label>
                <input
                  type="number"
                  value={editFee}
                  onChange={(e) => setEditFee(e.target.value)}
                  required
                  placeholder="3000"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#4338ca] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Days per week
                </label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={editDays}
                  onChange={(e) => setEditDays(e.target.value)}
                  required
                  placeholder="4"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#4338ca] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-xl bg-[#4338ca] py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#3730a3] disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. DELETE DIALOG */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl bg-white">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-bold text-gray-900">
              Delete this tuition?
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 pt-1">
              This removes the listing for good.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl bg-[#fee2e2] px-6 py-2.5 text-sm font-semibold text-[#ef4444] transition hover:bg-[#fecaca] disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-xl border border-[#4338ca] px-6 py-2.5 text-sm font-semibold text-[#4338ca] transition hover:bg-indigo-50 cursor-pointer"
            >
              Keep it
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 3. CLOSE / REOPEN DIALOG */}
      <Dialog open={isCloseDialogOpen} onOpenChange={setIsCloseDialogOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl bg-white">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-bold text-gray-900">
              {isActive ? "Close this tuition?" : "Reopen this tuition?"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 pt-1">
              {isActive
                ? "This tuition will no longer be visible to students for new applications."
                : "This will make your tuition active and visible to students again."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleToggleClose}
              disabled={isClosing}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 cursor-pointer ${
                isActive
                  ? "bg-[#fee2e2] text-[#ef4444] hover:bg-[#fecaca]"
                  : "bg-[#4338ca] text-white hover:bg-[#3730a3]"
              }`}
            >
              {isClosing
                ? "Updating..."
                : isActive
                ? "Close tuition"
                : "Reopen tuition"}
            </button>
            <button
              type="button"
              onClick={() => setIsCloseDialogOpen(false)}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            >
              {isActive ? "Keep it active" : "Keep it closed"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
