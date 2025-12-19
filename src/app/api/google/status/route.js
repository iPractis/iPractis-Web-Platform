import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { requireUser } from "@/src/lib/requireUser";

export async function GET() {
  try {
    // 1️⃣ Read auth token from cookie
     const { authorized, user } = await requireUser();

        console.log("authorized" , authorized,  user)
    const cookieStore = await cookies();
    const token =  cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { connected: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded JWT:", decoded);
    if (!decoded?.userId) {
      return NextResponse.json(
        { connected: false, error: "Invalid token" },
        { status: 401 }
      );
    }


    // 3️⃣ Fetch Google calendar status
    const { data, error } = await supabaseServer
      .from("users")
      .select("google_connected")
      .eq("user_id", decoded.userId)
      .single();

    if (error) {
      console.error("[GoogleCalendar][Status] DB error", error);
      return NextResponse.json(
        { connected: false },
        { status: 500 }
      );
    }

    // 4️⃣ Return status
    return NextResponse.json({
      connected: Boolean(data?.google_connected),
    });
  } catch (error) {
    console.error("[GoogleCalendar][Status] Auth error", error);
    return NextResponse.json(
      { connected: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
