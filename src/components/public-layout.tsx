"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function HeaderNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return <Navbar />;
}

function BottomFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return <Footer />;
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<div className="h-16 w-full" />}>
        <HeaderNav />
      </Suspense>
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
      <Suspense fallback={null}>
        <BottomFooter />
      </Suspense>
    </div>
  );
}
