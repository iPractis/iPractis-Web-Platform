import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { useController } from "react-hook-form";

// React imports
import { useState } from "react";
import Image from "next/image";

// Icons
import { UserBigIcon, UserIcon } from "../../Icons";

const ProfilePicture = ({ errors, control, userId = "anon", setValue }) => {
  const {
    field: uploadProfileImage,
    fieldState: { error: uploadProfileImageError },
  } = useController({
    name: "uploadProfileImage",
    control: control,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

 const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Save File to form state (Zod validation passes ✅)
  uploadProfileImage.onChange(file);

  // Show immediate preview
  setPreviewUrl(URL.createObjectURL(file));

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
    formData.append("profile_url", data.url);
    setValue("profile_url", data.url); // <-- set profile_url field
  } catch (err) {
    console.error("Upload error:", err);
  } finally {
    setUploading(false);
  }
};

  const currentImageUrl =
    previewUrl || uploadProfileImage?.value?.url || null;

  return (
    <WhiteSpaceWrapper className={"p-0"}>
      <SectionHeader
        descriptionText="Upload a photo to personalize your profile."
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px]"
        titleText="Profile Picture"
        titleClassName="MT-SB-1"
      />

      <div className="mt-8 mb-16 md:px-8">
        <div className="flex items-start sm:gap-8 gap-4">
          {/* Profile Image Input */}
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              uploadProfileImage?.value,
              "uploadProfileImage"
            )}
          >
            <div className="relative">
              <input
                className="opacity-0 absolute inset-0 z-10 cursor-pointer"
                onChange={handleFileChange}
                name="uploadProfileImage"
                accept=".png, .jpeg"
                type="file"
                disabled={uploading}
              />

              {currentImageUrl ? (
                <Image
                  className="w-[100px] h-[100px] rounded-2xl object-cover"
                  src={currentImageUrl}
                  alt={"User Profile Picture"}
                  width={100}
                  height={100}
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-primary-color-P11">
                  <UserBigIcon
                    fillColor={
                      uploadProfileImageError?.message
                        ? "fill-senary-color-W10"
                        : "fill-primary-color-P1"
                    }
                  />
                </div>
              )}
            </div>
          </InputLeftStickStatus>

          {/* Instructions */}
          <ul className="ps-4 py-3 ST-1 list-disc text-primary-color-P4">
            <li>You must be clearly visible and centered in the picture.</li>
            <li>Use a plain background to avoid distractions.</li>
            <li>The picture should be a recent, high-quality image.</li>
            <li>
              Ensure good lighting so your face is well-lit and clearly visible.
            </li>
            <li>Avoid using filters or overly edited images.</li>
          </ul>
        </div>


        {uploading && (
          <p className="text-sm text-primary-color-P4 mt-2">Uploading...</p>
        )}
      </div>
    </WhiteSpaceWrapper>
  );
};

export default ProfilePicture;
