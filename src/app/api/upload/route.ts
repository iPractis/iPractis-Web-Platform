import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { randomUUID } from "crypto";

/**
 * POST /api/upload
 * Accepts multipart/form-data with a `file` field, optional `userId`, and optional `purpose`.
 * Returns: { name, path, url, type, size, uploaded_at }
 */

const DEFAULT_BUCKET = "teacher-applications";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const userId = form.get("userId") || "anon";
    const purpose = form.get("purpose") || null;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    // Decide bucket based on purpose
    let bucket = DEFAULT_BUCKET;
    if (purpose === "profile-image") {
      bucket = "teacher-application-profile-image";
    }

    // Build unique, safe path
    const timestamp = Date.now();
    const id = randomUUID();
    const safeName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_.]/g, "");
    const path = `uploads/temp/${userId}/${timestamp}-${id}-${safeName}`;

    // Convert File to Buffer (Node environment)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from(bucket)
      .upload(path, buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        { message: "Upload failed", error: uploadError },
        { status: 500 }
      );
    }

    // Get public URL (if bucket is public). For private buckets, use signed URL
    const { data: urlData } = supabaseServer.storage
      .from(bucket)
      .getPublicUrl(uploadData.path);
    const publicUrl = urlData?.publicUrl || null;

    return NextResponse.json(
      {
        name: file.name,
        path: uploadData.path,
        bucket,
        url: publicUrl,
        type: file.type,
        size: file.size,
        uploaded_at: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
