// utils/uploadHelpers.js

export async function uploadFileToServer(file, userId) {
  const fd = new FormData();
  fd.append("file", file);
  if (userId) fd.append("userId", userId);

  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || "Upload failed");
  return json; // { name, path, url, type, size, uploaded_at }
}

export async function deleteFileOnServer(pathOrPaths) {
  const body = Array.isArray(pathOrPaths) ? { paths: pathOrPaths } : { path: pathOrPaths };
  const res = await fetch("/api/delete-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || "Delete failed");
  return json;
}
