import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUsers } from "@/lib/actions/users";
import UserManagementTable from "./components/UserManagementTable";

export default async function UserManagementPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔒 Auth guard — redirect non-admins immediately
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const users = await getUsers();

  return (
    <section className="max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
          User management
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Change roles for any registered user.
        </p>
      </div>

      <UserManagementTable initialUsers={users} />
    </section>
  );
}
