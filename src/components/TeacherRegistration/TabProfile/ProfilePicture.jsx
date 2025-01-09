import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import { UserBigIcon, UserIcon } from "../../Icons";
import { useState } from "react";
import Image from "next/image";

const ProfilePicture = () => {
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
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-[22px] rounded-[22px]"
        titleText="Profile Picture"
        titleClassName="MT-SB-1"
      />

      <div className="flex flex-col sm:flex-row items-start sm:gap-8 gap-4 mt-[50px] mb-16 px-8">
        {/* Profile Image Input */}
        <div className="relative">
          <input
            type="file"
            className="opacity-0 absolute inset-0 z-10 cursor-pointer"
            onChange={onImageChange}
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
              <UserBigIcon fillColor={"fill-primary-color-P6"} />
            </div>
          )}
        </div>

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
    </WhiteSpaceWrapper>
  );
};

export default ProfilePicture;
