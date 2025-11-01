"use client";
import React, { useEffect, useState } from "react";

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function GoogleCalendarWeekView({
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [now, setNow] = useState(new Date());

  const nowInTimeZone = () => {
    const local = new Date().toLocaleString("en-US", { timeZone });
    return new Date(local);
  };

  // --- Fetch Google events ---
  const fetchGoogleEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/google/events");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch events");

      let schedule = data.schedule || [];

      // 🧩 Ensure all 7 days are present
      const startOfWeek = new Date();
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const date = d.toISOString().split("T")[0];
        const day = dayNames[d.getDay()];

        if (!schedule.find((x) => x.date === date)) {
          schedule.push({ day, date, hour: [] });
        }
      }

      schedule.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(schedule);
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleEvents();
    const timer = setInterval(() => setNow(nowInTimeZone()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDate = now.toISOString().split("T")[0];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const progressWithinHour = (currentMinute / 60) * 100;

  const isPastSlot = (date, hour) => {
    const slotDate = new Date(`${date}T${hour.toString().padStart(2, "0")}:00`);
    return slotDate < nowInTimeZone();
  };

  const isBusy = (date, hour) => {
    const pad = (n) => n.toString().padStart(2, "0");
    const dayData = events.find((d) => d.date === date);
    const dayEvents = dayData?.hour || [];
    return dayEvents.some(
      (t) => t.startsWith(`${hour}:`) || t.startsWith(`${pad(hour)}:`)
    );
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
        alert("✅ Event created successfully!");
        setShowModal(false);
        await fetchGoogleEvents();
      } else {
        alert(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Error creating event.");
    } finally {
      setCreating(false);
    }
  };

  if (loading)
    return <div className="p-4 text-center text-gray-500">Loading calendar...</div>;
  if (error)
    return (
      <div className="p-4 text-red-600 text-center">
        Error loading calendar: {error}
      </div>
    );

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="relative border border-gray-200 rounded-xl shadow-sm bg-white overflow-auto p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Google Calendar — Weekly View
      </h2>

      {/* Header */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 bg-gray-50 sticky top-0 z-10 min-w-[1000px]">
        <div className="font-semibold text-gray-600 p-2 text-right">Time</div>
        {sortedEvents.map((d) => {
          const dateObj = new Date(d.date);
          const dayLabel = dateObj.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          });
          const isToday = d.date === currentDate;
          return (
            <div
              key={d.date}
              className={`text-center font-semibold py-2 ${
                isToday ? "text-blue-600 bg-blue-50" : "text-gray-600"
              }`}
            >
              {dayLabel}
            </div>
          );
        })}
      </div>

      {/* Grid */}
     <div className="grid grid-cols-9 overflow-y-scroll border-t border-gray-200 relative">
  {/* Hour labels */}
  <div className="col-span-1 border-r border-gray-200">
    {Array.from({ length: 24 }, (_, hour) => (
      <div
        key={hour}
        className="h-14 flex items-start justify-end pr-2 text-xs text-gray-400"
      >
        {hour.toString().padStart(2, "0")}:00
      </div>
    ))}
  </div>

  {/* Day columns */}
  {sortedEvents.map((dayObj) => (
    <div key={dayObj.date} className="relative border-l border-gray-100">
      {/* Hour grid background */}
      {Array.from({ length: 24 }, (_, hour) => (
        <div
          key={hour}
          className="h-14 border-b border-gray-50 hover:bg-blue-50 transition-colors"
        />
      ))}

      {/* ✅ Event blocks overlayed on top */}
      {dayObj.events?.map((event, i) => {
        const [startH, startM] = event.start.split(":").map(Number);
        const [endH, endM] = event.end.split(":").map(Number);

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
            <div className="text-[10px] text-gray-600">
              {event.start} - {event.end}
            </div>
          </div>
        );
      })}
    </div>
  ))}
</div>

      {/* Modal for creating event */}
      {showModal && selectedSlot && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-96 space-y-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Create Event — {selectedSlot.day}, {selectedSlot.date} at{" "}
              {selectedSlot.hour.toString().padStart(2, "0")}:00
            </h3>
            <input
              type="text"
              placeholder="Event title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
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
