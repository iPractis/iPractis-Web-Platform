import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";

import { useController } from "react-hook-form";
import Image from "next/image";

// Icons
import { UserBigIcon, Camera } from "../../Icons";
import ImageUploader from "./ImageUploader";

const ProfilePicture = ({
  errors,
  control,
  userId = "anon",
  setValue,
  draftUrl,
}) => {
  // controlled field
  const {
    field: profileUrlField,
    fieldState: { error: profileUrlError },
  } = useController({
    name: "profile_url",
    control,
  });

  const currentImageUrl = profileUrlField.value || draftUrl || null;
  
  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<Camera fillcolor="fill-primary-color-P1" />}
        titleText="Profile picture"
        descriptionText="Upload a photo to personalize your profile."
      />

      <SectionContent>
        <div className="flex items-start justify-center sm:gap-8 gap-4">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(errors, profileUrlField.value, "profile_url")} !h-[68px] !rounded-[2px]`}
          >
            <button
              type="button"
              className="relative cursor-pointer"
              onClick={() =>
                document.getElementById("profile-image-upload")?.click()
              }
            >
              {currentImageUrl ? (
                <Image
                  className="w-[100px] h-[100px] rounded-2xl object-cover"
                  src={currentImageUrl || null}
                  alt="User Profile Picture"
                  width={100}
                  height={100}
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-secondary-color-S11">
                  <UserBigIcon
                    fillcolor={
                      profileUrlError?.message
                        ? "fill-senary-color-W10"
                        : "fill-primary-color-P1"
                    }
                  />
                </div>
              )}
            </button>
            <ImageUploader userId={userId} setValue={setValue} />
          </InputLeftStickStatus>

          <div className="text-left">
            <h4 className="ST-SB-3 text-primary-color-P4">Rules</h4>
            <ul className="ps-4 py-3 ST-1 list-disc text-primary-color-P4">
              <li>You must be clearly visible and centered in the picture.</li>
              <li>Use a plain background to avoid distractions.</li>
              <li>The picture should be a recent, high-quality image.</li>
              <li>
                Ensure good lighting so your face is well-lit and clearly
                visible.
              </li>
              <li>Avoid using filters or overly edited images.</li>
            </ul>
          </div>
        </div>
      </SectionContent>
    </SectionWrapper>
  );
};

export default ProfilePicture;
