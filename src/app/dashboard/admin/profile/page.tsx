"use client";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react/toast";
import React, { useState } from "react";

const UpdateProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      toast.danger("User not found or not logged in.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
      } else {
        const result = await res.json().catch(() => null);
        toast.danger(result?.message || "Failed to update profile.");
      }
    } catch {
      toast.danger("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f5f5fb] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#171733]">Update profile</h1>
          <p className="text-gray-500">Keep your details current.</p>
        </div>

        <form onSubmit={updateUser} className="rounded-2xl border border-[#dedff3] bg-white p-5">
          {/* Profile Image */}
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#4338ca] text-xl font-bold text-white">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "KR"}
            </div>

            <div className="flex h-14 w-full items-center justify-center rounded-xl border border-[#dedff3] bg-[#f7f7fc] text-center text-sm text-gray-500">
              Upload a new photo (ImgBB) or paste an image URL
            </div>
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                defaultValue={user?.name ?? ""}
                key={user?.name}
                className="w-full rounded-lg border border-[#dedff3] bg-[#f7f7fc] px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email (cannot be changed)
              </label>
              <input
                type="email"
                placeholder="you@mail.com"
                disabled
                defaultValue={user?.email ?? ""}
                className="w-full rounded-lg border border-[#dedff3] bg-[#f7f7fc] px-4 py-3 text-sm text-gray-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="01XXX XXXXXXX"
                defaultValue={user?.phoneNumber ?? ""}
                key={user?.phoneNumber}
                className="w-full rounded-lg border border-[#dedff3] bg-[#f7f7fc] px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>
              <input
                type="text"
                name="role"
                placeholder="Your role"
                disabled
                defaultValue={user?.role ?? ""}
                className="w-full rounded-lg border border-[#dedff3] bg-[#f7f7fc] px-4 py-3 text-sm text-gray-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell others a little about yourself"
              rows={3}
              defaultValue={(user)?.bio ?? ""}
              className="w-full resize-none rounded-lg border border-[#dedff3] bg-[#f7f7fc] px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-xl bg-[#4338ca] px-5 py-3 text-white transition hover:bg-[#3730a3] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
