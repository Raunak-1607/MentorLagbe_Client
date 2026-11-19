import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0e1d4b] px-5 py-10 text-indigo-100 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-indigo-300/20 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-xl font-bold text-white">
            MentorLagbe
          </Link>
          <p className="mt-2 max-w-sm text-sm leading-6 text-indigo-200">
            Find the right tutor and take the next step in your learning journey.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/tutorials" className="transition hover:text-white">
            Browse tutorials
          </Link>
          <Link href="/pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/how-it-works" className="transition hover:text-white">
            How it works
          </Link>
        </div>
      </div>
      <p className="mx-auto max-w-7xl pt-6 text-sm text-indigo-300">
        © 2026 MentorLagbe. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
