import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tutorials", href: "/tutorials" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/how-it-works" },
];

const Navbar = () => {
  return (
    <nav className="mx-9 mt-5 flex items-center justify-between rounded-2xl  bg-white px-10 py-4 container mx-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-700 font-bold text-white">
          ML
        </div>

        <span className="text-xl font-bold text-gray-900">
          MentorLagbe
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-700 transition hover:text-indigo-700"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-xl border border-indigo-600 px-4 py-2 text-indigo-700 hover:bg-indigo-50"
        >
          Sign in
        </Link>

        <Link
          href="/register"
          className="rounded-xl bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-800"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;