"use client";
import { Play } from "lucide-react";
import Image from "next/image";

const TeacherCard = ({ teacher }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
      {/* Thumbnail */}
      <div className="relative">
        <Image
          src={"/images/tutor-video-preview.png"}
          alt={teacher.name}
            width={400}
            height={160}

          className="w-full h-40 object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md p-2 rounded-full">
            <Play size={16} className="text-black" />
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <Image
            src={"/images/tutor-image-preview.png"}
            width={40}
            height={40}
            alt={teacher.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold">{teacher.name}</p>
            <p className="text-sm text-gray-500">Teaches {teacher.subject}</p>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2">
          {teacher.languages.map((lang, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                lang.level === "Native"
                  ? "bg-black text-white"
                  : lang.level === "Fluent"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {lang.name} {lang.level}
            </span>
          ))}
          {teacher.extraLanguages && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              +{teacher.extraLanguages}
            </span>
          )}
        </div>

        {/* Lesson rate */}
        <div>
          <p className="text-sm text-gray-500">Lesson rate</p>
          <p className="font-semibold">
            {teacher.price} USD{" "}
            <span className="ml-2 text-xs bg-yellow-200 text-black px-2 py-1 rounded-full">
              For {teacher.duration}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const DiscoverCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-bold mb-3">Discover more teachers</h2>
        <p className="text-gray-600 text-sm">
          Search through 1000+ qualified teachers and select the perfect fit
          based on your target subject, goals and budget.
        </p>
      </div>
      <button className="mt-6 bg-blue-600 text-white py-3 px-5 rounded-full font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
        See more teachers
      </button>
    </div>
  );
};

const TeacherGrid = ({ teachers , selectedSubject }) => {
    const filteredTeachers = selectedSubject
    ? teachers.filter((t) => t.subject === selectedSubject) 
    : teachers;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 m-4  max-w-5xl mx-auto bg-gray-100 rounded-2xl" >
      {/* Left teacher cards */}
      {filteredTeachers.slice(0, 5).map((t, idx) => (
        <TeacherCard key={idx} teacher={t} />
      ))}

      {/* Right CTA */}
      <DiscoverCard />
    </div>
  );
};

export default TeacherGrid;
