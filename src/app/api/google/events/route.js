import { auth } from "@/src/lib/auth";

export const GET = async () => {
  const session = await auth();
  if (!session || !session.accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const accessToken = session.accessToken;
  const now = new Date();
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 7);

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now.toISOString()}&timeMax=${oneWeekLater.toISOString()}&singleEvents=true&orderBy=startTime`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Google API error:", data);
    return Response.json(
      { error: "Failed to fetch events", details: data },
      { status: 400 }
    );
  }

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const weekSchedule = {}; // e.g. { "2025-10-24": { day: "Fr", events: [] } }

  for (const event of data.items || []) {
    if (!event.start?.dateTime || !event.end?.dateTime) continue;

    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);

    const dateKey = start.toISOString().split("T")[0];
    const dayKey = days[start.getDay()];

    if (!weekSchedule[dateKey]) {
      weekSchedule[dateKey] = { day: dayKey, date: dateKey, events: [] };
    }

    // Push event as full object with exact start & end
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

  // Convert and sort by date, then by start time
  const schedule = Object.entries(weekSchedule)
    .map(([date, { day, events }]) => ({
      day,
      date,
      events: events.sort((a, b) => (a.start > b.start ? 1 : -1)),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return Response.json({ schedule });
};
