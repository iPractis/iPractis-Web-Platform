import {
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
  ChevronDownSmallIcon,
} from "../../Icons";

import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import SectionHeader from "../../Globals/SectionHeader";
import ukFlag from "@/public/flags/united-kingdom.png";
import Image from "next/image"

const PersonalInfo = () => {
  return (
    <WhiteSpaceWrapper className={"space-y-[50px]"}>
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
                  Last name <QuestionMark fillColor={"fill-primary-color-P4"} />
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
                  Country <QuestionMark fillColor={"fill-primary-color-P4"} />
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

                  <PersonalInfoCountrySelect />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
