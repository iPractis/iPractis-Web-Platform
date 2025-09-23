import { supabaseClient } from "./supabaseClient";



export async function uploadToSupabase({
  bucket = "teacher-files",
  file,
  makePublic = true,
}) {
  const uniqueName = `teachers/${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${file.name}`;
  const { error: uploadError, data: uploadData } = await supabaseClient.storage
    .from(bucket)
    .upload(uniqueName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  const filePath = uploadData?.path ?? uniqueName;

  if (makePublic) {
    const { data: urlData } = supabaseClient.storage.from(bucket).getPublicUrl(filePath);
    return { fileUrl: urlData?.publicUrl ?? null, filePath, name: file.name };
  } else {
    // create short-signed url (example: 1 hour)
    const { data: signedData, error: signedErr } = await supabaseClient.storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60);
    if (signedErr) throw signedErr;
    return { fileUrl: signedData.signedUrl, filePath, name: file.name };
  }
}
