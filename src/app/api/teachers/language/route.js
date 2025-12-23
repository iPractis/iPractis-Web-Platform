import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function PUT(req) {
  try {
    /* ----------------------------------------
       1️⃣ Authenticate user
    ---------------------------------------- */
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const userId = decoded.userId;

    /* ----------------------------------------
       2️⃣ Parse & validate body
    ---------------------------------------- */
    const body = await req.json();
    const languages = body?.languages;

    if (!Array.isArray(languages)) {
      return NextResponse.json(
        { error: "Invalid languages payload" },
        { status: 400 }
      );
    }

    for (const lang of languages) {
      if (
        !lang.name ||
        !lang.level ||
        typeof lang.name !== "string" ||
        typeof lang.level !== "string"
      ) {
        return NextResponse.json(
          { error: "Invalid language entry" },
          { status: 400 }
        );
      }
    }

    /* ----------------------------------------
       3️⃣ Get teacher profile
    ---------------------------------------- */
    const { data: teacher, error: teacherErr } =
      await supabaseServer
        .from("teachers")
        .select("teacher_id")
        .eq("user_id", userId)
        .single();

    if (teacherErr || !teacher) {
      return NextResponse.json(
        { error: "Teacher profile not found" },
        { status: 403 }
      );
    }

    const teacherId = teacher.teacher_id;

    /* ----------------------------------------
       4️⃣ Replace languages (atomic)
    ---------------------------------------- */

    // Delete existing languages
    const { error: deleteErr } =
      await supabaseServer
        .from("teacher_languages")
        .delete()
        .eq("teacher_id", teacherId);

    if (deleteErr) {
      throw deleteErr;
    }

    // Insert new ones (if any)
    if (languages.length > 0) {
      const insertPayload = languages.map((lang) => ({
        teacher_id: teacherId,
        name: lang.name.trim(),
        level: lang.level.trim(),
      }));

      const { error: insertErr } =
        await supabaseServer
          .from("teacher_languages")
          .insert(insertPayload);

      if (insertErr) {
        throw insertErr;
      }
    }

    /* ----------------------------------------
       5️⃣ Success
    ---------------------------------------- */
    return NextResponse.json({
      success: true,
      count: languages.length,
    });
  } catch (err) {
    console.error("PUT /api/teachers/languages error:", err);
    return NextResponse.json(
      { error: "Failed to update languages" },
      { status: 500 }
    );
  }
}
