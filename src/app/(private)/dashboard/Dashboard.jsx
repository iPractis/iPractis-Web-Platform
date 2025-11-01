"use client";

import ProfileBrief from "@/src/components/ProfileBrief";
import HeaderCard from "@/src/components/ProfileBrief/HeaderCard";
import ScrollableTabs from "@/src/components/Tabs/ScrollableTabs";
import TeacherGrid from "./TeacherGrid";
import Link from "next/link";
import WorkScheduleTable from "@/src/components/Shared/WorkScheduleTable"; // ✅ reuse your existing grid
import { useEffect, useState } from "react";
import GoogleCalendarDayView from "./GoogleCalendarDayView";

export default function Dashboard() {
  const [active, setActive] = useState("English");
  const [calendarSchedule, setCalendarSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 🟢 Fetch from your existing API
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await fetch("/api/google/events");
        const data = await res.json();

        if (res.ok && data.schedule) {
          setCalendarSchedule(data.schedule);
        } else {
          console.warn("No calendar data available:", data);
        }
      } catch (err) {
        console.error("Error fetching Google Calendar events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  // 🧩 your hardcoded teacher data
   const teachers = [
  // English
  {
    name: "English Teacher 1",
    subject: "English",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "English", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "English Teacher 2",
    subject: "English",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "English", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "English Teacher 3",
    subject: "English",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "English", level: "Native" }, { name: "Italian", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "English Teacher 4",
    subject: "English",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "English", level: "Native" }, { name: "Chinese", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "English Teacher 5",
    subject: "English",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "English", level: "Native" }, { name: "Biology", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // French
  {
    name: "French Teacher 1",
    subject: "French",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "French", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "French Teacher 2",
    subject: "French",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "French", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "French Teacher 3",
    subject: "French",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "French", level: "Native" }, { name: "Italian", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "French Teacher 4",
    subject: "French",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "French", level: "Native" }, { name: "Chinese", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "French Teacher 5",
    subject: "French",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "French", level: "Native" }, { name: "Chemistry", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // Italian
  {
    name: "Italian Teacher 1",
    subject: "Italian",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "Italian", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "Italian Teacher 2",
    subject: "Italian",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "Italian", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "Italian Teacher 3",
    subject: "Italian",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "Italian", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "Italian Teacher 4",
    subject: "Italian",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "Italian", level: "Native" }, { name: "Chinese", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "Italian Teacher 5",
    subject: "Italian",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "Italian", level: "Native" }, { name: "Biology", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // Spanish
  {
    name: "Spanish Teacher 1",
    subject: "Spanish",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "Spanish", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "Spanish Teacher 2",
    subject: "Spanish",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "Spanish", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "Spanish Teacher 3",
    subject: "Spanish",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "Spanish", level: "Native" }, { name: "Italian", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "Spanish Teacher 4",
    subject: "Spanish",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "Spanish", level: "Native" }, { name: "Chinese", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "Spanish Teacher 5",
    subject: "Spanish",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "Spanish", level: "Native" }, { name: "Chemistry", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // Chinese
  {
    name: "Chinese Teacher 1",
    subject: "Chinese",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "Chinese", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "Chinese Teacher 2",
    subject: "Chinese",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "Chinese", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "Chinese Teacher 3",
    subject: "Chinese",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "Chinese", level: "Native" }, { name: "Italian", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "Chinese Teacher 4",
    subject: "Chinese",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "Chinese", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "Chinese Teacher 5",
    subject: "Chinese",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "Chinese", level: "Native" }, { name: "Biology", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // Physics
  {
    name: "Physics Teacher 1",
    subject: "Physics",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "Physics", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "Physics Teacher 2",
    subject: "Physics",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "Physics", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "Physics Teacher 3",
    subject: "Physics",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "Physics", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "Physics Teacher 4",
    subject: "Physics",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "Physics", level: "Native" }, { name: "Chemistry", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "Physics Teacher 5",
    subject: "Physics",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "Physics", level: "Native" }, { name: "Biology", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // Biology
  {
    name: "Biology Teacher 1",
    subject: "Biology",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "Biology", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "Biology Teacher 2",
    subject: "Biology",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "Biology", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "Biology Teacher 3",
    subject: "Biology",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "Biology", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "Biology Teacher 4",
    subject: "Biology",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "Biology", level: "Native" }, { name: "Chemistry", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "Biology Teacher 5",
    subject: "Biology",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "Biology", level: "Native" }, { name: "Physics", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },

  // Chemistry
  {
    name: "Chemistry Teacher 1",
    subject: "Chemistry",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar1.jpg",
    languages: [{ name: "Chemistry", level: "Native" }, { name: "English", level: "Fluent" }],
    extraLanguages: 1,
    price: 8,
    duration: "30 minutes session",
  },
  {
    name: "Chemistry Teacher 2",
    subject: "Chemistry",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar2.jpg",
    languages: [{ name: "Chemistry", level: "Native" }, { name: "French", level: "Fluent" }],
    extraLanguages: 2,
    price: 9,
    duration: "30 minutes session",
  },
  {
    name: "Chemistry Teacher 3",
    subject: "Chemistry",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar3.jpg",
    languages: [{ name: "Chemistry", level: "Native" }, { name: "Spanish", level: "Fluent" }],
    extraLanguages: 1,
    price: 10,
    duration: "30 minutes session",
  },
  {
    name: "Chemistry Teacher 4",
    subject: "Chemistry",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar4.jpg",
    languages: [{ name: "Chemistry", level: "Native" }, { name: "Biology", level: "Fluent" }],
    extraLanguages: 0,
    price: 11,
    duration: "30 minutes session",
  },
  {
    name: "Chemistry Teacher 5",
    subject: "Chemistry",
    image: "/images/tutor-video-preview.jpg",
    avatar: "/teachers/avatar5.jpg",
    languages: [{ name: "Chemistry", level: "Native" }, { name: "Physics", level: "Fluent" }],
    extraLanguages: 1,
    price: 12,
    duration: "30 minutes session",
  },
];

  return (
    <div>
      <ProfileBrief />

      <div className="flex justify-center mt-10">
        <Link href="/teacher-registration">
          <HeaderCard
            invertImage={true}
            image="/icons/additionalDetails.png"
            title="Become a teacher"
            subtitle="Find any feature or setting quickly."
          />
        </Link>
      </div>

      {/* ✅ Teachers Section */}
      <div className="mt-12">
        <ScrollableTabs
          items={subjects}
          activeItem={active}
          setActiveItem={setActive}
        />
        <TeacherGrid teachers={teachers} selectedSubject={active} />
      <GoogleCalendarDayView />

      </div>
    </div>
  );
}
