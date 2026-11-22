"use client";
import React, { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react/toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Browse Tuitions", href: "/AllTuition" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/how-it-works" },
];

function NavbarContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.danger(error.message || "Unable to sign out.");
      return;
    }
    setIsMobileMenuOpen(false);
    toast.success("Signed out successfully.");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 sm:pt-4 pb-2">
      <nav className="mx-auto max-w-7xl rounded-2xl bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 shadow-xs border border-gray-100/80">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-700 font-bold text-white shadow-xs">
              ML
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              MentorLagbe
            </span>
          </Link>

          {/* Desktop Navigation Links (hidden on mobile/tablet, visible on lg+) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-semibold text-indigo-700"
                    : "text-sm font-medium text-gray-600 transition hover:text-indigo-700"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication (hidden on mobile/tablet) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end leading-tight">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-[11px] font-medium text-indigo-600 capitalize rounded-full bg-indigo-50 px-2 py-0.5">
                    {user.role}
                  </p>
                </div>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="rounded-xl border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/SignIn"
                  className="rounded-xl border border-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition"
                >
                  Sign in
                </Link>

                <Link
                  href="/SignUp"
                  className="rounded-xl bg-indigo-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-800 transition shadow-xs"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Controls (visible on < lg) */}
          <div className="flex lg:hidden items-center gap-2">
            {user ? (
              <span className="text-[11px] font-medium text-indigo-600 capitalize rounded-full bg-indigo-50 px-2 py-0.5 mr-1">
                {user.role}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        {isMobileMenuOpen ? (
          <div className="mt-3 pt-3 border-t border-gray-100 lg:hidden space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-indigo-50 font-semibold text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="rounded-xl border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/SignIn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl border border-indigo-600 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/SignUp"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-indigo-700 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 text-center shadow-xs"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

const Navbar = () => {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 sm:pt-4 pb-2">
          <nav className="mx-auto max-w-7xl rounded-2xl bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 shadow-xs border border-gray-100/80">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 shrink-0">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-700 font-bold text-white shadow-xs">
                  ML
                </div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                  MentorLagbe
                </span>
              </Link>
            </div>
          </nav>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
