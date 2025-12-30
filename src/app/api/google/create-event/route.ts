import { auth } from "@/src/lib/auth";
import { getValidGoogleAccessToken } from "@/src/lib/googleCalendarAuth";

export const POST = async (req) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const accessToken = await getValidGoogleAccessToken(session.user.id);

    const { summary, description, start, end, timeZone } = await req.json();

    if (!summary || !start || !end) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const event = {
      summary,
      description: description || "",
      start: {
        dateTime: new Date(start).toISOString(),
        timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(end).toISOString(),
        timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const googleRes = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    const data = await googleRes.json();

    if (!googleRes.ok) {
      console.error("Google API error:", data);
      return Response.json(
        { error: "Failed to create event", details: data },
        { status: 400 }
      );
    }

    return Response.json({ success: true, event: data });
  } catch (err) {
    console.error("Error creating event:", err);
    return Response.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
};
