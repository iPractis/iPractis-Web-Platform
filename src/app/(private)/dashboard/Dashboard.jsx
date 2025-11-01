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
  const teachers = [/* ... your teachers array here ... */];

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
