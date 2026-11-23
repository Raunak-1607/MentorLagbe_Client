"use client";

import { toast } from "@heroui/react/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenByClient } from "@/lib/GetTokenClient";
import { uploadToImgBB } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CreateTuition } from "@/types/tuition";

export default function PostTuitionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.danger("Please select an image file (PNG, JPG, etc.).");
      return;
    }

    try {
      setUploadingBanner(true);
      const url = await uploadToImgBB(file);
      setBannerImageUrl(url);
      toast.success("Banner image uploaded to ImgBB successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Banner upload failed";
      toast.danger(msg);
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const tuition: CreateTuition = {
      title: String(formData.get("title")),
      subject: String(formData.get("subject")),
      classLevel: String(formData.get("classLevel")),
      mode: String(formData.get("mode")) as "Online" | "Offline",
      location: String(formData.get("location")),
      monthlyFee: Number(formData.get("monthlyFee")),
      daysPerWeek: Number(formData.get("daysPerWeek")),
      bannerImage: bannerImageUrl || String(formData.get("bannerImage") || ""),
      description: String(formData.get("description")),
    };

    setIsSubmitting(true);
    try {
      const token = await getTokenByClient();
      const response = await fetch("/api/tuitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Barer ${token}` } : {}),
        },
        body: JSON.stringify(tuition),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        if (response.status === 403) {
          toast.danger(result?.message || "Free limit reached. Redirecting to payment page...");
          router.push("/dashboard/Tutor/pricing");
          return;
        }
        throw new Error(result?.message || "Could not submit tuition.");
      }

      toast.success("Tuition submitted for admin approval.");
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not submit tuition.";
      toast.danger(message);
    } finally {
      setIsSubmitting(false);

    }
  };

  return (
    <section className="max-w-5xl">
      <h2 className="text-2xl font-bold tracking-tight">Post a tuition</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Your tuition will go to admin for approval. Free tutors can post 2; Pro is unlimited.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 rounded-xl border bg-card p-5 shadow-sm md:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g. Class 10 Physics Batch" required />
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Select name="subject" required>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="ICT">ICT</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="IELTS">IELTS</SelectItem>
                <SelectItem value="Bangla">Bangla</SelectItem>
                <SelectItem value="Higher Math">Higher Math</SelectItem>
                <SelectItem value="Accounting">Accounting</SelectItem>
                <SelectItem value="General Science">General Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Class level</Label>
            <Select name="classLevel" required>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class-6-8">Class 6 to 8</SelectItem>
                <SelectItem value="class-9-10">Class 9 to 10</SelectItem>
                <SelectItem value="hsc">HSC</SelectItem>
                <SelectItem value="admission">Admission</SelectItem>
                <SelectItem value="o-level">O Level</SelectItem>
                <SelectItem value="a-level">A Level</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mode</Label>
            <Select name="mode" required>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Online / Offline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" placeholder="City or area" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyFee">Monthly fee</Label>
            <Input id="monthlyFee" name="monthlyFee" type="number" min="0" placeholder="৳" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daysPerWeek">Days per week</Label>
            <Input id="daysPerWeek" name="daysPerWeek" type="number" min="1" max="7" placeholder="1 to 7" required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Banner image <span className="font-normal text-muted-foreground">(Direct upload via ImgBB)</span></Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-input bg-muted/20 px-4 text-center text-sm transition hover:border-indigo-400 hover:bg-indigo-50/20">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={uploadingBanner}
                  className="hidden"
                />
                {uploadingBanner ? (
                  <span className="flex items-center gap-2 text-indigo-600 font-medium">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Uploading banner to ImgBB...
                  </span>
                ) : bannerImageUrl ? (
                  <span className="text-emerald-600 font-medium text-xs sm:text-sm truncate">
                    ✓ Image uploaded. Click to choose a different photo
                  </span>
                ) : (
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">
                      <span className="text-indigo-600">Click to upload banner image</span>
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP via ImgBB</p>
                  </div>
                )}
              </label>

              {bannerImageUrl && (
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border bg-muted shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bannerImageUrl} alt="Banner preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setBannerImageUrl("")}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 text-xs"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <input type="hidden" name="bannerImage" value={bannerImageUrl} />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the batch, syllabus and schedule"
            className="min-h-28"
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting || uploadingBanner} className="mt-6 h-11 bg-indigo-600 px-6 hover:bg-indigo-700">
          {isSubmitting ? "Submitting..." : uploadingBanner ? "Uploading banner..." : "Submit for approval"}
        </Button>
      </form>
    </section>
  );
}
