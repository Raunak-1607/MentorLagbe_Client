import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { MyTuitionCard, MyTuitionCardProps } from "@/components/my-tuition-card";
import { auth, db } from "@/lib/auth";
import type { Tuition } from "@/types/tuition";

const tableHeaders = ["Tuition", "Fee", "Admin status", "Active", "Actions"];
export default async function MyTuitionsPage() {
  // const session = await auth.api.getSession({ headers: await headers() });
  // const tutorId = session?.user.role === "tutor" ? session.user.id : "";

  // const tuitions = tutorId
  //   ? await db.collection<Tuition>("tuition").find({ tutorId }).sort({ createdAt: -1 }).toArray()
  //   : [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tuition`)
  const tuitions = await res.json();

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My tuitions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Edit, close or delete your posts.</p>
        </div>
        <Button render={<Link href="/dashboard/Tutor/post-tuition" />} className="bg-indigo-600 hover:bg-indigo-700">
          Post new tuition
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
        <h3 className="px-5 py-4 text-lg font-semibold">My tuitions</h3>
        <table className="w-full min-w-200 text-left text-sm">
          <thead className="border-y bg-muted/40 text-muted-foreground">
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="px-5 py-3 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition : MyTuitionCardProps ,index:number) => (
              <MyTuitionCard key={index} {...tuition} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
