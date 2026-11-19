import Image from "next/image";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="bg-[#f0f1ff] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-indigo-700 uppercase">
            Learn with confidence
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#0e1d4b] sm:text-5xl lg:text-6xl">
            Find your ideal tutor or mentorship batch today
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            Search verified tutors by subject, class level and mode, then apply
            in one simple step.
          </p>

          <form
            action="/tutorials"
            className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-indigo-100 bg-white p-3 shadow-sm sm:flex-row"
          >
            <label htmlFor="tutor-search" className="sr-only">
              Search a subject or tutor
            </label>
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400" />
              <Input
                id="tutor-search"
                name="query"
                placeholder="Search a subject or tutor"
                className="h-12 border-0 bg-transparent pl-11 text-base shadow-none focus-visible:ring-0"
              />
            </div>
            <Button
              type="submit"
              className="h-12 rounded-xl bg-indigo-700 px-6 text-base hover:bg-indigo-800"
            >
              Browse tuitions
            </Button>
          </form>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-3xl bg-indigo-700 shadow-lg sm:min-h-96">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
            alt="Tutor helping a student learn"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-r from-indigo-800/85 via-indigo-700/40 to-transparent" />
          <div className="absolute -top-16 -right-12 size-52 rounded-full bg-indigo-950/45" />
          <div className="absolute right-6 bottom-6 left-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur sm:right-auto sm:max-w-xs">
            <p className="text-sm font-semibold text-indigo-700">Personal guidance</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              Learn from people who understand your goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
