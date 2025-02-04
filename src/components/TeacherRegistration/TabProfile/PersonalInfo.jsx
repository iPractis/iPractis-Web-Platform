import {
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
} from "../../Icons";

import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import PersonalInfoGenderCheck from "./PersonalInfoGenderCheck";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import SectionHeader from "../../Globals/SectionHeader";
import AboutYourSelfIntro from "./AboutYourSelfIntro";
import BirthDateInput from "./BirthDateInput";

const PersonalInfo = ({
  setSelectedCountry,
  setSelectedGender,
  selectedCountry,
  selectedGender,
  setBirthDate,
  setIntroText,
  introText,
  birthDate,
  errors,
  draft,
}) => {
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
            name="firstName"
            defaultValue={draft?.firstName}
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
            classNames={{
              inputWrapper:
                findInputErrorZod(errors, "firstName")?.message &&
                "form-input-error",
            }}
          />

          <ErrorZodResponse errors={errors} fieldName={"firstName"} />
        </div>

        <div>
          <CustomNextUiInput
            name="middleName"
            defaultValue={draft?.middleName}
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
            classNames={{
              inputWrapper:
                findInputErrorZod(errors, "middleName")?.message &&
                "form-input-error",
            }}
          />

          <ErrorZodResponse errors={errors} fieldName={"middleName"} />
        </div>

        <div>
          <CustomNextUiInput
            name="lastName"
            defaultValue={draft?.lastName}
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
            classNames={{
              inputWrapper:
                findInputErrorZod(errors, "lastName")?.message &&
                "form-input-error",
            }}
          />

          <ErrorZodResponse errors={errors} fieldName={"lastName"} />
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

                <PersonalInfoCountrySelect
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                />
              </span>
            }
          />
        </div>

        <PersonalInfoGenderCheck
          findInputErrorZod={findInputErrorZod}
          setSelectedGender={setSelectedGender}
          selectedGender={selectedGender}
          errors={errors}
        />

        <BirthDateInput
          findInputErrorZod={findInputErrorZod}
          setBirthDate={setBirthDate}
          birthDate={birthDate}
          errors={errors}
        />

        <AboutYourSelfIntro
          errors={errors}
          introText={introText}
          setIntroText={setIntroText}
          findInputErrorZod={findInputErrorZod}
        />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
