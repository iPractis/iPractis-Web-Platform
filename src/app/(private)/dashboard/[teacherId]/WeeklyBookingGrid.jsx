"use client";

import React, { useMemo } from "react";
import dayjs from "dayjs";

/* -----------------------------
   Config
----------------------------- */
const START_HOUR = 0;
const END_HOUR = 23;
const TOTAL_DAYS = 7;

/* -----------------------------
   Hours (00 → 23)
----------------------------- */
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => START_HOUR + i
);

/* =====================================================
   MINI Weekly Availability Grid
===================================================== */
export default function WeeklyAvailabilityGrid({
  availability = {}, // { "YYYY-MM-DD": ["HH:mm"] }
  selectedDate,
  selectedTime,
  onSelect,
}) {
  /* ---------------------------------------------
     Days = next 7 days
  --------------------------------------------- */
  const days = useMemo(() => {
    const today = dayjs().startOf("day");
    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const d = today.add(i, "day");
      return {
        iso: d.format("YYYY-MM-DD"),
        weekday: d.format("ddd"),
        label: d.format("DD MMM"),
      };
    });
  }, []);

  /* ---------------------------------------------
     Availability lookup
  --------------------------------------------- */
  const availabilityMap = useMemo(() => {
    const map = {};
    Object.entries(availability).forEach(([date, times]) => {
      map[date] = new Set(times);
    });
    return map;
  }, [availability]);

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `56px repeat(${TOTAL_DAYS}, minmax(40px, 1fr))`,
        }}
      >
        {/* ---------- Header ---------- */}
        <div />
        {days.map((d) => (
          <div
            key={d.iso}
            className="text-center py-1 border-b text-[11px]"
          >
            <div className="font-semibold leading-tight">
              {d.weekday}
            </div>
            <div className="text-[10px] text-gray-400">
              {d.label}
            </div>
          </div>
        ))}

        {/* ---------- Hour rows ---------- */}
        {HOURS.map((hour) => {
          const h = String(hour).padStart(2, "0");

          return (
            <React.Fragment key={hour}>
              {/* Hour label */}
              <div className="text-[10px] text-gray-400 px-1 py-1 border-r">
                {h}:00
              </div>

              {days.map((d) => {
                const topTime = `${h}:00`;
                const bottomTime = `${h}:30`;

                const topAvailable =
                  availabilityMap[d.iso]?.has(topTime);
                const bottomAvailable =
                  availabilityMap[d.iso]?.has(bottomTime);

                const topSelected =
                  selectedDate === d.iso &&
                  selectedTime === topTime;

                const bottomSelected =
                  selectedDate === d.iso &&
                  selectedTime === bottomTime;

                return (
                  <div
                    key={`${d.iso}-${hour}`}
                    className="h-7 mx-[2px] my-[2px] rounded overflow-hidden border flex flex-col"
                  >
                    {/* :00–:30 */}
                    <button
                      disabled={!topAvailable}
                      onClick={() => onSelect(d.iso, topTime)}
                      className={`
                        flex-1 transition
                        ${
                          !topAvailable
                            ? "bg-gray-100 cursor-not-allowed"
                            : topSelected
                            ? "bg-yellow-400"
                            : "bg-yellow-200 hover:bg-yellow-300"
                        }
                      `}
                    />

                    {/* :30–:00 */}
                    <button
                      disabled={!bottomAvailable}
                      onClick={() => onSelect(d.iso, bottomTime)}
                      className={`
                        flex-1 border-t transition
                        ${
                          !bottomAvailable
                            ? "bg-gray-100 cursor-not-allowed"
                            : bottomSelected
                            ? "bg-yellow-400"
                            : "bg-yellow-200 hover:bg-yellow-300"
                        }
                      `}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
