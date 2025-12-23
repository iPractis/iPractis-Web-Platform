import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { getValidGoogleAccessToken } from "@/src/lib/googleCalendarAuth";
import { supabaseServer } from "@/src/lib/supabaseClient";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET() {
  try {
    /* ─────────────────────────────────────────────
       1️⃣ Authenticate user
    ───────────────────────────────────────────── */
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    /* ─────────────────────────────────────────────
       2️⃣ Determine time window (next 7 days)
    ───────────────────────────────────────────── */
    const now = dayjs().utc();
    const oneWeekLater = now.add(7, "day");

    /* ─────────────────────────────────────────────
       3️⃣ Fetch Google Calendar events
    ───────────────────────────────────────────── */
    let googleEvents = [];

    try {
      const accessToken = await getValidGoogleAccessToken(userId);

      const url =
        `https://www.googleapis.com/calendar/v3/calendars/primary/events` +
        `?timeMin=${now.toISOString()}` +
        `&timeMax=${oneWeekLater.toISOString()}` +
        `&singleEvents=true&orderBy=startTime`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        googleEvents = (data.items || [])
          .filter(
            (e) => e.start?.dateTime && e.end?.dateTime
          )
          .map((event) => {
            const start = dayjs(event.start.dateTime);
            const end = dayjs(event.end.dateTime);

            return {
              source: "google",
              title: event.summary || "(No title)",
              startDate: start.toDate(),
              endDate: end.toDate(),
              start: start.format("HH:mm"),
              end: end.format("HH:mm"),
            };
          });
      } else {
        console.error(
          "[GoogleCalendar][Events] API error",
          data
        );
      }
    } catch (err) {
      console.error(
        "[GoogleCalendar][Events] Fetch failed",
        err
      );
    }

    /* ─────────────────────────────────────────────
       4️⃣ Fetch platform bookings
    ───────────────────────────────────────────── */
    const { data: teacher } = await supabaseServer
      .from("teachers")
      .select("teacher_id")
      .eq("user_id", userId)
      .single();

    const teacherId = teacher?.teacher_id;

    const bookingQuery = supabaseServer
      .from("bookings")
      .select("start_time, end_time, status")
      .gte("end_time", now.toISOString());

    if (teacherId) {
      bookingQuery.or(
        `student_id.eq.${userId},teacher_id.eq.${teacherId}`
      );
    } else {
      bookingQuery.eq("student_id", userId);
    }

    const { data: bookings, error: bookingError } =
      await bookingQuery;

    if (bookingError) {
      console.error("[Bookings] Fetch error", bookingError);
    }

    const bookingEvents = (bookings || []).map((b) => {
      const start = dayjs.utc(b.start_time).local();
      const end = dayjs.utc(b.end_time).local();

      return {
        source: "booking",
        title: "Booked Lesson",
        startDate: start.toDate(),
        endDate: end.toDate(),
        start: start.format("HH:mm"),
        end: end.format("HH:mm"),
      };
    });

    /* ─────────────────────────────────────────────
       5️⃣ Merge & group events by date
    ───────────────────────────────────────────── */
    const allEvents = [...googleEvents, ...bookingEvents];
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const weekSchedule = {};

    for (const event of allEvents) {
      const dateKey = dayjs(event.startDate)
        .format("YYYY-MM-DD");
      const dayKey =
        days[dayjs(event.startDate).day()];

      if (!weekSchedule[dateKey]) {
        weekSchedule[dateKey] = {
          day: dayKey,
          date: dateKey,
          events: [],
        };
      }

      weekSchedule[dateKey].events.push({
        title: event.title,
        start: event.start,
        end: event.end,
        source: event.source,
      });
    }

    /* ─────────────────────────────────────────────
       6️⃣ Sort & return
    ───────────────────────────────────────────── */
    const schedule = Object.values(weekSchedule)
      .map((day) => ({
        ...day,
        events: day.events.sort((a, b) =>
          a.start > b.start ? 1 : -1
        ),
      }))
      .sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date)
      );

    return NextResponse.json({ schedule });
  } catch (err) {
    console.error("[Calendar][Unified] Error", err);
    return NextResponse.json(
      { error: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}
