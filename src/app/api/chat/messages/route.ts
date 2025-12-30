import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";
import { getUserFromJWT } from "@/src/lib/getUserFromJWT";
import { supabaseClient } from "@/src/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, room_id, content, message_type = "text", content_json = null } = body;

    if (!room_id || !content) {
      return NextResponse.json({ error: "room_id and content required" }, { status: 400 });
    }

    // 1️⃣ Authenticate user via YOUR JWT
    const user = await getUserFromJWT();
    console.log("Authenticated user for chat:", user);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = user.userId;

    const supabase = supabaseClient;

    // 2️⃣ Check if user belongs to room
    const { data: member, error: memberError } = await supabase
      .from("chat_room_members")
      .select("role")
      .eq("room_id", room_id)
      .eq("user_id", userId)
      .maybeSingle();

    if (!member) {
      return NextResponse.json({ error: "Not a room member" }, { status: 403 });
    }

    // 3️⃣ Prepare message payload
    const payload = {
      id: id || undefined,
      room_id,
      user_id: userId,
      user_role: member.role || "member",
      content,
      content_json,
      message_type,
      created_at: new Date().toISOString()
    };

    // 4️⃣ Insert message
    const { data, error } = await supabase
      .from("chat_messages")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: data });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
