import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/src/lib/getUserFromJWT";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function GET() {
  try {
    // 🔥 Get logged in user from JWT cookie
    const user = await getUserFromJWT();
    console.log("User in unread route:", user);
    if (!user) {
      return NextResponse.json({ unreadCount: 0 }, { status: 401 });
    }

    const supabase = supabaseServer;

    // -----------------------------------------------
    // Count unread messages for any room the user is in
    // -----------------------------------------------
    const { data, error } = await supabase
      .from("chat_messages")
      .select("id")
      .neq("user_id", user.userId) // messages not sent by this user       // unread messages
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return NextResponse.json({ unreadCount: 0 });
    }

    return NextResponse.json({
      unreadCount: data.length || 0,
    });
  } catch (err) {
    console.error("Unread API error:", err);
    return NextResponse.json({ unreadCount: 0 });
  }
}
