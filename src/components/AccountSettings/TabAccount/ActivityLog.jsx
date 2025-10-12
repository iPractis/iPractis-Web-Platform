"use client";

import { useEffect, useState } from "react";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import ActivityItem from "./ActivityItem";

// Icons
import { DownloadMediumIcon, CalendarIcon } from "../../Icons";

// Time formatting
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch logs from API
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/logs");
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        console.error("Error fetching activity logs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  // 🔹 Utility to format date as “x hours ago”, “Yesterday”, or full date
  const formatDate = (timestamp) => {
    const now = dayjs();
    const date = dayjs(timestamp);

    if (now.diff(date, "hour") < 24) return date.fromNow();
    if (now.diff(date, "day") === 1) return "Yesterday";
    return date.format("DD MMM, YYYY • hh:mm A");
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
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
        descriptionText="View a detailed history of recent account activities."
        titleIcon={<CalendarIcon fillColor={"fill-primary-color-P1"} />}
        headerContainerClassName="flex-[40%]"
        descriptionClassName="mt-[4px]"
        titleText="Activity Log"
        titleClassName="MT-SB-1"
      >
        <div className="flex-1">
          <button
            className="btn btn-tertiary flex w-full gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl"
            type="button"
          >
            <span className="MT-1 px-1.5">Download</span>
            <InputBGWrapperIcon className="bg-primary-color-P1">
              <DownloadMediumIcon fillColor={"fill-primary-color-P12"} />
            </InputBGWrapperIcon>
          </button>
        </div>
      </SectionHeader>

      {/* Loading / Empty states */}
      {loading ? (
        <p className="text-center text-primary-color-P4 ST-3">Loading activity logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-center text-primary-color-P4 ST-3">No recent activities found.</p>
      ) : (
        <section className="space-y-2.5 lg:px-8">
          {logs.map((log, idx) => {
            const formattedDate = dayjs(log.changed_at).format("DD MMM, YYYY");
            const formattedTime = dayjs(log.changed_at).format("hh:mm A");

            return (
              <ActivityItem
                key={idx}
                date={formattedDate}
                time={formattedTime}
                title={getActivityTitle(log.table_name, log.column_name)}
              />
            );
          })}
        </section>
      )}
    </div>
  );
};

export default ActivityLog;
