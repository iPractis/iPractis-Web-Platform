import { supabaseServer } from "@/src/lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Decode your JWT to extract user ID
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.userId;

    // 🔹 Try fetching from teachers table
    const { data, error } = await supabaseServer
      .from("users")
      .select("notification_preferences")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return NextResponse.json(data?.notification_preferences || {});
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
