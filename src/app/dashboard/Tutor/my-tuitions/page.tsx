import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenByServer } from "@/lib/GetTokenServer";
import type { MyTuitionCardProps } from "@/components/my-tuition-card";
import MyTuitionsTable from "./components/MyTuitionsTable";

export default async function MyTuitionsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const tutorEmail = session?.user?.email;

  const tokenRes = await getTokenByServer();
  const token = typeof tokenRes === "string" ? tokenRes : tokenRes?.token;
  const authHeaders: Record<string, string> = token
    ? { authorization: `Barer ${token}` }
    : {};

  let tuitions: MyTuitionCardProps[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
    const res = await fetch(
      `${baseUrl}/tuition?email=${tutorEmail}`,
      { cache: "no-store", headers: authHeaders }
    );
    if (res.ok) {
      const data = await res.json();
      tuitions = Array.isArray(data)
        ? data.filter((t: { tutorEmail?: string }) => t.tutorEmail === tutorEmail)
        : [];
    }
  } catch {
    tuitions = [];
  }

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My tuitions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit, close or delete your posts.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/Tutor/post-tuition" />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Post new tuition
        </Button>
      </div>

      <MyTuitionsTable initialTuitions={tuitions} />
    </section>
  );
}
