"use client";

import { useState, useRef, useEffect } from "react";
import { Clock1220Icon } from "../../Icons";

export default function DurationToggle({
  durations = [],
  selectedDuration,
  onSelect,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-3" ref={ref}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-xl bg-gray-100 flex items-center justify-center">
          <Clock1220Icon fillcolor={"fill-primary-color-P4"}></Clock1220Icon>
        </div>

        <div>
          <p className="text-sm font-semibold">
            Lesson duration
          </p>
          <p className="text-xs text-gray-500">
            Choose duration format
          </p>
        </div>
      </div>

      {/* Dropdown */}
      <div className="relative">
        {/* Trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="
            w-full bg-gray-100 rounded-2xl
            px-4 py-3
            flex items-center justify-between
            text-sm font-medium
            hover:bg-gray-200 transition
          "
        >
          <span>{selectedDuration} min</span>
          <span
            className={`text-gray-400 transition ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {/* Menu */}
        {open && (
          <div
            className="
              absolute z-50 mt-2 w-full
              bg-white rounded-2xl shadow-lg border
              overflow-hidden
            "
          >
            {durations.map((dur) => {
              const active = dur === selectedDuration;
              return (
                <button
                  key={dur}
                  onClick={() => {
                    onSelect(dur);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 text-sm
                    hover:bg-gray-100 transition
                    ${active ? "bg-gray-100 font-semibold" : ""}
                  `}
                >
                  {dur} min
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
