import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { supabaseClient, supabaseServer } from "@/src/lib/supabaseClient";

dayjs.extend(utc);
dayjs.extend(timezone);

/* ---------------------------------------------
   CONFIG
--------------------------------------------- */

const DURATIONS = {
  30: 30,
  60: 60,
  90: 90,
  120: 120,
};

const WEEKDAY_MAP = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/* ---------------------------------------------
   HELPERS
--------------------------------------------- */

function getNextSlotTimestamp({ weekday, hour, timezone }) {
  const targetDow = WEEKDAY_MAP[weekday];
  if (targetDow === undefined) {
    throw new Error(`Invalid weekday: ${weekday}`);
  }

  let base = dayjs().tz(timezone).startOf("day");
  while (base.day() !== targetDow) {
    base = base.add(1, "day");
  }

  const [h, m] = hour.split(":").map(Number);
  return base.hour(h).minute(m).second(0).millisecond(0);
}

/* ⏱ Alignment check (Model B) */
function isAlignedStart(viewerTs, durationMinutes) {
  const minutesSinceMidnight =
    viewerTs.hour() * 60 + viewerTs.minute();

  return minutesSinceMidnight % durationMinutes === 0;
}

/* ⛓ Continuity + same-day check */
function canFitDuration({
  startUtcISO,
  durationMinutes,
  availableSet,
  viewerTz,
  viewerDate,
}) {
  const blocks = durationMinutes / 30;
  const start = dayjs.utc(startUtcISO);

  for (let i = 0; i < blocks; i++) {
    const blockUtc = start.add(i * 30, "minute");

    // must exist
    if (!availableSet.has(blockUtc.toISOString())) {
      return false;
    }

    // must stay on same viewer date
    const blockViewerDate = blockUtc
      .tz(viewerTz)
      .format("YYYY-MM-DD");

    if (blockViewerDate !== viewerDate) {
      return false;
    }
  }

  return true;
}

/* ---------------------------------------------
   API
--------------------------------------------- */

export const GET = async (req, context) => {
  try {
    const teacherId = context?.params?.id;
    if (!teacherId) {
      return NextResponse.json(
        { error: "Missing teacherId" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const viewerTz = searchParams.get("viewerTz") || "UTC";

    /* Teacher timezone */
    const { data: teacher } = await supabaseServer
      .from("teachers")
      .select("timezone")
      .eq("teacher_id", teacherId)
      .single();

    if (!teacher?.timezone) {
      throw new Error("Teacher timezone not found");
    }

    /* Weekly availability (30-min base) */
    const { data: availability } = await supabaseClient
      .from("teacher_availability")
      .select("day_of_week, hour")
      .eq("teacher_id", teacherId)
      .eq("is_available", true);

    /* Future bookings */
    const nowUTC = dayjs().utc().toISOString();
    const { data: bookings } = await supabaseClient
      .from("bookings")
      .select("start_time")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .gte("start_time", nowUTC);

    const bookedSet = new Set(
      (bookings || []).map(b =>
        dayjs.utc(b.start_time).toISOString()
      )
    );

    /* -----------------------------------------
       Build available 30-min UTC slots
    ----------------------------------------- */

    const availableSet = new Set();

    for (const slot of availability || []) {
      const localTs = getNextSlotTimestamp({
        weekday: slot.day_of_week,
        hour: slot.hour.slice(0, 5),
        timezone: teacher.timezone,
      });

      const utcTs = localTs.utc().toISOString();
      if (!bookedSet.has(utcTs)) {
        availableSet.add(utcTs);
      }
    }

    /* -----------------------------------------
       Build Model-B availability
    ----------------------------------------- */

    const availabilityByDate = {};

    for (const utcTs of availableSet) {
      const viewerTs = dayjs.utc(utcTs).tz(viewerTz);
      const date = viewerTs.format("YYYY-MM-DD");
      const time = viewerTs.format("HH:mm");

      if (!availabilityByDate[date]) {
        availabilityByDate[date] = {};
        for (const label of Object.keys(DURATIONS)) {
          availabilityByDate[date][label] = [];
        }
      }

      for (const [label, minutes] of Object.entries(DURATIONS)) {
        if (
          isAlignedStart(viewerTs, minutes) &&
          canFitDuration({
            startUtcISO: utcTs,
            durationMinutes: minutes,
            availableSet,
            viewerTz,
            viewerDate: date,
          })
        ) {
          availabilityByDate[date][label].push(time);
        }
      }
    }

    /* Cleanup empty buckets + sort */
    for (const date of Object.keys(availabilityByDate)) {
      for (const label of Object.keys(availabilityByDate[date])) {
        const arr = availabilityByDate[date][label];
        if (!arr.length) {
          delete availabilityByDate[date][label];
        } else {
          arr.sort();
        }
      }
    }

    return NextResponse.json(
      {
        teacherId,
        teacherTimezone: teacher.timezone,
        viewerTimezone: viewerTz,
        availability: availabilityByDate,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Availability API error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
