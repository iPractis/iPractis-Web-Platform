"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const HOUR_HEIGHT = 56;

export default function GoogleCalendarWeekView({
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  startDateISO = null,
  hourRange = { start: 0, end: 23 },
}) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(() => new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const abortRef = useRef(null);

  /* --------------------------------------------------
     JOIN ELIGIBILITY (CORE RULE)
  -------------------------------------------------- */
  const canJoinEvent = (event) => {
    if (!event || event.source !== "booking") return false;

    const now = new Date();
    const start = new Date(event.startISO);
    const end = new Date(event.endISO);

    const EARLY_JOIN_MS = 5 * 60 * 1000;   // 5 min before
    const LATE_JOIN_MS = 10 * 60 * 1000;   // 10 min after

    return (
      now.getTime() >= start.getTime() - EARLY_JOIN_MS &&
      now.getTime() <= end.getTime() + LATE_JOIN_MS
    );
  };

  /* --------------------------------------------------
     Normalize API schedule
  -------------------------------------------------- */
  const normalizeSchedule = (schedule = []) => {
    const map = new Map();

    for (const entry of schedule) {
      if (!entry.date || !Array.isArray(entry.events)) continue;

      map.set(entry.date, {
        date: entry.date,
        day: dayNames[new Date(entry.date).getDay()],
        events: entry.events.map((ev) => ({
          title: ev.title,
          source: ev.source,
          booking_id: ev.booking_id,
          url: ev.url,
          startISO: `${entry.date}T${ev.start}:00`,
          endISO: `${entry.date}T${ev.end}:00`,
        })),
      });
    }

    return map;
  };

  /* --------------------------------------------------
     Build week frame
  -------------------------------------------------- */
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

  /* --------------------------------------------------
     Fetch calendar data
  -------------------------------------------------- */
  const fetchCalendar = async () => {
    setLoading(true);
    setError(null);

    if (abortRef.current) abortRef.current.abort();
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
  };

  /* --------------------------------------------------
     Effects
  -------------------------------------------------- */
  useEffect(() => {
    fetchCalendar();
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  /* --------------------------------------------------
     Current time (red line)
  -------------------------------------------------- */
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

  /* --------------------------------------------------
     Helpers
  -------------------------------------------------- */
  const isPastSlot = (date, hour) => {
    const slotStart = new Date(`${date}T${String(hour).padStart(2, "0")}:00`);
    return slotStart.getTime() < Date.now();
  };

  const isBusy = (date, hour) => {
    const day = days.find((d) => d.date === date);
    if (!day) return false;

    const slotStart = new Date(`${date}T${hour}:00`).getTime();
    const slotEnd = slotStart + 30 * 60 * 1000;

    return day.events.some((e) => {
      const s = new Date(e.startISO).getTime();
      const en = new Date(e.endISO).getTime();
      return slotStart < en && slotEnd > s;
    });
  };

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */
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

      {/* Day headers */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] min-w-[1000px]">
        <div />
        {days.map((d) => (
          <div key={d.date} className="flex justify-center py-2">
            <div
              className={`px-4 py-1.5 mx-2 rounded-full w-full text-center text-sm font-medium
                ${d.date === nowParts.date
                  ? "bg-black text-white shadow"
                  : "bg-gray-100 text-gray-700"
                }`}
            >
              {d.day} {new Date(d.date).getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] relative min-w-[1000px]">
        {/* Time column */}
        <div>
          {Array.from({ length: TOTAL_HOURS }, (_, i) => {
            const h = i + VISIBLE_START_HOUR;
            return (
              <div key={h} className="h-14 m-2 flex items-center justify-center text-xs text-gray-400 pr-2 text-right">
                {String(h).padStart(2, "0")}:00
              </div>
            );
          })}
        </div>

        {/* Days */}
        {days.map((day) => (
          <div key={day.date} className="relative ">
            {Array.from({ length: TOTAL_HOURS }, (_, i) => {
              const h = i + VISIBLE_START_HOUR;
              return (
                <div
                  key={h}
                  className={`h-14 rounded-lg m-2 border ${isPastSlot(day.date, h)
                      ? "bg-yellow-50"
                      : isBusy(day.date, h)
                        ? "cursor-not-allowed"
                        : "hover:bg-yellow-100"
                    }`}
                />
              );
            })}

            {/* Events */}
            {day.events.map((e, i) => {
              const start = new Date(e.startISO);
              const end = new Date(e.endISO);

              const startMinutes =
                (start.getHours() - VISIBLE_START_HOUR) * 60 +
                start.getMinutes();
              const endMinutes =
                (end.getHours() - VISIBLE_START_HOUR) * 60 +
                end.getMinutes();

              if (endMinutes <= 0 || startMinutes >= TOTAL_HOURS * 60)
                return null;

              const top = (startMinutes / 60) * HOUR_HEIGHT;
              const height =
                ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;

              const joinable = canJoinEvent(e);

              return (
                <div
                  key={i}
                  onClick={() => joinable && setSelectedEvent(e)}
                  className={`absolute left-1 right-1 rounded-lg px-2 py-1 text-xs shadow-sm line-clamp-1
                    ${e.source === "booking"
                      ? joinable
                        ? "bg-black text-white cursor-pointer hover:opacity-90"
                        : "bg-gray-400 text-white cursor-not-allowed opacity-60"
                      : "bg-gray-300 text-gray-800 cursor-default"
                    }`}
                  style={{ top, height }}
                >
                  <span className="line-clamp-1 text-center">{e.title}
                  </span>
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

      {/* Join modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-80 space-y-4 shadow-2xl">
            <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>

            <p className="text-sm text-gray-600">
              {selectedEvent.startISO.slice(11, 16)} –{" "}
              {selectedEvent.endISO.slice(11, 16)}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>

              {canJoinEvent(selectedEvent) ? (
                <Link
                  href={selectedEvent.url}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Join Class
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                >
                  Not Started Yet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
