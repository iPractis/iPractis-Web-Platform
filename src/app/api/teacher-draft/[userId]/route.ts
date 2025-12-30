import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

// GET /api/teacher-draft/:userId
export async function GET(req, { params }) {
  const { userId } = params;

  try {
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // 🔥 Fetch draft for this user
    const { data, error } = await supabaseServer
      .from("teacher_drafts")
      .select("draft_data, is_published")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching teacher draft:", error);
      return NextResponse.json({ message: "Failed to fetch draft" }, { status: 500 });
    }

    if (!data) {
      // No draft yet, return empty JSON
      return NextResponse.json({ draft: {} }, { status: 200 });
    }

    return NextResponse.json(
      { draft: data.draft_data, is_published: data.is_published },
      { status: 200 }
    );
  } catch (err) {
    console.error("Teacher draft API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
