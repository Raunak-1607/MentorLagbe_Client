import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface TuitionCardProps {
  id?: string;
  _id?: string;
  title?: string;
  subject?: string;
  classLevel?: string;
  mode?: "Online" | "Offline" | string;
  monthlyFee?: number;
  tutorName?: string;
  bannerImage?: string;
  location?: string;
  daysPerWeek?: number;
  description?: string;
}

export interface ComponentProps {
  tuition?: TuitionCardProps;
  tuitions?: TuitionCardProps;
  id?: string;
  _id?: string;
  title?: string;
  subject?: string;
  classLevel?: string;
  mode?: "Online" | "Offline" | string;
  monthlyFee?: number;
  tutorName?: string;
  bannerImage?: string;
  location?: string;
  daysPerWeek?: number;
}

export default function TuitionCard(props: ComponentProps) {
  // Support <TuitionCard tuition={item} />, <TuitionCard tuitions={item} />, and <TuitionCard {...item} />
  const data = props.tuition || props.tuitions || props;

  const {
    id,
    _id,
    title = "Tuition Batch",
    subject = "Subject",
    classLevel = "Class",
    mode = "Online",
    monthlyFee = 0,
    tutorName = "Tutor",
    bannerImage,
  } = data;

  const tuitionId = _id || id || "";

  // Format display text nicely (e.g. "class-9-10" -> "Class 9-10", "physics" -> "Physics")
  const formattedClass = classLevel.toLowerCase().startsWith("class-")
    ? `Class ${classLevel.replace(/^class-/i, "")}`
    : classLevel;

  const formattedSubject =
    subject.charAt(0).toUpperCase() + subject.slice(1);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-200 hover:shadow-md">
      {/* Top Cover / Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#eeeffe]">
        {bannerImage ? (
          <Image
            src={bannerImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-[#0f172a] line-clamp-1">
          {title}
        </h3>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Subject Badge (Soft Lavender) */}
          <span className="inline-flex items-center rounded-full bg-[#f0edff] px-3 py-1 text-xs font-semibold text-[#4338ca]">
            {formattedSubject}
          </span>

          {/* Mode Badge (Soft Teal/Cyan) */}
          <span className="inline-flex items-center rounded-full bg-[#e0f7f6] px-3 py-1 text-xs font-semibold text-[#0e7490]">
            {mode}
          </span>

          {/* Class Level Badge (Soft Slate Gray) */}
          <span className="inline-flex items-center rounded-full bg-[#f1f3f7] px-3 py-1 text-xs font-semibold text-[#475569]">
            {formattedClass}
          </span>
        </div>

        {/* Tutor Name */}
        <p className="mt-2.5 text-sm text-gray-500">
          by {tutorName}
        </p>

        {/* Bottom Row: Price & View Details Button */}
        <div className="mt-8 flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-[#0f172a]">
              ৳{Number(monthlyFee).toLocaleString()}
            </span>
            <span className="text-sm font-normal text-gray-500">
              / month
            </span>
          </div>

          <Link
            href={tuitionId ? `/AllTuition/${tuitionId}` : "#"}
            className="inline-flex items-center justify-center rounded-xl bg-[#4338ca] px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#3730a3]"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
