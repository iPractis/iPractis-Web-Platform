// app/api/delete-file/route.js
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

/**
 * POST /api/delete-file
 * Body: { path: "uploads/temp/..." }   OR   { paths: ["p1", "p2"] }
 * Returns { success: true } or { success: false, error }
 */

const BUCKET = "your-bucket-name"; // <-- same bucket name

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ message: "Missing body" }, { status: 400 });

    // Accept either `path` (single) or `paths` (array)
    const paths = body.paths || (body.path ? [body.path] : null);
    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ message: "Missing path(s)" }, { status: 400 });
    }

    const { data, error } = await supabaseServer.storage.from(BUCKET).remove(paths);

    // Supabase returns null data and an error if remove fails. We treat not-found as success-ish.
    if (error) {
      // If you want to treat certain errors as non-fatal, inspect error.message/code here.
      console.error("Supabase remove error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, removed: data || [] }, { status: 200 });
  } catch (err) {
    console.error("Delete API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
