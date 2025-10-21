import { useState } from "react";

const ImageUploader = ({ userId, setValue }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("purpose", "profile-image");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log("Uploaded to Supabase:", data.url);

      // update form
      setValue("profile_url", data.url, { shouldValidate: true });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="cursor-pointer bg-primary-color-P1 text-white px-4 py-2 rounded-lg">
        {uploading ? "Uploading..." : "Change Picture"}
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
