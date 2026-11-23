"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [role, setRole] = useState<"student" | "tutor">("student");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;

    // Not logged in → go to sign up
    if (!session) {
      router.replace("/SignUp");
      return;
    }

    // Already onboarded (phoneNumber is set) → go straight to their dashboard
    if (session.user.phoneNumber) {
      const dest =
        session.user.role === "tutor"
          ? "/dashboard/Tutor"
          : session.user.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/student";
      router.replace(dest);
    }
  }, [isPending, session, router]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      toast.danger("Please enter your phone number.");
      return;
    }

    setIsSaving(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (authClient.updateUser as any)({
      role,
      phoneNumber: phoneNumber.trim(),
    });

    setIsSaving(false);

    if (error) {
      toast.danger(error.message || "Could not save your profile. Please try again.");
      return;
    }

    toast.success("Profile set up! Redirecting to your dashboard…");

    const dest =
      role === "tutor" ? "/dashboard/Tutor" : "/dashboard/student";
    router.replace(dest);
  };

  // Show nothing while checking session
  if (isPending || !session || session.user.phoneNumber) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#f0f1ff] px-5 py-12">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f1ff] px-5 py-12 sm:px-8">
      <section className="w-full max-w-md rounded-3xl border border-indigo-100 bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-semibold tracking-[0.18em] text-indigo-700 uppercase">
          One last step
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0e1d4b]">
          Set up your profile
        </h1>
        <p className="mt-2 text-slate-600">
          Welcome, {session.user.name?.split(" ")[0]}! Tell us a bit about yourself.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSave}>
          {/* Role picker */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-900">I am a</legend>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                  className="peer sr-only"
                />
                <span className="flex h-14 items-center justify-center rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700">
                  🎓 Student
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="tutor"
                  checked={role === "tutor"}
                  onChange={() => setRole("tutor")}
                  className="peer sr-only"
                />
                <span className="flex h-14 items-center justify-center rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700">
                  📚 Tutor
                </span>
              </label>
            </div>
          </fieldset>

          {/* Phone number */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-slate-900">
              Phone number
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="01XXXXXXXXX"
              className="h-12 bg-slate-50 px-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="h-12 w-full rounded-xl bg-indigo-700 text-base hover:bg-indigo-800"
          >
            {isSaving ? "Saving…" : "Continue to dashboard"}
          </Button>
        </form>
      </section>
    </main>
  );
}
