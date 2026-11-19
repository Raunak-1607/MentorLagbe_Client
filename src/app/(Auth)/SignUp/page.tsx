
"use client";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const image = formData.get("imageUrl") as string;

    setError("");
    setIsLoading(true);

    const { error } = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      role: formData.get("role") as "student" | "tutor",
      ...(image ? { image } : {}),
    });

    setIsLoading(false);
    if (error) setError(error.message || "Could not create your account.");
  };
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f1ff] px-5 py-12 sm:px-8">
      <section className="w-full max-w-md rounded-3xl border border-indigo-100 bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-semibold tracking-[0.18em] text-indigo-700 uppercase">
          Join MentorLagbe
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0e1d4b]">
          Create your account
        </h1>
        <p className="mt-2 text-slate-600">Choose your role to get started.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-900"
            >
              Full name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              className="h-12 bg-slate-50 px-4"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-slate-900"
            >
              Email
            </label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-12 bg-slate-50 px-4"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-slate-900"
            >
              Password
            </label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              className="h-12 bg-slate-50 px-4"
              minLength={6}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone-number"
              className="text-sm font-medium text-slate-900"
            >
              Phone number
            </label>
            <Input
              id="phone-number"
              name="phoneNumber"
              type="tel"
              placeholder="01XXXXXXXXX"
              className="h-12 bg-slate-50 px-4"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image-url"
              className="text-sm font-medium text-slate-900"
            >
              Profile image URL{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <Input
              id="image-url"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="h-12 bg-slate-50 px-4"
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-900">
              I am a
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input
                  defaultChecked
                  type="radio"
                  name="role"
                  value="student"
                  className="peer sr-only"
                />
                <span className="flex h-12 items-center justify-center rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700">
                  Student
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="tutor"
                  className="peer sr-only"
                />
                <span className="flex h-12 items-center justify-center rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700">
                  Tutor
                </span>
              </label>
            </div>
          </fieldset>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-indigo-700 text-base hover:bg-indigo-800"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/SignIn"
            className="font-semibold text-indigo-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
