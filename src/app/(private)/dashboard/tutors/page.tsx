"use client";

import ProfileBrief from "@/src/components/ProfileBrief";
import HeaderCard from "@/src/components/ProfileBrief/HeaderCard";
import ScrollableTabs from "@/src/components/Tabs/ScrollableTabs";
import TeacherCard from "./TeacherCard";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const { role } = useAuth();
  const router = useRouter();

  const [activeSubject, setActiveSubject] = useState("English");
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const subjects = [
    "English",
    "French",
    "Italian",
    "Spanish",
    "Chinese",
    "Physics",
    "Biology",
    "Chemistry",
  ];

  useEffect(() => {
    axios
      .get("/api/fetch-teachers")
      .then((res) => setTeachers(res.data.data || []))
      .catch((err) =>
        console.error("Error fetching teachers:", err)
      );
  }, []);

  /* ---------------------------------
     FILTER LOGIC
  --------------------------------- */
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const subjectMatch =
        !activeSubject ||
        t.subject?.toLowerCase() === activeSubject.toLowerCase();

      const q = search.toLowerCase();
      const searchMatch =
        !q ||
        t.name?.toLowerCase().includes(q) ||
        t.subject?.toLowerCase().includes(q) ||
        t.languages?.some((l) =>
          l.name.toLowerCase().includes(q)
        );

      const languageMatch =
        selectedLanguage === "All" ||
        t.languages?.some(
          (l) =>
            l.name.toLowerCase() ===
            selectedLanguage.toLowerCase()
        );

      return subjectMatch && searchMatch && languageMatch;
    });
  }, [teachers, activeSubject, search, selectedLanguage]);

  return (
    <div>
      {/* ✅ Teachers Section */}
      <div className="mt-12 space-y-6">

        {/* 🔙 Back Button */}
        <div className="max-w-6xl mx-auto px-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Subject Tabs */}
        <ScrollableTabs
          items={subjects}
          activeItem={activeSubject}
          setActiveItem={setActiveSubject}
        />

        {/* 🔍 Search */}
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto px-6">
          <input
            type="text"
            placeholder="Search teacher, subject or language"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 👩‍🏫 Teachers list */}
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.teacherId}
              teacher={teacher}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredTeachers.length === 0 && (
          <p className="text-center text-gray-500">
            No teachers found
          </p>
        )}
      </div>
    </div>
  );
}
