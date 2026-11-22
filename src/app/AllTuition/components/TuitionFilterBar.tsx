"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TuitionFilterBarProps {
  initialSearch?: string;
  initialSubject?: string;
  initialClassLevel?: string;
  initialMode?: string;
}

export default function TuitionFilterBar({
  initialSearch = "",
  initialSubject = "",
  initialClassLevel = "",
  initialMode = "",
}: TuitionFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    initialSearch || searchParams.get("search") || ""
  );
  const [subject, setSubject] = useState(
    initialSubject || searchParams.get("subject") || ""
  );
  const [classLevel, setClassLevel] = useState(
    initialClassLevel || searchParams.get("classLevel") || ""
  );
  const [mode, setMode] = useState(
    initialMode || searchParams.get("mode") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (subject && subject !== "all") params.set("subject", subject);
    if (classLevel && classLevel !== "all") params.set("classLevel", classLevel);
    if (mode && mode !== "all") params.set("mode", mode);

    const queryString = params.toString();
    router.push(queryString ? `/AllTuition?${queryString}` : "/AllTuition");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-3 shadow-xs"
    >
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search by title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-hidden bg-transparent"
        />
      </div>

      {/* Filter Selects Grid (3 equal columns on mobile, auto on tablet & desktop) */}
      <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
        {/* Subject Filter */}
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full appearance-none rounded-xl sm:rounded-full border border-gray-200 bg-gray-50/80 pl-2.5 sm:pl-3.5 pr-6 sm:pr-7 py-2 sm:py-1.5 text-xs font-medium text-gray-700 outline-hidden hover:bg-gray-100 cursor-pointer transition"
          >
            <option value="">Subject</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Math">Math</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
            <option value="ICT">ICT</option>
            <option value="Programming">Programming</option>
            <option value="IELTS">IELTS</option>
            <option value="Bangla">Bangla</option>
            <option value="Higher Math">Higher Math</option>
            <option value="Accounting">Accounting</option>
            <option value="General Science">General Science</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
            ▼
          </span>
        </div>

        {/* Class Level Filter */}
        <div className="relative">
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="w-full appearance-none rounded-xl sm:rounded-full border border-gray-200 bg-gray-50/80 pl-2.5 sm:pl-3.5 pr-6 sm:pr-7 py-2 sm:py-1.5 text-xs font-medium text-gray-700 outline-hidden hover:bg-gray-100 cursor-pointer transition"
          >
            <option value="">Class</option>
            <option value="class-6-8">Class 6-8</option>
            <option value="class-9-10">Class 9-10</option>
            <option value="hsc">HSC</option>
            <option value="admission">Admission</option>
            <option value="o-level">O Level</option>
            <option value="a-level">A Level</option>
            <option value="adult">Adult</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
            ▼
          </span>
        </div>

        {/* Mode Filter */}
        <div className="relative">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full appearance-none rounded-xl sm:rounded-full border border-gray-200 bg-gray-50/80 pl-2.5 sm:pl-3.5 pr-6 sm:pr-7 py-2 sm:py-1.5 text-xs font-medium text-gray-700 outline-hidden hover:bg-gray-100 cursor-pointer transition"
          >
            <option value="">Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
            ▼
          </span>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full sm:w-auto rounded-xl bg-[#4338ca] px-5 py-2.5 sm:py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#3730a3] cursor-pointer text-center"
      >
        Search
      </button>
    </form>
  );
}
