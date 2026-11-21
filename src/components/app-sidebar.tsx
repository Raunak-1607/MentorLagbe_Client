"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  ClipboardList,
  Crown,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  ReceiptText,
  UserPen,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

type Role = "student" | "tutor" | "admin";

// Keep all dashboard links in one place so they are easy to change later.
type MenuItem = { label: string; href: string; icon: LucideIcon };

const dashboardMenus: Record<Role, MenuItem[]> = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
    { label: "My applications", href: "/dashboard/student/applications", icon: ClipboardList },
    { label: "Saved tuitions", href: "/dashboard/student/saved-tuitions", icon: Heart },
    { label: "Update profile", href: "/dashboard/student/profile", icon: UserPen },
    { label: "Upgrade to Pro", href: "/dashboard/student/pricing", icon: Crown },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/Tutor", icon: LayoutDashboard },
    { label: "Post tuition", href: "/dashboard/Tutor/post-tuition", icon: PlusCircle },
    { label: "My tuitions", href: "/dashboard/Tutor/my-tuitions", icon: FileText },
    { label: "Applicants", href: "/dashboard/Tutor/applicants", icon: Users },
    { label: "Update profile", href: "/dashboard/Tutor/update-profile", icon: UserPen },
    { label: "Upgrade to Pro", href: "/dashboard/Tutor/pricing", icon: Crown },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Tuition approvals", href: "/dashboard/admin/tuition-approvals", icon: BadgeCheck },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: ReceiptText },
    { label: "Update profile", href: "/dashboard/admin/profile", icon: UserPen },
  ],
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getFirstName = (name: string) => name.split(" ")[0];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role: Role = user?.role === "tutor" || user?.role === "admin" ? user.role : "student";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-5 group-data-[collapsible=icon]:p-2">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-950">
          <span className="grid size-9 place-items-center rounded-lg bg-indigo-600 text-sm text-white">ML</span>
          <span className="group-data-[collapsible=icon]:hidden">MentorLagbe</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardMenus[role].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    className="h-11 px-4 text-base hover:text-indigo-600 data-active:bg-indigo-50 data-active:text-indigo-600 data-active:hover:bg-indigo-100 data-active:hover:text-indigo-700"
                  >
                    <item.icon />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleSignOut}
                  tooltip="Sign out"
                  className="h-11 px-4 text-base hover:text-indigo-600"
                >
                  <LogOut />
                  Sign out
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-5 group-data-[collapsible=icon]:p-2 mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
            <AvatarFallback className="bg-indigo-600 text-xs font-semibold text-white">
              {getInitials(user?.name || "User")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">{user?.name ? getFirstName(user.name) : "Loading..."}</p>
            <p className="text-xs capitalize text-muted-foreground">{role}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
