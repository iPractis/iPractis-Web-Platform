import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

import { useController } from "react-hook-form";
import Image from "next/image";
import { UserBigIcon, UserIcon } from "../../Icons";
import ImageUploader from "./ImageUploader";

const ProfilePicture = ({ errors, control, userId = "anon", setValue, draftUrl }) => {
  // controlled field
  const {
    field: profileUrlField,
    fieldState: { error: profileUrlError },
  } = useController({
    name: "profile_url",
    control,
  });
  console.log(draftUrl, "DRAFT URL IN PROFILE PICTURE")

  const currentImageUrl =profileUrlField.value || draftUrl  || null;
console.log("CURRENT IMAGE URL:", currentImageUrl)
  return (
    <WhiteSpaceWrapper className="p-0">
      <SectionHeader
        descriptionText="Upload a photo to personalize your profile."
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px]"
        titleText="Profile Picture"
        titleClassName="MT-SB-1"
      />

      <div className="mt-8 mb-16 md:px-8">
        <div className="flex items-start sm:gap-8 gap-4">
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(errors, profileUrlField.value, "profile_url")}
          >
            <div className="relative">
              {currentImageUrl ? (
                <Image
                  className="w-[100px] h-[100px] rounded-2xl object-cover"
                  src={currentImageUrl
                    || null
                  }
                  alt="User Profile Picture"
                  width={100}
                  height={100}
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-primary-color-P11">
                  <UserBigIcon
                    fillColor={profileUrlError?.message ? "fill-senary-color-W10" : "fill-primary-color-P1"}
                  />
                </div>
              )}
            </div>
          </InputLeftStickStatus>

          <ul className="ps-4 py-3 ST-1 list-disc text-primary-color-P4">
            <li>You must be clearly visible and centered in the picture.</li>
            <li>Use a plain background to avoid distractions.</li>
            <li>The picture should be a recent, high-quality image.</li>
            <li>Ensure good lighting so your face is well-lit and clearly visible.</li>
            <li>Avoid using filters or overly edited images.</li>
          </ul>
        </div>

        {/* uploader is separate – shows button to change image */}
        <div className="mt-6">
          <ImageUploader
            userId={userId}
            setValue={setValue}
          />
        </div>
      </div>
    </WhiteSpaceWrapper>
  );
};

export default ProfilePicture;
