
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp, signIn, authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Already logged in → go to home
  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("imageUrl") as string;

    setIsLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (signUp.email as any)({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password,
      phoneNumber: formData.get("phoneNumber") as string,
      role: formData.get("role") as "student" | "tutor",
      ...(image ? { image } : {}),
    });

    if (error) {
      setIsLoading(false);
      toast.danger(error.message || "Could not create your account.");
      return;
    }

    if (data) {
      // Auto sign-in with the same credentials so user doesn't have to log in again
      const { error: signInError } = await signIn.email({
        email: formData.get("email") as string,
        password,
      });

      setIsLoading(false);

      if (signInError) {
        toast.success("Account created! Please sign in.");
        router.push("/SignIn");
        return;
      }

      toast.success("Account created successfully! Welcome to MentorLagbe.");
      router.push("/");
    }
  };

  const signInGoogle = async () => {
    setIsGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      // New Google users go to /onboarding to pick their role & phone number.
      // /onboarding auto-skips to dashboard if they already completed onboarding.
      callbackURL: "/onboarding",
    });
    setIsGoogleLoading(false);
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

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-indigo-700 text-base hover:bg-indigo-800"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          OR
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={signInGoogle}
          disabled={isGoogleLoading}
          className="h-12 w-full rounded-xl border-indigo-200 text-base text-indigo-700 hover:bg-indigo-50"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            G
          </span>
          {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
        </Button>

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
