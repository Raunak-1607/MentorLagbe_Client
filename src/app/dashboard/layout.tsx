"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const dashboardTitles: Record<string, string> = {
  "/dashboard/student": "Overview",
  "/dashboard/Tutor": "Overview",
  "/dashboard/admin": "Overview",
  "/dashboard/student/applications": "My applications",
  "/dashboard/student/my-applications": "My applications",
  "/dashboard/student/saved-tuitions": "Saved tuitions",
  "/dashboard/student/profile": "Update profile",
  "/dashboard/student/pricing": "Upgrade to Pro",
  "/dashboard/Tutor/post-tuition": "Post tuition",
  "/dashboard/Tutor/my-tuitions": "My tuitions",
  "/dashboard/Tutor/applicants": "Applicants",
  "/dashboard/Tutor/update-profile": "Update profile",
  "/dashboard/Tutor/pricing": "Upgrade to Pro",
  "/dashboard/admin/users": "Users",
  "/dashboard/admin/tuition-approvals": "Tuition approvals",
  "/dashboard/admin/transactions": "Transactions",
  "/dashboard/admin/profile": "Update profile",
};

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
   const pathname = usePathname();
   const title = dashboardTitles[pathname] || "Dashboard";

   return (
    <SidebarProvider className="min-h-0 flex-1">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 items-center border-b px-3 sm:px-5 bg-white">
          <SidebarTrigger />
          <h1 className="ml-3 text-base sm:text-lg font-semibold text-gray-900 truncate">{title}</h1>
        </header>
        <main className="p-3 sm:p-5 md:p-8">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
};

export default DashboardLayoutPage;
