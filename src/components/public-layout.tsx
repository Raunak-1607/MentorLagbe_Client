"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dashboard pages have their own sidebar, so they do not use the public navbar or footer.
  if (pathname.startsWith("/dashboard")) {
    return children;
  }

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
