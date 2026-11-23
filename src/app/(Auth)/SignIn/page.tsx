"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@heroui/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const dashboardPath = {
  student: "/dashboard/student",
  tutor: "/dashboard/Tutor",
  admin: "/dashboard/admin",
};

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);

    const { data, error } = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    setIsLoading(false);
    if (error) {
      toast.danger(error.message || "Email or password is incorrect.");
      return;
    }

    if (data) {
      const role = data.user.role;
      const defaultDestination =
        role === "tutor" || role === "admin"
          ? dashboardPath[role]
          : dashboardPath.student;

      const callbackUrl =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("callbackUrl")
          : null;

      toast.success("You have signed in successfully.");
      router.replace(callbackUrl || defaultDestination);
    }
  };

  const signInGoogle = async () => {
    setIsGoogleLoading(true);
    const callbackUrl =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("callbackUrl")
        : null;

    await authClient.signIn.social({
      provider: "google",
      // /onboarding auto-skips to dashboard if they already completed onboarding.
      // This handles both new users (need role pick) and returning users (redirected immediately).
      callbackURL: callbackUrl || "/onboarding",
    });
    setIsGoogleLoading(false);
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f1ff] px-5 py-12 sm:px-8">
      <section className="w-full max-w-md rounded-3xl border border-indigo-100 bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-semibold tracking-[0.18em] text-indigo-700 uppercase">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0e1d4b]">
          Sign in to MentorLagbe
        </h1>
        <p className="mt-2 text-slate-600">
          Continue your learning journey with your account.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSignIn}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-900"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-12 bg-slate-50 px-4"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-900"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="h-12 bg-slate-50 px-4"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-indigo-700 text-base hover:bg-indigo-800"
          >
            {isLoading ? "Signing in..." : "Sign in"}
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
          New here?{" "}
          <Link
            href="/SignUp"
            className="font-semibold text-indigo-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
