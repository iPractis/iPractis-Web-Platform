import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../Globals/CustomNextUiInput";
import SectionHeader from "../Globals/SectionHeader";
import Image from "next/image";
import {
  ChevronDownSmallIcon,
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
} from "../Icons";

import ukFlag from "@/public/flags/united-kingdom.png";
import { useState } from "react";

const TabProfile = ({ activeTab }) => {
  const [openCountrySelect, setOpenCountrySelect] = useState(false);

  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      <SectionHeader
        descriptionText="Provide your personal details and complete your profile to start your application process."
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={"p-4 mb-[50px]"}
        titleText="Profile Section"
        titleClassName="MT-SB-1"
      />

      <div className="space-y-4">
        {/* Profile Picture */}
        <div className="space-y-8 p-8 rounded-2xl bg-primary-color-P12">
          <SectionHeader
            descriptionText="Upload a photo to personalize your profile."
            titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
            titleText="Profile Picture"
            titleClassName="MT-SB-1"
          />

          <div className="flex items-start gap-8">
            {/* Profile Image Input */}
            <div className="relative">
              <input
                type="file"
                className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              />

              <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-primary-color-P11">
                <UserBigIcon fillColor={"fill-primary-color-P6"} />
              </div>
            </div>

            {/* Instructions Image Input */}
            <ul className="ps-4 ST-1 list-disc text-primary-color-P4">
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

        {/* Personal Informations */}
        <div className="space-y-[50px] p-8 rounded-2xl bg-primary-color-P12">
          <SectionHeader
            descriptionText="Fill in your basic details to complete your profile."
            titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
            titleText="Personal Informations"
            titleClassName="MT-SB-1"
          />

          <div className="flex items-start gap-[50px]">
            <div className="flex-1">
              <div>
                <CustomNextUiInput
                  type="text"
                  placeholder="Enter your first name"
                  label={
                    <span className="flex gap-1.5 items-center">
                      First name{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserBigIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                />
              </div>

              <div className="my-11">
                <CustomNextUiInput
                  type="text"
                  placeholder="Enter your middle name (Optional)"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Middle name{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserBigIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                />
              </div>

              <div>
                <CustomNextUiInput
                  type="text"
                  placeholder="Enter your last name"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Last name{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <ThreeUsersIcon fillColor={"fill-primary-color-P1"} />
                    </InputBGWrapperIcon>
                  }
                />
              </div>
            </div>

            <div className="flex-1">
              <div>
                <CustomNextUiInput
                  type="text"
                  placeholder="Select your country"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Country{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <span className="flex items-center gap-1.5">
                      <InputBGWrapperIcon>
                        <FlagIcon />
                      </InputBGWrapperIcon>

                      <InputBGWrapperIcon
                        className={
                          "flex justify-between gap-1 cursor-pointer w-[60px] h-[36px]"
                        }
                        onClick={() => setOpenCountrySelect(!openCountrySelect)}
                      >
                        <Image
                          className="w-[26px] h-[24px] rounded-[5px] object-cover"
                          alt="Country Flag"
                          src={ukFlag}
                        />

                        <div className="mx-auto">
                          <ChevronDownSmallIcon />
                        </div>
                      </InputBGWrapperIcon>

                      {openCountrySelect && "Listo"}
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabProfile;
