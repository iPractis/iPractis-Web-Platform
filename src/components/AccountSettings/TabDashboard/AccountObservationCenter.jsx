"use client";

import { useEffect, useState } from "react";
import SectionHeader from "../../Shared/SectionHeader";
import {
  EyeIcon,
  DatabaseBigIcon,
  TeacherBigIcon,
  UserBigIcon,
  LanguageBigIcon,
  EducationBigIcon,
  Clock5Icon,
  FileBigIcon,
} from "../../Icons";
import { useAuth } from "@/src/hooks/useAuth";

const AccountObservationCenter = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("User in AccountObservationCenter:", user);

  useEffect(() => {
    if (!user?.teacherId) return;

    const fetchLogs = async () => {
      try {
        const res = await fetch(
          `/api/teachers/logs?teacher_id=${user.teacherId}`
        );
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user?.teacherId]);

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const diffMinutes = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60)
    );
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  /* --------------------------------------------------
     TABLE → ICON mapping (UPDATED)
  -------------------------------------------------- */
  const TABLE_ICON_MAP = {
    teachers: <TeacherBigIcon fillcolor="fill-primary-color-P1" />,
    users: <UserBigIcon fillcolor="fill-primary-color-P1" />,

    user_education: <EducationBigIcon fillcolor="fill-primary-color-P1" />,
    user_experiences: <FileBigIcon fillcolor="fill-primary-color-P1" />,
    user_languages: <LanguageBigIcon fillcolor="fill-primary-color-P1" />,

    teacher_availability: <Clock5Icon fillcolor="fill-primary-color-P1" />,
    teacher_sub_subjects: <EducationBigIcon fillcolor="fill-primary-color-P1" />,
    teacher_drafts: <FileBigIcon fillcolor="fill-primary-color-P1" />,
  };

  /* --------------------------------------------------
     SMART log text (UPDATED)
  -------------------------------------------------- */
  const formatLogMessage = (tableName, columnName) => {
    if (tableName.startsWith("user_")) {
      return `Profile ${columnName.replace(/_/g, " ")} updated`;
    }

    if (tableName === "teachers") {
      return `Teaching detail updated`;
    }

    if (tableName === "teacher_availability") {
      return `Availability updated`;
    }

    if (tableName === "teacher_sub_subjects") {
      return `Teaching subjects updated`;
    }

    if (tableName === "teacher_drafts") {
      return `Draft changes saved`;
    }

    return `${tableName.replace(/_/g, " ")} updated`;
  };

  const getTableIcon = (tableName) =>
    TABLE_ICON_MAP[tableName] || (
      <DatabaseBigIcon fillcolor="fill-primary-color-P1" />
    );

  return (
    <div className="space-y-8">
      <SectionHeader
        titleIcon={<EyeIcon fillcolor="fill-primary-color-P1" />}
        titleText="Account Observation Center"
        descriptionText="Track recent changes across your profile and teaching setup."
      />

      <div className="bg-primary-color-P11 p-8 rounded-[32px] space-y-6">
        {loading ? (
          <p className="text-center text-primary-color-P4">Loading updates…</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-primary-color-P4">
            No recent changes detected.
          </p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex gap-4">
              {getTableIcon(log.table_name)}
              <div>
                <h4 className="MT-SB-1 text-primary-color-P1">
                  {formatLogMessage(log.table_name, log.column_name)}
                </h4>
                <p className="ST-4 text-primary-color-P4">
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
