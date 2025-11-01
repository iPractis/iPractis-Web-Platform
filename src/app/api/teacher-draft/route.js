// GET and PUT /api/teacher-draft
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

// GET /api/teacher-draft - Fetch draft data for a user
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    console.log("Fetching draft for userId:", userId);

    // Get draft data for user
    const { data: draftData, error: fetchError } = await supabaseServer
      .from("teacher_drafts")
      .select("draft_data")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching draft:", fetchError);
      return NextResponse.json({ message: "Failed to fetch draft" }, { status: 500 });
    }

    console.log("Fetched draft data:", draftData?.draft_data);

    return NextResponse.json({ draft: draftData?.draft_data || {} }, { status: 200 });
  } catch (err) {
    console.error("Teacher Draft GET API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { userId, ...newData } = body;

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    // Ensure user has a profile entry (fix foreign key constraint)
    const { data: existingProfile } = await supabaseServer
      .from("profiles")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (!existingProfile) {
      // Create a basic profile entry if it doesn't exist
      await supabaseServer
        .from("profiles")
        .insert({
          user_id: userId,
          role: "student", // Default role
        });
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

    console.log("Saving availability data:", newData.availability);

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
