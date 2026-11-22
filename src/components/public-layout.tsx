"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Inner component that uses usePathname — must be inside <Suspense>
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dashboard pages have their own sidebar, so they do not use the public navbar or footer.
  if (pathname.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-full flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      }
    >
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
