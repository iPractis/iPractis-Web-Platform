"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

const dayNames = [
  "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

const HOUR_HEIGHT = 52.3;

export default function GoogleCalendarWeekView({
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  startDateISO = null,
  hourRange = { start: 0, end: 23 },
}) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(() => new Date());

  const abortRef = useRef(null);

  /* -----------------------------
     Normalize API schedule
  ----------------------------- */
  const normalizeSchedule = (schedule = []) => {
    const map = new Map();

    for (const entry of schedule) {
      if (!entry.date || !Array.isArray(entry.events)) continue;

      map.set(entry.date, {
        date: entry.date,
        day: dayNames[new Date(entry.date).getDay()],
        events: entry.events.map((ev) => ({
          title: ev.title,
          startISO: `${entry.date}T${ev.start}:00`,
          endISO: `${entry.date}T${ev.end}:00`,
        })),
      });
    }

    return map;
  };

  /* -----------------------------
     Build week frame
  ----------------------------- */
  const buildWeekFrame = (startISO) => {
    const start = new Date(startISO);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return {
        date: d.toISOString().split("T")[0],
        day: dayNames[d.getDay()],
        events: [],
      };
    });
  };

  /* -----------------------------
     Fetch calendar
  ----------------------------- */
const fetchCalendar = React.useCallback(async () => {
  setLoading(true);
  setError(null);

  abortRef.current?.abort();
  const controller = new AbortController();
  abortRef.current = controller;

  try {
    const res = await fetch("/api/dashboard/calendar-event", {
      signal: controller.signal,
    });

    if (!res.ok) throw new Error("Calendar not synced");

    const data = await res.json();

    const weekStart =
      startDateISO ||
      (() => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay());
        return d.toISOString().split("T")[0];
      })();

    const normalized = normalizeSchedule(data.schedule || []);
    const frame = buildWeekFrame(weekStart);

    setDays(
      frame.map((d) => ({
        ...d,
        events: normalized.get(d.date)?.events || [],
      }))
    );
  } catch (e) {
    if (e.name !== "AbortError") setError(e.message);
  } finally {
    setLoading(false);
  }
}, [startDateISO]);

 useEffect(() => {
  fetchCalendar(); // initial load

  const POLL_INTERVAL = 30_000; // 🔥 30 sec (recommended)

  const interval = setInterval(() => {
    if (document.visibilityState === "visible") {
      fetchCalendar();
    }
  }, POLL_INTERVAL);

  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      fetchCalendar(); // instant refresh on tab focus
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    clearInterval(interval);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    abortRef.current?.abort();
  };
}, [fetchCalendar]);


  /* -----------------------------
     Current time
  ----------------------------- */
  const nowParts = useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(now)
      .reduce((acc, p) => {
        acc[p.type] = p.value;
        return acc;
      }, {});

    return {
      date: `${parts.year}-${parts.month}-${parts.day}`,
      minutes: Number(parts.hour) * 60 + Number(parts.minute),
    };
  }, [now, timeZone]);

  /* -----------------------------
     Helpers (30-min aware)
  ----------------------------- */
  const isPastSlot = (date, hour, minute) => {
    const start = new Date(
      `${date}T${String(hour).padStart(2, "0")}:${minute === 0 ? "00" : "30"}`
    ).getTime();

    return Date.now() >= start + 30 * 60 * 1000;
  };

  const isBusy = (date, hour, minute) => {
    const day = days.find((d) => d.date === date);
    if (!day) return false;

    const slotStart = new Date(
      `${date}T${String(hour).padStart(2, "0")}:${minute === 0 ? "00" : "30"}`
    ).getTime();

    const slotEnd = slotStart + 30 * 60 * 1000;

    return day.events.some((e) => {
      const s = new Date(e.startISO).getTime();
      const en = new Date(e.endISO).getTime();
      return slotStart < en && slotEnd > s;
    });
  };
  const getEventForSlot = (date, hour, minuteOffset) => {
  const day = days.find((d) => d.date === date);
  if (!day) return null;

  const slotStart = new Date(
    `${date}T${String(hour).padStart(2, "0")}:${minuteOffset === 0 ? "00" : "30"}`
  ).getTime();

  const slotEnd = slotStart + 30 * 60 * 1000;

  return day.events.find((e) => {
    const s = new Date(e.startISO).getTime();
    const en = new Date(e.endISO).getTime();
    return slotStart < en && slotEnd > s;
  }) || null;
};

  /* -----------------------------
     Render
  ----------------------------- */
  if (loading)
    return <div className="p-6 text-center text-gray-500">Loading calendar…</div>;

  if (error)
    return (
      <div className="p-6 text-center">
        Sync Google Calendar from{" "}
        <Link href="/account-settings" className="text-blue-600 font-semibold">
          Account Settings
        </Link>
      </div>
    );

  const VISIBLE_START_HOUR = hourRange.start;
  const TOTAL_HOURS = hourRange.end - hourRange.start + 1;

  return (
    <div className="border rounded-2xl bg-white shadow-sm overflow-auto">
      <header className="sticky top-0 z-20 bg-white border-b px-4 py-3 font-semibold text-gray-700 text-center">
        Weekly Calendar
      </header>

      <div className="grid grid-cols-[80px_repeat(7,1fr)] w-full">
        <div />
        {days.map((d) => (
          <div key={d.date} className="text-center py-2 text-sm font-medium">
            {d.day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[80px_repeat(7,1fr)] min-w-[1000px]">
        {/* Time column */}
        <div>
          {Array.from({ length: TOTAL_HOURS }, (_, i) => {
            const h = i + VISIBLE_START_HOUR;
            return (
              <div key={h} className="h-12 m-1 flex justify-center items-center text-xs text-gray-400 text-right pr-2">
                {String(h).padStart(2, "0")}:00
              </div>
            );
          })}
        </div>

        {/* Days */}
        {days.map((day) => (
  <div key={day.date} className="relative">
    {Array.from({ length: TOTAL_HOURS }, (_, i) => {
      const h = i + VISIBLE_START_HOUR;

      const topEvent = getEventForSlot(day.date, h, 0);
      const bottomEvent = getEventForSlot(day.date, h, 30);

      return (
        <div
          key={h}
          className="h-12 m-1 rounded-lg border overflow-hidden text-[10px]"
        >
          {/* TOP HALF :00–:30 */}
          <div
            onClick={() => {
              if (isPastSlot(day.date, h, 0) || topEvent) return;
            }}
            className={`h-1/2 px-1 flex items-center justify-center truncate line-clamp-1
              ${
                isPastSlot(day.date, h, 0)
                  ? "bg-yellow-100 cursor-not-allowed"
                  : topEvent
                  ? "bg-black text-white cursor-not-allowed"
                  : "hover:bg-green-300 cursor-pointer"
              }`}
          >
            {topEvent?.title}
          </div>

          {/* BOTTOM HALF :30–:60 */}
          <div
            onClick={() => {
              if (isPastSlot(day.date, h, 30) || bottomEvent) return;
              console.log("Selected:", day.date, h, "30");
            }}
            className={`h-1/2 px-1 flex items-center justify-center truncate border-t
              ${
                isPastSlot(day.date, h, 30)
                  ? "bg-yellow-100 cursor-not-allowed"
                  : bottomEvent
                  ? "bg-black text-white cursor-not-allowed"
                  : "hover:bg-green-300 cursor-pointer"
              }`}
          >
            {bottomEvent?.title}
          </div>
        </div>
      );
    })}

    {/* Current time indicator */}
    {day.date === nowParts.date &&
      nowParts.minutes / 60 >= VISIBLE_START_HOUR && (
        <div
          className="absolute left-0 right-0 h-[2px] bg-red-500 z-30"
          style={{
            top:
              (nowParts.minutes / 60 - VISIBLE_START_HOUR) *
              HOUR_HEIGHT,
          }}
        />
      )}
  </div>
))}

      </div>
    </div>
  );
}
