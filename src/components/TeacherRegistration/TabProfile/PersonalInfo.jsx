import {
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
} from "../../Icons";

import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import PersonalInfoGenderCheck from "./PersonalInfoGenderCheck";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import SectionHeader from "../../Globals/SectionHeader";
import AboutYourSelfIntro from "./AboutYourSelfIntro";
import BirthDateInput from "./BirthDateInput";

const PersonalInfo = () => {
  return (
    <WhiteSpaceWrapper className={"p-0"}>
      <SectionHeader
        descriptionText="Fill in your basic details to complete your profile."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px]"
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Personal Informations"
        titleClassName="MT-SB-1"
      />

      <div className="mt-20 md:px-8 space-y-12">
        <div>
          <CustomNextUiInput
            type="text"
            placeholder="Enter your first name"
            label={
              <span className="flex gap-1.5 items-center">
                First name <QuestionMark fillColor={"fill-primary-color-P4"} />
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
            placeholder="Enter your middle name (Optional)"
            label={
              <span className="flex gap-1.5 items-center">
                Middle name <QuestionMark fillColor={"fill-primary-color-P4"} />
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

        <div>
          <CustomNextUiInput
            type="text"
            isReadOnly
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

                <PersonalInfoCountrySelect />
              </span>
            }
          />
        </div>

        <PersonalInfoGenderCheck />

        <BirthDateInput />

        <AboutYourSelfIntro />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
