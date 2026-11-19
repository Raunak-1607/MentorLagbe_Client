"use client";

import { toast } from "@heroui/react/toast";
import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      bannerImage: String(formData.get("bannerImage") || ""),
      description: String(formData.get("description")),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tuitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tuition),
      });

      if (!response.ok) throw new Error("Could not submit tuition.");

      toast.success("Tuition submitted for admin approval.");
      form.reset();
    } catch {
      toast.danger("Could not submit tuition.");
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
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="ict">ICT</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="bannerImage">Banner image URL <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input id="bannerImage" name="bannerImage" type="url" placeholder="https://example.com/banner.jpg" />
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

        <Button type="submit" disabled={isSubmitting} className="mt-6 h-11 bg-indigo-600 px-6 hover:bg-indigo-700">
          {isSubmitting ? "Submitting..." : "Submit for approval"}
        </Button>
      </form>
    </section>
  );
}
