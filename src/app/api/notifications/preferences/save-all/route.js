import { supabaseServer } from "@/src/lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.userId;

    const body = await req.json();

    // 🔹 Save/merge preferences
    const { data: existing, error: existingError } = await supabaseServer
      .from("users")
      .select("notification_preferences")
      .eq("user_id", userId)
      .single();

    if (existingError) throw existingError;

    const merged = {
      ...(existing?.notification_preferences || {}),
      ...body,
    };

    const { error: updateError } = await supabaseServer
      .from("users")
      .update({ notification_preferences: merged })
      .eq("user_id", userId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, preferences: merged });
  } catch (error) {
    console.error("Error saving notification preferences:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
