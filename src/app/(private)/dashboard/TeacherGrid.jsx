"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const TeacherCard = ({ teacher }) => {
  console.log("Rendering TeacherCard for teacher:", teacher);
  const name = teacher.name

  const profileImage =
    teacher.profile_image || "/images/tutor-image-preview.png";

  const embedUrl = getYouTubeEmbedUrl(teacher.videoLink);

  return (
    <Link href={`/dashboard/${teacher.teacherId}`} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
      {/* Video Preview */}
      <div className="relative aspect-video bg-gray-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Tutor Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            className="w-full h-full rounded-lg"
          ></iframe>
        ) : (
          <Image
            src="/images/tutor-video-preview.png"
            alt="Tutor video preview"
            fill
            className="object-cover rounded-lg"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <Image
            src={profileImage}
            width={40}
            height={40}
            alt={name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-gray-500">
              Teaches {teacher.subject || "Subject"}
            </p>
          </div>
        </div>

        {/* Languages */}
        {teacher.languages?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {teacher.languages.map((lang, idx) => (
              <span
                key={idx}
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  lang.level?.toLowerCase().includes("native")
                    ? "bg-black text-white"
                    : lang.level?.toLowerCase().includes("fluent")
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {lang.name} {lang.level}
              </span>
            ))}
            {teacher.extraLanguages > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                +{teacher.extraLanguages}
              </span>
            )}
          </div>
        )}

        {/* Lesson rate */}
        <div>
          <p className="text-sm text-gray-500">Lesson rate</p>
          <p className="font-semibold">
            {teacher.hourlyPrice || teacher.price || "—"} USD{" "}
            <span className="ml-2 text-xs bg-yellow-200 text-black px-2 py-1 rounded-full">
              For 30 minutes session
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

const DiscoverCard = () => (
  <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between h-full">
    <div>
      <h2 className="text-xl font-bold mb-3">Discover more teachers</h2>
      <p className="text-gray-600 text-sm">
        Search through 1000+ qualified teachers and select the perfect fit
        based on your subject, goals, and budget.
      </p>
    </div>
    <button className="mt-6 bg-blue-600 text-white py-3 px-5 rounded-full font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
      See more teachers
    </button>
  </div>
);

const TeacherGrid = ({ teachers = [], selectedSubject }) => {
  const filteredTeachers = selectedSubject
    ? teachers.filter(
        (t) =>
          t.subject?.toLowerCase() === selectedSubject.toLowerCase()
      )
    : teachers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 m-4 max-w-5xl mx-auto bg-gray-100 rounded-2xl">
      {filteredTeachers.slice(0, 5).map((t) => (
        <TeacherCard key={t.teacherId} teacher={t} />
      ))}
      <DiscoverCard />
    </div>
  );
};

export default TeacherGrid;
