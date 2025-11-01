"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function GoogleCalendarWeekView({
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  startDateISO = null,
  hourRange = { start: 0, end: 23 },
}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const abortRef = useRef(null);

  function zonedDateFromDateAndTime(dateISO, hour, minute = 0, tz = timeZone) {
    try {
      const [year, month, day] = dateISO.split("-").map((s) => parseInt(s, 10));
      const utcCandidate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const parts = fmt.formatToParts(utcCandidate).reduce((acc, p) => {
        acc[p.type] = p.value;
        return acc;
      }, {});
      const matches =
        parts.year === String(year) &&
        parts.month === String(month).padStart(2, "0") &&
        parts.day === String(day).padStart(2, "0") &&
        parts.hour === String(hour).padStart(2, "0") &&
        parts.minute === String(minute).padStart(2, "0");
      if (matches) return utcCandidate;
      return new Date(`${dateISO}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
    } catch {
      return new Date(`${dateISO}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
    }
  }

  const normalizeSchedule = (rawSchedule = []) => {
    const map = new Map();
    for (const entry of rawSchedule) {
      const date = entry.date || entry.dayDate || null;
      if (!date) continue;
      const day = entry.day || dayNames[new Date(date).getDay()];
      const eventsArr = [];
      if (Array.isArray(entry.events)) {
        for (const ev of entry.events) {
          if (ev.startISO && ev.endISO) {
            eventsArr.push({ startISO: ev.startISO, endISO: ev.endISO, title: ev.title || ev.summary || "" });
          } else if (ev.start && ev.end) {
            const startDate = zonedDateFromDateAndTime(date, Number(ev.start.split(":")[0]), Number(ev.start.split(":")[1] || 0));
            const endDate = zonedDateFromDateAndTime(date, Number(ev.end.split(":")[0]), Number(ev.end.split(":")[1] || 0));
            eventsArr.push({ startISO: startDate.toISOString(), endISO: endDate.toISOString(), title: ev.title || ev.summary || "" });
          }
        }
      } else if (Array.isArray(entry.hour)) {
        for (const h of entry.hour) {
          const [hh, mm] = h.split(":").map(Number);
          const startDate = zonedDateFromDateAndTime(date, hh, mm);
          const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
          eventsArr.push({ startISO: startDate.toISOString(), endISO: endDate.toISOString(), title: "Busy" });
        }
      }
      map.set(date, { date, day, events: eventsArr });
    }
    return map;
  };

  const buildWeekFrame = (startOfWeekISO) => {
    const arr = [];
    const startDate = new Date(startOfWeekISO);
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const date = d.toISOString().split("T")[0];
      const day = dayNames[d.getDay()];
      arr.push({ date, day, events: [] });
    }
    return arr;
  };

  const fetchGoogleEvents = async (opts = { retry: 0 }) => {
    setLoading(true);
    setError(null);
    if (abortRef.current) {
      try {
        abortRef.current.abort();
      } catch {}
    }
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/google/events", { signal: controller.signal });
      if (!res.ok) {
        const body = await res.text();
        try {
          const json = JSON.parse(body);
          throw new Error(json.error || `Failed to fetch events: ${res.status}`);
        } catch {
          throw new Error(`Failed to fetch events: ${res.statusText || res.status}`);
        }
      }
      const data = await res.json();
      const rawSchedule = data.schedule || data.events || [];
      const weekStartISO =
        startDateISO ||
        data.weekStart ||
        (() => {
          const ref = new Date();
          const dayIndex = ref.getDay();
          const s = new Date(ref);
          s.setDate(ref.getDate() - dayIndex);
          return s.toISOString().split("T")[0];
        })();
      const mapped = normalizeSchedule(rawSchedule);
      const frame = buildWeekFrame(weekStartISO);
      const merged = frame.map((day) => {
        const fromMap = mapped.get(day.date);
        if (fromMap) return { ...day, events: fromMap.events || [] };
        return day;
      });
      setEvents(merged);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "Failed to load events");
      if (opts.retry < 1) setTimeout(() => fetchGoogleEvents({ retry: opts.retry + 1 }), 1000);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    fetchGoogleEvents();
    const t = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => {
      clearInterval(t);
      if (abortRef.current) {
        try {
          abortRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const nowParts = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(now).reduce((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
    return {
      isoDate: `${parts.year}-${parts.month}-${parts.day}`,
      hour: Number(parts.hour),
      minute: Number(parts.minute),
    };
  }, [now, timeZone]);

  const currentDate = nowParts.isoDate;
  const currentHour = nowParts.hour;
  const currentMinute = nowParts.minute;
  const progressWithinHour = (currentMinute / 60) * 100;

  const isPastSlot = (date, hour) => {
    try {
      const slot = zonedDateFromDateAndTime(date, hour, 0, timeZone);
      return slot.getTime() < new Date().getTime();
    } catch {
      if (date < currentDate) return true;
      if (date === currentDate && hour < currentHour) return true;
      return false;
    }
  };

  const isBusy = (date, hour) => {
    const day = events.find((d) => d.date === date);
    if (!day || !day.events) return false;
    const slotStart = zonedDateFromDateAndTime(date, hour, 0, timeZone).getTime();
    const slotEnd = slotStart + 30 * 60 * 1000;
    for (const ev of day.events) {
      const start = new Date(ev.startISO).getTime();
      const end = new Date(ev.endISO).getTime();
      if (slotStart < end && slotEnd > start) return true;
    }
    return false;
  };

  const handleSlotClick = (dayObj, hour) => {
    if (isPastSlot(dayObj.date, hour) || isBusy(dayObj.date, hour)) return;
    setSelectedSlot({ ...dayObj, hour });
    setTitle("");
    setShowModal(true);
  };

  const handleCreateEvent = async () => {
    if (!selectedSlot || !title.trim()) return;
    setCreating(true);
    try {
      const target = new Date(`${selectedSlot.date}T${selectedSlot.hour}:00`);
      const start = target;
      const end = new Date(target.getTime() + 30 * 60 * 1000);
      const res = await fetch("/api/google/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: title, start, end, timeZone }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Event created successfully!");
        setShowModal(false);
        await fetchGoogleEvents();
      } else {
        alert(`Failed: ${data.error || "Unknown error"}`);
      }
    } catch {
      alert("Error creating event.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-500">Loading calendar...</div>;
  if (error)
    return (
      <div className="p-4 text-center">
        Lets Sync the calendar <Link href="/account-settings" className="text-blue font-bold">Account Settings</Link>
      </div>
    );

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="relative border border-gray-200 rounded-xl shadow-sm bg-white overflow-auto p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Google Calendar — Weekly View</h2>
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 bg-gray-50 sticky top-0 z-10 min-w-[1000px]">
        <div className="font-semibold text-gray-600 p-2 text-right">Time</div>
        {sortedEvents.map((d) => {
          const dateObj = new Date(d.date);
          const dayLabel = dateObj.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
          const isToday = d.date === currentDate;
          return (
            <div
              key={d.date}
              className={`text-center font-semibold py-2 ${isToday ? "text-blue-600 bg-blue-50" : "text-gray-600"}`}
            >
              {dayLabel}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-9 overflow-y-scroll border-t border-gray-200 relative">
        <div className="col-span-1 border-r border-gray-200">
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="h-14 flex items-start justify-end pr-2 text-xs text-gray-400">
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>
        {sortedEvents.map((dayObj) => (
          <div key={dayObj.date} className="relative border-l border-gray-100">
            {Array.from({ length: 24 }, (_, hour) => (
              <div
                key={hour}
                className={`h-14 border-b border-gray-50 transition-colors ${
                  isPastSlot(dayObj.date, hour) ? "bg-gray-50" : "hover:bg-blue-50 cursor-pointer"
                }`}
                onClick={() => handleSlotClick(dayObj, hour)}
              />
            ))}
            {dayObj.events?.map((event, i) => {
              const start = new Date(event.startISO);
              const end = new Date(event.endISO);
              const startH = start.getHours();
              const startM = start.getMinutes();
              const endH = end.getHours();
              const endM = end.getMinutes();
              const startMinutes = startH * 60 + startM;
              const endMinutes = endH * 60 + endM;
              const duration = endMinutes - startMinutes;
              const HOUR_HEIGHT = 56;
              const top = (startMinutes / 60) * HOUR_HEIGHT;
              const height = (duration / 60) * HOUR_HEIGHT;
              return (
                <div
                  key={i}
                  className="absolute left-1 right-1 bg-gray-300 rounded-md text-gray-800 text-xs font-medium px-1 py-1 flex items-center justify-center shadow-sm"
                  style={{ top, height }}
                >
                  {event.title}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showModal && selectedSlot && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-96 space-y-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Create Event — {selectedSlot.day}, {selectedSlot.date} at {selectedSlot.hour.toString().padStart(2, "0")}:00
            </h3>
            <input
              type="text"
              placeholder="Event title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={creating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
