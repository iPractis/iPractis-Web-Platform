"use client";

import dayjs from "dayjs";

export default function DateStrip({
  dates,
  selectedDate,
  availableDates,
  onSelect,
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {dates.map((date) => {
        const isSelected = date === selectedDate;
        const isAvailable = availableDates.includes(date);

        return (
          <button
            key={date}
            disabled={!isAvailable}
            onClick={() => isAvailable && onSelect(date)}
            className={`
              min-w-[64px] px-3 py-2 rounded-lg border text-sm
              flex flex-col items-center
              ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }
              ${!isAvailable ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            <span className="text-xs opacity-80">
              {dayjs(date).format("ddd")}
            </span>
            <span className="font-semibold">
              {dayjs(date).format("DD")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
