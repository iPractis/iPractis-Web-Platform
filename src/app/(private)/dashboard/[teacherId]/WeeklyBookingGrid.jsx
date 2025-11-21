"use client";
import React, { useMemo } from "react";

// Helper: format Date to YYYY-MM-DD
function formatDateISO(date) {
  return date.toISOString().split("T")[0];
}

// Helper: map weekday index → text
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// You selected **Option B** → hide slots before 06:00
const MIN_MINUTES = 6 * 60;

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export default function WeeklyBookingGrid({
  availability = [],
  selectedDate,
  selectedTime,
  onSelect,
}) {
  // Build next 7 days
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  // Make availability lookup: { Mon: ["10:00", ...], ... }
  const availabilityMap = useMemo(() => {
    const map = {};
    availability.forEach((day) => {
      map[day.day] = (day.hour || []).filter(
        (t) => timeToMinutes(t) >= MIN_MINUTES
      );
    });
    return map;
  }, [availability]);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-3 text-lg">Pick a Slot</h3>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((dateObj) => {
          const iso = formatDateISO(dateObj);
          const weekday = weekdayNames[dateObj.getDay()];
          const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0));
          const slots = availabilityMap[weekday] || [];

          return (
            <div
              key={iso}
              className={`p-3 rounded-lg border ${
                selectedDate === iso ? "border-primary-color-P4 shadow" : "border-gray-200"
              }`}
            >
              <div
                className={`text-center font-semibold ${
                  isPast ? "text-gray-400" : "text-primary-color-P1"
                }`}
              >
                {weekday}
              </div>

              <div className="text-center text-xs text-gray-500 mb-2">
                {dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>

              {/* No slots */}
              {slots.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2">
                  No slots
                </div>
              )}

              {/* Slots */}
              <div className="flex flex-wrap gap-2 justify-center">
                {slots.map((timeStr) => {
                  const isSelected =
                    selectedDate === iso && selectedTime === timeStr;

                  return (
                    <button
                      key={timeStr}
                      disabled={isPast}
                      onClick={() => onSelect(iso, timeStr)}
                      className={`px-2 py-1 text-xs rounded-md border transition ${
                        isPast
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-primary-color-P4 text-white border-primary-color-P4"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {timeStr}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
