import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

import { useController } from "react-hook-form";
import Image from "next/image";

// Icons
import { UserBigIcon, UserIcon , CameraBoxIcon, ChevronDownBigIcon} from "../../Icons";
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
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <UserIcon fillColor={"fill-primary-color-P1"} />
          </div>
        }
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between"
        titleText="Profile Picture"
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
      >
        <div className="absolute top-[32px] bottom-[32px] right-[32px] w-[190px] h-[48px] bg-white rounded-[16px] p-[6px] flex items-center justify-between gap-[2px]">
          <span className="text-primary-color-P1 ST-3 ml-[16px]">Edit Information</span>
          <div className="mr-[6px] w-[36px] h-[36px] bg-[#F8F7F5] rounded-[10px] flex items-center justify-center gap-[10px] p-[8px]">
            <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>
      </SectionHeader>

      <div className="mt-8 mb-16 md:px-8 ml-[285px]">
        <div className="flex items-start sm:gap-8 gap-4">
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(errors, profileUrlField.value, "profile_url")}
          >
            <div 
              className="relative cursor-pointer"
              onClick={() => document.getElementById('profile-image-upload')?.click()}
            >
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
                <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-[#F8F7F5]">
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
