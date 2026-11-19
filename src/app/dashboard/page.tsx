"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const dashboardPath = {
  student: "/dashboard/student",
  tutor: "/dashboard/Tutor",
  admin: "/dashboard/admin",
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const role = session?.user.role;
    const destination =
      role === "tutor" || role === "admin"
        ? dashboardPath[role]
        : dashboardPath.student;

    router.replace(destination);
  }, [isPending, router, session]);

  return <p className="text-sm text-muted-foreground">Opening your dashboard...</p>;
}
