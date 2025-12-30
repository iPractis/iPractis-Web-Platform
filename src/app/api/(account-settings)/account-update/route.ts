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


export async function GET(request) {
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

    // 2️⃣ Fetch user preferences
    const { data, error } = await supabaseServer
      .from("users")
      .select("language, time_zone, currency, time_format")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Supabase fetch error:", error);
      throw error;
    }

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3️⃣ Map DB columns (snake_case) to Frontend Form (camelCase)
    // This ensures reset(formData) works instantly on the client
    const preferences = {
      language: data.language || "0", // Fallback to default if null
      timeZone: data.time_zone || "Etc/GMT+12",
      currency: data.currency || "",
      timeFormat: data.time_format || "12h",
    };

    return NextResponse.json({
      success: true,
      preferences,
    });

  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}
