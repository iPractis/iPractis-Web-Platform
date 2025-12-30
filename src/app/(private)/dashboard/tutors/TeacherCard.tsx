"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import {
  DollarSignIcon,
  RightArrowMediumIcon,
  StudentCapIcon,
  TeacherIcon,
} from "@/src/components/Icons";
import IconHeader from "@/src/components/Shared/IconHeader";
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export default function TeacherCard({ teacher }) {
  const BADGE_COLORS = [
    "bg-black text-white",
    "bg-green-300 text-black",
    "bg-yellow-100 text-yellow-800",
  ];

const profileImage =
    teacher.profile_image || "/images/tutor-image-preview.png";

  const embedUrl = getYouTubeEmbedUrl(teacher.videoLink);

  return (
    <Link
      href={`/dashboard/${teacher.teacherId}`}
      className="flex flex-col md:flex-row gap-4 md:gap-5 rounded-2xl p-4 bg-white hover:shadow-md transition"
    >
      {/* LEFT — Video Thumbnail */}
    <div className="relative w-full md:w-80 aspect-video rounded-xl overflow-hidden bg-gray-100 shrink-0">
  {embedUrl ? (
    <iframe
      src={embedUrl}
      title="Tutor Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  ) : (
    <Image
      src="/images/tutor-video-preview.png"
      alt="Tutor video preview"
      fill
      className="object-cover"
    />
  )}

  {/* Play overlay (only visual, not blocking clicks) */}
  {!embedUrl && (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="bg-white/90 p-3 rounded-full shadow">
        <Play className="w-5 h-5 text-black" />
      </div>
    </div>
  )}
</div>

      {/* RIGHT — Content */}
      <div className="flex flex-col justify-between flex-1">
        {/* Top */}
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={teacher.profileImage}
                width={48}
                height={48}
                alt={teacher.name}
                className="rounded-xl h-12 w-12 object-cover"
              />
              <div>
                <p className="font-semibold">{teacher.name}</p>
                <p className="text-xs text-gray-500">
                  Teaches {teacher.subject}
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap gap-2">
            {teacher.languages?.map((lang, idx) => {
              const colorClass =
                BADGE_COLORS[idx % BADGE_COLORS.length];

              return (
                <span
                  key={idx}
                  className={`text-xs px-2 py-1 rounded-lg font-medium ${colorClass}`}
                >
                  {lang.name} {lang.level}
                </span>
              );
            })}
          </div>

          {/* Title + Description */}
          <div className="font-bold text-base md:text-lg">
            {teacher.profileTitle}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {teacher.introduction}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          {/* Price */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl min-h-[44px]">
            <IconHeader
              icon={
                <DollarSignIcon fillcolor="fill-primary-color-P4" />
              }
            />
            <div className="leading-tight">
              <p className="text-[10px] text-gray-500">
                Lesson rate
              </p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">
                  {teacher.price}
                </span>
                <span className="text-[9px] bg-yellow-100 px-1.5 py-0.5 rounded-md">
                  30 mins
                </span>
              </div>
            </div>
          </div>

          {/* Students */}
          <div className="flex items-center gap-2 bg-[#F8F7F5] px-2 py-2 rounded-xl min-h-[44px] w-fit">
            <div className="h-9 w-9 flex items-center justify-center bg-white rounded-lg">
              <StudentCapIcon fillColor="fill-primary-color-P4" />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-gray-500">
                Students
              </p>
              <p className="text-sm font-semibold">
                {teacher.studentCount}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button className="flex items-center justify-between gap-2 bg-blue-600 text-white text-sm px-2 py-2 rounded-3xl min-h-[44px] hover:bg-blue-700 transition sm:flex-1">
            <div className="flex items-center gap-2">
              <IconHeader
                icon={
                  <TeacherIcon fillcolor="fill-primary-color-P4" />
                }
              />
              <span className="whitespace-nowrap">
                Schedule lesson
              </span>
            </div>
            <IconHeader
              icon={
                <RightArrowMediumIcon fillcolor="fill-primary-color-P4" />
              }
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
