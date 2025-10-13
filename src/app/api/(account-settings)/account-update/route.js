import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function POST(request) {
  try {
    // 1️⃣ Verify and decode JWT from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 400 });
    }

    // 2️⃣ Parse request body
    const body = await request.json();
    const { language, timeZone, currency, timeFormat } = body;

    if (!language && !timeZone && !currency && !timeFormat) {
      return NextResponse.json({ error: "No data provided to update" }, { status: 400 });
    }

    // 3️⃣ Update users table
    const { data, error } = await supabaseServer
      .from("users")
      .update({
        language,
        time_zone: timeZone,
        currency,
        time_format: timeFormat,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select("language, time_zone, currency, time_format")
      .maybeSingle();

    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }

    // 4️⃣ Return updated record
    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
      updatedUser: data,
    });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences", details: error.message },
      { status: 500 }
    );
  }
}
