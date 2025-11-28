"use client";

import { useEffect, useState } from "react";
import SectionHeader from "../../Shared/SectionHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import ActivityItem from "./ActivityItem";

// Icons
import { CalendarIcon, CalendarMediumIcon } from "../../Icons";

// Time formatting
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // 🔹 Fetch logs (limited for display)
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/logs");
        const data = await res.json();
        console.log("Fetched logs:", data);
        setLogs(data.logs.slice(0, 5) || []);
      } catch (err) {
        console.error("Error fetching activity logs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  // 🔹 Download all logs as CSV
  const handleDownloadAllLogs = async () => {
    try {
      setDownloading(true);
      const res = await fetch("/api/logs");
      const data = await res.json();

      if (!res.ok || !data.logs) {
        alert("Failed to download logs");
        return;
      }

      const csv = convertToCSV(data.logs);
      downloadFile(csv, "activity_logs.csv");
    } catch (err) {
      console.error("Error downloading logs:", err);
      alert("Something went wrong while downloading logs.");
    } finally {
      setDownloading(false);
    }
  };

  // 🔹 Convert logs array → CSV string
  const convertToCSV = (logs) => {
    if (!logs.length) return "";

    const headers = Object.keys(logs[0]);
    const rows = logs.map((log) =>
      headers.map((h) => JSON.stringify(log[h] ?? "")).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  // 🔹 Utility to trigger browser download
  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔹 Map table/column names to readable text
  const getActivityTitle = (table, column) => {
    const lookup = {
      users: "Account settings updated",
      teachers: "Teacher profile updated",
      teacher_education: "Education details updated",
      notification_preferences: "Notification preferences changed",
      hourly_price: "Hourly price changed",
      description: "Description updated",
    };

    return lookup[column] || lookup[table] || `${table}.${column} updated`;
  };

  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<CalendarMediumIcon fillcolor={"fill-primary-color-P1"} />}
        titleText="Activities Log"
        descriptionText="Monitor your account activities."
      />

      <SectionContent className="w-full">
        {/* Loading / Empty states */}
        {loading ? (
          <p className="text-center text-primary-color-P4 ST-3">
            Loading activity logs...
          </p>
        ) : logs.length === 0 ? (
          <p className="text-center text-primary-color-P4 ST-3">
            No recent activities found.
          </p>
        ) : (
          <section className="space-y-2.5">
            {logs.map((log) => {
              const formattedTime = dayjs(log.changed_at).format("hh:mm A");
              const uniqueKey = `${log.id}-${log.changed_at}-${log.column_name}`;

              return (
                <ActivityItem
                  key={uniqueKey}
                  event={log.column_name}
                  displayDate={formattedTime}
                  device="Web"
                  location="Algiers, Algeria"
                />
              );
            })}
          </section>
        )}
      </SectionContent>
    </SectionWrapper>
  );
};

export default ActivityLog;
