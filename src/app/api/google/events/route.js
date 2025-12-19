import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getValidGoogleAccessToken } from "@/src/lib/googleCalendarAuth";

export async function GET() {
  try {
    /* ─────────────────────────────────────────────
       1️⃣ Authenticate via JWT cookie
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

    /* ─────────────────────────────────────────────
       2️⃣ Get valid Google access token
    ───────────────────────────────────────────── */
    const accessToken = await getValidGoogleAccessToken(decoded.userId);

    /* ─────────────────────────────────────────────
       3️⃣ Fetch Google Calendar events
    ───────────────────────────────────────────── */
    const now = new Date();
    const oneWeekLater = new Date(now);
    oneWeekLater.setDate(now.getDate() + 7);

    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now.toISOString()}&timeMax=${oneWeekLater.toISOString()}&singleEvents=true&orderBy=startTime`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[GoogleCalendar][Events] Google API error", data);
      return NextResponse.json(
        { error: "Failed to fetch events", details: data },
        { status: 400 }
      );
    }

    /* ─────────────────────────────────────────────
       4️⃣ Transform response
    ───────────────────────────────────────────── */
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const weekSchedule = {};

    for (const event of data.items || []) {
      if (!event.start?.dateTime || !event.end?.dateTime) continue;

      const start = new Date(event.start.dateTime);
      const end = new Date(event.end.dateTime);

      const dateKey = start.toISOString().split("T")[0];
      const dayKey = days[start.getDay()];

      if (!weekSchedule[dateKey]) {
        weekSchedule[dateKey] = { day: dayKey, date: dateKey, events: [] };
      }

      weekSchedule[dateKey].events.push({
        title: event.summary || "(No title)",
        start: start.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end: end.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }

    const schedule = Object.entries(weekSchedule)
      .map(([_, value]) => ({
        ...value,
        events: value.events.sort((a, b) =>
          a.start > b.start ? 1 : -1
        ),
      }))
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    return NextResponse.json({ schedule });
  } catch (err) {
    console.error("[GoogleCalendar][Events] Error", err);
    return NextResponse.json(
      { error: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}
