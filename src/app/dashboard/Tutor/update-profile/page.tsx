"use client";
import { authClient } from "@/lib/auth-client";
import { getTokenByClient } from "@/lib/GetTokenClient";
import { uploadToImgBB } from "@/lib/upload";
import { toast } from "@heroui/react/toast";
import React, { useState, useEffect } from "react";

const UpdateProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (user?.image && !imageUrl) {
      setImageUrl(user.image);
    }
  }, [user?.image]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.danger("Please select an image file (PNG, JPG, etc.).");
      return;
    }

    try {
      setUploadingImage(true);
      const url = await uploadToImgBB(file);
      setImageUrl(url);
      toast.success("Profile photo uploaded to ImgBB successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Image upload failed";
      toast.danger(msg);
    } finally {
      setUploadingImage(false);
    }
  };

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
      const token = await getTokenByClient();
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
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
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#4338ca] text-xl font-bold text-white shadow-xs">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                user?.name ? user.name.slice(0, 2).toUpperCase() : "KR"
              )}
              {uploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-white">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              <label className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#dedff3] bg-[#f7f7fc] px-4 text-center text-sm text-gray-600 transition hover:border-indigo-400 hover:bg-indigo-50/40">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
                {uploadingImage ? (
                  <span className="flex items-center gap-2 text-indigo-600 font-medium">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Uploading image to ImgBB...
                  </span>
                ) : imageUrl ? (
                  <span className="text-emerald-600 font-medium truncate max-w-md">
                    ✓ Photo uploaded. Click to choose another
                  </span>
                ) : (
                  <span>
                    <strong className="text-indigo-600">Click to upload photo</strong> (Direct ImgBB Upload)
                  </span>
                )}
              </label>
              <input type="hidden" name="image" value={imageUrl} />
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
