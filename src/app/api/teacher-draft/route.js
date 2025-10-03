// PUT /api/teacher-draft
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { userId, ...newData } = body;

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    // Get existing draft for user
    const { data: existingDraft, error: fetchError } = await supabaseServer
      .from("teacher_drafts")
      .select("draft_data")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching draft:", fetchError);
      return NextResponse.json({ message: "Failed to fetch draft" }, { status: 500 });
    }

    // Merge new data into existing draft JSON
    const updatedDraft = {
      ...(existingDraft?.draft_data || {}),
      ...newData,
    };

    // Save back
    const { error: upsertError } = await supabaseServer
      .from("teacher_drafts")
      .upsert({
        user_id: userId,
        draft_data: updatedDraft,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

    if (upsertError) {
      console.error("Error saving draft:", upsertError);
      return NextResponse.json({ message: "Failed to save draft" }, { status: 500 });
    }

    return NextResponse.json({ draft: updatedDraft }, { status: 200 });
  } catch (err) {
    console.error("Teacher Draft API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
