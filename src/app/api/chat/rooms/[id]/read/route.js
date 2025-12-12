import { getUserFromJWT } from "@/src/lib/getUserFromJWT";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  // ⬅️ Must await context.params
  const { id: roomId } = await context.params;

  const user = await getUserFromJWT();
  console.log("User in read route:", user);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create supabase server instance
  const supabase = supabaseServer;

  // Clear unread count for this room + user
  const { error } = await supabase
    .from("chat_room_members")
    .update({ unread_count: 0 })
    .eq("room_id", roomId)
    .eq("user_id", user.userId);

  if (error) {
    console.error("Error updating unread_count:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
