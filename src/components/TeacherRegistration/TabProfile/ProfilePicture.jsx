import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

// React imports
import Image from "next/image";

// Icons
import { UserBigIcon, UserIcon } from "../../Icons";
import { useController } from "react-hook-form";

const ProfilePicture = ({ errors, control }) => {
  const {
    field: uploadProfileImage,
    fieldState: { error: uploadProfileImageError },
  } = useController({
    name: "uploadProfileImage",
    control: control,
  });

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
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    uploadProfileImage.onChange(file);
                  }
                }}
                name="uploadProfileImage"
                accept=".png, .jpeg"
                type="file"
              />

              {uploadProfileImage?.value ? (
                <Image
                  className="w-[100px] h-[100px] rounded-2xl object-cover"
                  src={URL.createObjectURL(uploadProfileImage?.value)}
                  alt={"User Profile Picture"}
                  width={100}
                  height={100}
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-primary-color-P11">
                  <UserBigIcon
                    fillColor={
                      errors?.uploadProfileImage
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

        <SplitDynamicErrorZod message={uploadProfileImageError?.message} />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default ProfilePicture;
