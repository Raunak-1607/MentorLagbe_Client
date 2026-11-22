"use client";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react/toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Browse Tuitions", href: "/AllTuition" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/how-it-works" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.danger(error.message || "Unable to sign out.");
      return;
    }

    toast.success("Signed out successfully.");
  };
  return (
    <nav className="mx-9 mt-5 flex items-center justify-between rounded-2xl  bg-white px-10 py-4 container mx-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-700 font-bold text-white">
          ML
        </div>

        <span className="text-xl font-bold text-gray-900">MentorLagbe</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={
              pathname === link.href
                ? "font-semibold text-indigo-700"
                : "text-gray-700 transition hover:text-indigo-700"
            }
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Authentication Buttons */}

      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end leading-tight">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>

            <p className="text-xs font-medium text-indigo-600 capitalize rounded-full bg-indigo-100 px-2 py-0.5">
              {user.role}
            </p>
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/SignIn"
            className="rounded-xl border border-indigo-600 px-4 py-2 text-indigo-700 hover:bg-indigo-50"
          >
            Sign in
          </Link>

          <Link
            href="/SignUp"
            className="rounded-xl bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-800"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
