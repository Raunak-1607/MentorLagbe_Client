"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const dashboardTitles: Record<string, string> = {
  "/dashboard/student": "Overview",
  "/dashboard/Tutor": "Overview",
  "/dashboard/admin": "Overview",
  "/dashboard/student/applications": "My applications",
  "/dashboard/student/saved-tuitions": "Saved tuitions",
  "/dashboard/student/profile": "Update profile",
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
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
          <h1 className="ml-3 text-lg font-semibold">{title}</h1>
        </header>
        <main className="p-4 md:p-8">
          <div className="container mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
};

export default DashboardLayoutPage;
