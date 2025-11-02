// /api/teacher-draft
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

// 🟩 GET — Fetch teacher draft by userId
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }


    // Fetch draft for user
    const { data: draftData, error: fetchError } = await supabaseServer
      .from("teacher_drafts")
      .select("draft_data, is_published, updated_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching draft:", fetchError);
      return NextResponse.json({ message: "Failed to fetch draft" }, { status: 500 });
    }

    return NextResponse.json(
      { draft: draftData?.draft_data || {}, is_published: draftData?.is_published ?? false },
      { status: 200 }
    );
  } catch (err) {
    console.error("Teacher Draft GET API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// 🟦 PUT — Create or update teacher draft
export async function PUT(req) {
  try {
    const body = await req.json();
    const { userId, ...newData } = body;

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    // ✅ Ensure user exists in unified users table
    const { data: existingUser, error: userError } = await supabaseServer
      .from("users")
      .select("user_id, role")
      .eq("user_id", userId)
      .maybeSingle();

    if (userError) {
      console.error("Error checking user:", userError);
      return NextResponse.json({ message: "User check failed" }, { status: 500 });
    }

    // If user doesn't exist, create a minimal record
    if (!existingUser) {
      const { error: createError } = await supabaseServer.from("users").insert({
        user_id: userId,
        role: "teacher", // or 'student' depending on context
      });

      if (createError) {
        console.error("Error creating user:", createError);
        return NextResponse.json({ message: "Failed to create user record" }, { status: 500 });
      }
    }

    // Fetch existing draft
    const { data: existingDraft, error: fetchError } = await supabaseServer
      .from("teacher_drafts")
      .select("draft_data")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching draft:", fetchError);
      return NextResponse.json({ message: "Failed to fetch existing draft" }, { status: 500 });
    }

    // Merge with new data
    const updatedDraft = {
      ...(existingDraft?.draft_data || {}),
      ...newData,
    };


    // Upsert draft entry
    const { error: upsertError } = await supabaseServer
      .from("teacher_drafts")
      .upsert(
        {
          user_id: userId,
          draft_data: updatedDraft,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (upsertError) {
      console.error("Error saving draft:", upsertError);
      return NextResponse.json({ message: "Failed to save draft" }, { status: 500 });
    }

    return NextResponse.json({ draft: updatedDraft }, { status: 200 });
  } catch (err) {
    console.error("Teacher Draft PUT API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
