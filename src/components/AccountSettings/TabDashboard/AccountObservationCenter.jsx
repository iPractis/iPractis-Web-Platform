"use client";

import { useEffect, useState } from "react";
import SectionHeader from "../../Shared/SectionHeader";

// Icons (add yours as needed)
import {
  EyeBiggerIcon,
  DatabaseBigIcon,
  TeacherBigIcon,
  UserBigIcon,
  LanguageBigIcon,
  CalendarBigIcon,
  EducationBigIcon,
  Clock5Icon,
  FileBigIcon,
} from "../../Icons";
import { useAuth } from "@/src/hooks/useAuth";

const AccountObservationCenter = () => {
      const { authenticated, user } = useAuth();
    
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/teachers/logs?teacher_id=${user?.teacherId}`);
        const data = await res.json();
       console.log("Fetched logs:", data);
        setLogs(data.logs || []);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // 🧩 Table → Icon mapping
  const TABLE_ICON_MAP = {
    teachers: <TeacherBigIcon fillColor="fill-primary-color-P1" />,
    teacher_education: <EducationBigIcon fillColor="fill-primary-color-P1" />,
    teacher_experiences: <FileBigIcon fillColor="fill-primary-color-P1" />,
    teacher_languages: <LanguageBigIcon fillColor="fill-primary-color-P1" />,
    teacher_availability: <Clock5Icon fillColor="fill-primary-color-P1" />,
    users: <UserBigIcon fillColor="fill-primary-color-P1" />,
    profiles: <UserBigIcon fillColor="fill-primary-color-P1" />,
    teacher_sub_subjects: <EducationBigIcon fillColor="fill-primary-color-P1" />,
  };

  // 🧠 Smart text for what changed
  const formatLogMessage = (tableName, columnName) => {
    const cleanTable = tableName.replace(/_/g, " ").trim();
    const cleanColumn = columnName.replace(/_/g, " ").trim();

    if (tableName === "teacher_education") return `Education field updated`;
    if (tableName === "teacher_experiences") return `Experience details changed`;
    if (tableName === "teacher_languages") return `Language preference updated`;
    if (tableName === "teacher_availability") return `Availability updated`;
    if (tableName === "teachers") return `Teacher’s ${cleanColumn} updated`;
    if (tableName === "profiles") return `Profile ${cleanColumn} updated`;
    if (tableName === "users") return `User account ${cleanColumn} updated`;
    if (tableName === "teacher_drafts") return `Draft changes saved`;

    return `${cleanTable} ${cleanColumn} updated`;
  };

  // 🖼️ Resolve icon based on table name
  const getTableIcon = (tableName) => {
    return (
      TABLE_ICON_MAP[tableName] || (
        <DatabaseBigIcon fillColor="fill-primary-color-P1" />
      )
    );
  };

  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="px-4"
        titleIcon={<EyeBiggerIcon fillColor="fill-primary-color-P1" />}
        titleText="Account’s Observation Center"
        descriptionText="Monitor recent data and account updates across entities."
        descriptionClassName="mt-[4px] mb-4"
        titleClassName="MT-SB-1"
      />

      <div className="bg-primary-color-P11 p-8 rounded-[32px] flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1 pb-4 border-b border-primary-color-P8">
          <h3 className="MT-SB-1 text-primary-color-P1 flex items-center gap-2">
            <span className="h-3 w-3 bg-primary-color-P6 rounded-full"></span>
            Recent actions
          </h3>
          <p className="ST-4 text-primary-color-P4">
            {loading ? "Fetching latest updates..." : "No action required"}
          </p>
        </div>

        {loading ? (
          <p className="text-primary-color-P4 text-center mt-6">
            Loading recent updates...
          </p>
        ) : logs.length === 0 ? (
          <p className="text-primary-color-P4 text-center mt-6">
            No recent changes detected.
          </p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="">
                {getTableIcon(log.table_name)}
              </div>
              <div>
                <h4 className="MT-SB-1 text-primary-color-P1">
                  {formatLogMessage(log.table_name, log.column_name)}
                </h4>
                <p className="ST-4 text-primary-color-P4">
                  {log.table_name.replace(/_/g, " ")} table —{" "}
                  {formatTimeAgo(log.changed_at)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccountObservationCenter;
