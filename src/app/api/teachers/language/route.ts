import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function PUT(req) {
  try {
    /* ----------------------------------------------------
       1️⃣ Authenticate user
    ---------------------------------------------------- */
    const token = cookies().get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    /* ----------------------------------------------------
       2️⃣ Parse & validate body
    ---------------------------------------------------- */
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
        typeof lang.name !== "string" ||
        typeof lang.level !== "string" ||
        !lang.name.trim() ||
        !lang.level.trim()
      ) {
        return NextResponse.json(
          { error: "Invalid language entry" },
          { status: 400 }
        );
      }
    }

    /* ----------------------------------------------------
       3️⃣ Replace USER languages (atomic)
    ---------------------------------------------------- */

    // Remove old languages
    const { error: deleteErr } = await supabaseServer
      .from("user_languages")
      .delete()
      .eq("user_id", userId);

    if (deleteErr) {
      console.error("Delete languages error:", deleteErr);
      throw deleteErr;
    }

    // Insert new languages
    if (languages.length > 0) {
      const insertPayload = languages.map((lang) => ({
        user_id: userId,
        name: lang.name.trim(),
        level: lang.level.trim(),
      }));

      const { error: insertErr } = await supabaseServer
        .from("user_languages")
        .insert(insertPayload);

      if (insertErr) {
        console.error("Insert languages error:", insertErr);
        throw insertErr;
      }
    }

    /* ----------------------------------------------------
       4️⃣ Success
    ---------------------------------------------------- */
    return NextResponse.json(
      {
        success: true,
        count: languages.length,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("PUT /api/users/languages error:", err);
    return NextResponse.json(
      { error: "Failed to update languages" },
      { status: 500 }
    );
  }
}
