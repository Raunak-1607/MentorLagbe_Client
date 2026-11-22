

import Hero from "@/components/Hero";
import AllTuitionPage from "./AllTuition/page";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    search?: string;
    subject?: string;
    classLevel?: string;
    mode?: string;
  }>;
}) {
  return (
    <main className="flex-1">
      <Hero />
      <AllTuitionPage searchParams={searchParams} />
    </main>
  );
}
