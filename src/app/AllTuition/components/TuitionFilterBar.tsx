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
      className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-100 bg-white p-2.5 shadow-xs"
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or subject"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="min-w-[200px] flex-1 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-hidden"
      />

      {/* Subject Filter */}
      <div className="relative">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="appearance-none rounded-full border border-gray-200 bg-gray-50/80 pl-3.5 pr-7 py-1.5 text-xs font-medium text-gray-700 outline-hidden hover:bg-gray-100 cursor-pointer transition"
        >
          <option value="">Subject</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="math">Math</option>
          <option value="biology">Biology</option>
          <option value="english">English</option>
          <option value="programming">Programming</option>
          <option value="ielts">IELTS</option>
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
          ▼
        </span>
      </div>

      {/* Class Level Filter */}
      <div className="relative">
        <select
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          className="appearance-none rounded-full border border-gray-200 bg-gray-50/80 pl-3.5 pr-7 py-1.5 text-xs font-medium text-gray-700 outline-hidden hover:bg-gray-100 cursor-pointer transition"
        >
          <option value="">Class level</option>
          <option value="class-6-8">Class 6-8</option>
          <option value="class-9-10">Class 9-10</option>
          <option value="hsc">HSC</option>
          <option value="o-level">O Level</option>
          <option value="a-level">A Level</option>
          <option value="adult">Adult</option>
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
          ▼
        </span>
      </div>

      {/* Mode Filter */}
      <div className="relative">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="appearance-none rounded-full border border-gray-200 bg-gray-50/80 pl-3.5 pr-7 py-1.5 text-xs font-medium text-gray-700 outline-hidden hover:bg-gray-100 cursor-pointer transition"
        >
          <option value="">Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
          ▼
        </span>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="rounded-xl bg-[#4338ca] px-6 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#3730a3] cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
