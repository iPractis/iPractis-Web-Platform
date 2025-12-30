import { supabaseClient } from "./supabaseClient";



// options: { bucket, file, signal, makePublic }
export async function uploadFileToSupabase({ bucket, file, makePublic = true, onProgress, signal }) {
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${file.name}`;
  const uploadPath = `${uniqueName}`; // you can prefix with folders: `teachers/${userId}/${uniqueName}`

  const uploadRes = await supabase.storage
    .from(bucket)
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
      // NOTE: supabase-js upload doesn't natively expose progress callback in older versions
    });

  if (uploadRes.error) throw uploadRes.error;

  // store the storage path (useful to regenerate signed urls later)
  const filePath = uploadRes.data?.path ?? uploadPath;

  if (makePublic) {
    const { data: urlData } = supabaseClient.storage.from(bucket).getPublicUrl(filePath);
    return { filePath, fileUrl: urlData.publicUrl };
  } else {
    // create a signed URL valid for some duration (seconds)
    const { data: signed, error: signedErr } = await supabaseClient.storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60); // 1 hour
    if (signedErr) throw signedErr;
    return { filePath, fileUrl: signed.signedUrl };
  }
}

// convenience wrapper: upload then POST teacher payload to your API
export async function uploadFileAndCreateTeacher({
  bucket = "teacher-files",
  file,
  teacherPayload,
  makePublic = true,
  onProgress,
}) {
  try {
    let fileUrl = null;
    let filePath = null;

    if (file) {
      const uploadResult = await uploadFileToSupabase({ bucket, file, makePublic, onProgress });
      fileUrl = uploadResult.fileUrl;
      filePath = uploadResult.filePath;
    }

    const body = { ...teacherPayload, file_url: fileUrl, file_path: filePath };

    const res = await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      throw new Error(errBody?.message || `Server returned ${res.status}`);
    }

    return res.json(); // { teacherId }
  } catch (err) {
    throw err;
  }
}
