"use client";

import React, { useState } from "react";
import { toast } from "@heroui/react/toast";
import { updateUser } from "@/lib/actions/users";
import type { AppUser, UserRole } from "@/types/user";

interface UserManagementTableProps {
  initialUsers: AppUser[];
}

export default function UserManagementTable({
  initialUsers,
}: UserManagementTableProps) {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string | undefined, newRole: UserRole) => {
    if (!userId) return;
    setUpdatingId(userId);

    try {
      const res = await updateUser(userId, { role: newRole });

      if (res.ok || res.acknowledged || res.modifiedCount !== undefined) {
        toast.success(`Role updated to ${newRole}!`);
        setUsers((prev) =>
          prev.map((u) =>
            (u._id || u.id) === userId ? { ...u, role: newRole } : u
          )
        );
      } else {
        toast.danger(res.message || "Failed to update role.");
      }
    } catch {
      toast.danger("Network error. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const nameMatch = u.name?.toLowerCase().includes(term);
    const emailMatch = u.email?.toLowerCase().includes(term);
    return nameMatch || emailMatch;
  });

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-3 text-sm shadow-xs placeholder:text-gray-400 focus:border-[#4338ca] focus:outline-hidden transition"
        />
      </div>

      {/* Users Table Card */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
        <h3 className="px-6 py-5 text-base font-bold text-gray-900 border-b border-gray-50">
          All users
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-[#fbfcfd] text-xs font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Plan</th>
                <th className="px-6 py-3.5">Change role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  const userId = user._id || user.id || String(index);
                  const isUpdating = updatingId === userId;
                  const role = (user.role || "student").toLowerCase() as UserRole;
                  const plan = (user.plan || "free").toLowerCase();

                  return (
                    <tr key={userId} className="hover:bg-gray-50/50 transition">
                      {/* User Name */}
                      <td className="px-6 py-4 align-middle font-medium text-gray-900">
                        {user.name || "Unnamed user"}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 align-middle text-gray-600">
                        {user.email}
                      </td>

                      {/* Current Role Badge */}
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        {role === "tutor" ? (
                          <span className="inline-flex items-center rounded-full bg-[#f0edff] px-3 py-1 text-xs font-semibold text-[#4338ca] capitalize">
                            Tutor
                          </span>
                        ) : role === "student" ? (
                          <span className="inline-flex items-center rounded-full bg-[#e0f7f6] px-3 py-1 text-xs font-semibold text-[#0e7490] capitalize">
                            Student
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-semibold text-[#b45309] capitalize">
                            Admin
                          </span>
                        )}
                      </td>

                      {/* Plan Badge */}
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        {plan === "pro" ? (
                          <span className="inline-flex items-center rounded-full bg-[#fef9c3] px-3.5 py-1 text-xs font-semibold text-[#a16207] capitalize">
                            Pro
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-[#f0edff] px-3.5 py-1 text-xs font-semibold text-[#4338ca] capitalize">
                            Free
                          </span>
                        )}
                      </td>

                      {/* Change Role Dropdown */}
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        <div className="relative inline-block">
                          <select
                            value={role}
                            onChange={(e) =>
                              handleRoleChange(userId, e.target.value as UserRole)
                            }
                            disabled={isUpdating}
                            className="appearance-none rounded-full bg-[#f0edff] hover:bg-[#e0e7ff] pl-3.5 pr-7 py-1.5 text-xs font-semibold text-[#4338ca] border-none outline-hidden cursor-pointer transition disabled:opacity-50 capitalize"
                          >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                          </select>
                          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#4338ca]">
                            ▼
                          </span>
                        </div>
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
                    No users found matching &quot;{searchTerm}&quot;.
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
