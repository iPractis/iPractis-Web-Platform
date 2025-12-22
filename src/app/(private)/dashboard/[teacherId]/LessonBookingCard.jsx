"use client";

import Image from "next/image";

export default function LessonBookingExact() {
  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-sm bg-white rounded-t-3xl p-5">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Alexandra G."
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="text-sm font-semibold">Alexandra G.</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                🇬🇧 Teaches English
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium">
            8 USD <span className="ml-1 bg-yellow-200 px-2 py-0.5 rounded-full">30mins</span>
          </div>
        </div>

        {/* ================= LESSON TYPE ================= */}
        <Section title="Lesson type" subtitle="Select session frequency">
          <OptionRow />
        </Section>

        {/* ================= LESSON TARGET ================= */}
        <Section title="Lesson’s target" subtitle="Select session frequency">
          <OptionRow />
        </Section>

        {/* ================= LESSON DURATION ================= */}
        <Section title="Lesson duration" subtitle="Choose duration format">
          <div className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
            25 mins
          </div>
        </Section>

        {/* ================= DATE & TIME ================= */}
        <Section title="Date and time" subtitle="Set your schedule">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm">
              December
            </div>
            <div className="w-20 bg-gray-100 rounded-xl px-3 py-2 text-sm text-center">
              1994
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm flex justify-between items-center">
            <span>13:00 (01:00 PM) · Algiers Time</span>
            <span className="text-gray-400">▾</span>
          </div>
        </Section>

        {/* ================= PRICING ================= */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Shopping</span>
            <span>8 USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Service fees</span>
            <span>0 USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">0% VAT</span>
            <span>0 USD</span>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button className="flex items-center gap-1 text-sm text-gray-600">
            ← Back
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
            Schedule lesson
            <span className="bg-white/20 rounded-full px-2 py-0.5">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
          ⏺
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="text-xs text-gray-500 mb-2 ml-8">{subtitle}</div>
      <div className="ml-8">{children}</div>
    </div>
  );
}

function OptionRow() {
  return (
    <div className="flex gap-3">
      <label className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
        <input type="radio" checked readOnly />
        Single
      </label>

      <label className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
        <input type="radio" readOnly />
        Weekly
      </label>
    </div>
  );
}
