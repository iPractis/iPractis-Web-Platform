// app/api/upload/route.js
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { randomUUID } from "crypto";

/**
 * POST /api/upload
 * Accepts multipart/form-data with a `file` field and optional `userId`.
 * Returns: { name, path, url, type, size, uploaded_at }
 *
 * NOTE: replace YOUR_BUCKET_NAME with your bucket.
 */

const BUCKET = "teacher-applications"; // <-- change me
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB, adjust as needed
const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const userId = form.get("userId") || "anon";

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Validate
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ message: "Unsupported file type" }, { status: 415 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ message: "File too large" }, { status: 413 });
    }

    // Build unique, safe path
    const timestamp = Date.now();
    const id = randomUUID();
    const safeName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
    const path = `uploads/temp/${userId}/${timestamp}-${id}-${safeName}`;

    // Convert File to Buffer (Node environment)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from(BUCKET)
      .upload(path, buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ message: "Upload failed", error: uploadError }, { status: 500 });
    }

    // Get public URL (if bucket is public). For private buckets, create signed URL below.
    const { data: urlData } = supabaseServer.storage.from(BUCKET).getPublicUrl(uploadData.path);
    const publicUrl = urlData?.publicUrl || null;

    // If your bucket is private and you want a temporary signed URL:
    // const { data: signed } = await supabaseServer.storage.from(BUCKET).createSignedUrl(uploadData.path, 60 * 60);
    // const signedUrl = signed?.signedURL;

    return NextResponse.json(
      {
        name: file.name,
        path: uploadData.path,
        url: publicUrl, // or signedUrl if using private buckets and you created one
        type: file.type,
        size: file.size,
        uploaded_at: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
