import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getValidGoogleAccessToken } from "@/src/lib/googleCalendarAuth";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function GET() {
  try {
    /* ─────────────────────────────────────────────
       1️⃣ Authenticate user via JWT cookie
    ───────────────────────────────────────────── */
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId || !decoded?.role) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    const role = decoded.role; // student | teacher | admin

    /* ─────────────────────────────────────────────
       2️⃣ Resolve USER LOCAL TIMEZONE
    ───────────────────────────────────────────── */
    const userTimeZone =
      decoded.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    /* ─────────────────────────────────────────────
       3️⃣ Calculate CURRENT WEEK (Sun → Sat) in UTC
    ───────────────────────────────────────────── */
    const now = new Date();

    const weekStart = new Date(now);
    weekStart.setUTCDate(now.getUTCDate() - now.getUTCDay());
    weekStart.setUTCHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
    weekEnd.setUTCHours(23, 59, 59, 999);

    /* ─────────────────────────────────────────────
       4️⃣ Fetch Google Calendar events
    ───────────────────────────────────────────── */
    const accessToken = await getValidGoogleAccessToken(userId);

    const googleUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${weekStart.toISOString()}&timeMax=${weekEnd.toISOString()}&singleEvents=true&orderBy=startTime`;

    const googleRes = await fetch(googleUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const googleData = await googleRes.json();

    if (!googleRes.ok) {
      console.error("[Google Calendar Error]", googleData);
      return NextResponse.json(
        { error: "Failed to fetch Google events" },
        { status: 400 }
      );
    }

    /* ─────────────────────────────────────────────
       5️⃣ Normalize Google events → LOCAL TIME
    ───────────────────────────────────────────── */
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const scheduleMap = new Map();

    for (const event of googleData.items || []) {
      if (!event.start?.dateTime || !event.end?.dateTime) continue;

      const startUTC = new Date(event.start.dateTime);
      const endUTC = new Date(event.end.dateTime);

      const dateKey = startUTC.toISOString().split("T")[0];
      const dayKey = days[startUTC.getUTCDay()];

      if (!scheduleMap.has(dateKey)) {
        scheduleMap.set(dateKey, { day: dayKey, date: dateKey, events: [] });
      }

      scheduleMap.get(dateKey).events.push({
        title: event.summary || "Busy",
        start: startUTC.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: userTimeZone,
        }),
        end: endUTC.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: userTimeZone,
        }),
        source: "google",
      });
    }

    /* ─────────────────────────────────────────────
       6️⃣ Fetch DB bookings (OVERLAP LOGIC)
    ───────────────────────────────────────────── */
    let bookingQuery = supabaseServer
      .from("bookings")
      .select("id, start_time, end_time, status, room_key")
      .lt("start_time", weekEnd.toISOString())
      .gt("end_time", weekStart.toISOString())
      .in("status", ["booked", "confirmed"]);

    if (role === "teacher") {
      bookingQuery = bookingQuery.eq("teacher_id", userId);
    } else if (role === "student") {
      bookingQuery = bookingQuery.eq("student_id", userId);
    }

    const { data: bookings, error: bookingErr } = await bookingQuery;

    if (bookingErr) {
      console.error("[Bookings Fetch Error]", bookingErr);
      throw bookingErr;
    }

    /* ─────────────────────────────────────────────
       7️⃣ Normalize bookings → LOCAL TIME
    ───────────────────────────────────────────── */
    for (const booking of bookings || []) {
      const startUTC = new Date(booking.start_time);
      const endUTC = new Date(booking.end_time);

      const dateKey = startUTC.toISOString().split("T")[0];
      const dayKey = days[startUTC.getUTCDay()];

      if (!scheduleMap.has(dateKey)) {
        scheduleMap.set(dateKey, { day: dayKey, date: dateKey, events: [] });
      }

      scheduleMap.get(dateKey).events.push({
        title: "Booked Class",
        start: startUTC.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: userTimeZone,
        }),
        end: endUTC.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: userTimeZone,
        }),
        source: "booking",
        booking_id: booking.id,
        url : `/lesson?room=${booking.room_key}`
      });
    }

    /* ─────────────────────────────────────────────
       8️⃣ Sort days & events
    ───────────────────────────────────────────── */
    const schedule = Array.from(scheduleMap.values())
      .map((day) => ({
        ...day,
        events: day.events.sort((a, b) =>
          a.start > b.start ? 1 : -1
        ),
      }))
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    /* ─────────────────────────────────────────────
       9️⃣ Return unified LOCAL-TIME calendar
    ───────────────────────────────────────────── */
    return NextResponse.json({
      weekStart: weekStart.toISOString().split("T")[0],
      weekEnd: weekEnd.toISOString().split("T")[0],
      timeZone: userTimeZone,
      schedule,
    });
  } catch (err) {
    console.error("[Calendar API Error]", err);
    return NextResponse.json(
      { error: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}
