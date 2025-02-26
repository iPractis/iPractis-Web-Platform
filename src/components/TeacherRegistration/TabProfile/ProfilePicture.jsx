import { DynamicInputErrorMessageWithZod } from "../../Shared/DynamicInputErrorMessageWithZod";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

// React imports
import { useState } from "react";
import Image from "next/image";

// Icons
import { UserBigIcon, UserIcon } from "../../Icons";

const ProfilePicture = ({
  frontEndErrors,
  backEndErrors,
  register,
  watch,
}) => {
  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

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
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("uploadProfileImage"),
              "uploadProfileImage"
            )}
          >
            <div className="relative">
              <input
                className="opacity-0 absolute inset-0 z-10 cursor-pointer"
                {...register("uploadProfileImage")}
                name="uploadProfileImage"
                onChange={onImageChange}
                accept=".png, .jpeg"
                type="file"
              />

              {image ? (
                <Image
                  className="w-[100px] h-[100px] rounded-2xl object-cover"
                  alt={"User Profile Picture"}
                  width={100}
                  height={100}
                  src={image}
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-primary-color-P11">
                  <UserBigIcon
                    fillColor={
                      frontEndErrors?.uploadProfileImage?.type || backEndErrors?.message
                        ? "fill-senary-color-W10"
                        : "fill-primary-color-P1"
                    }
                  />
                </div>
              )}
            </div>
          </InputLeftStickStatus>

          {/* Instructions Image Input */}
          <ul className="ps-4 ST-1 list-disc text-primary-color-P4">
            <li>You must be clearly visible and centered in the picture.</li>
            <li>Use a plain background to avoid distractions.</li>
            <li>The picture should be a recent, high-quality image.</li>
            <li>
              Ensure good lighting so your face is well-lit and clearly visible.
            </li>
            <li>Avoid using filters or overly edited images.</li>
          </ul>
        </div>

        <DynamicInputErrorMessageWithZod
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="uploadProfileImage"
        />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default ProfilePicture;
