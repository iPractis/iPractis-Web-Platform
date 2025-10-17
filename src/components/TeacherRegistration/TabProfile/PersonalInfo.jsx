import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";
import BaseCountryInput from "./BaseCountryInput";

import PersonalInfoNationalitySelect from "./PersonalInfoNationalitySelect";
import PersonalInfoGenderCheck from "./PersonalInfoGenderCheck";
import AboutYourSelfIntro from "./AboutYourSelfIntro";
import BirthDateInput from "./BirthDateInput";

// External imports
import { useController } from "react-hook-form";

// Icons
import {
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
  ChevronDownBigIcon,
} from "../../Icons";

const PersonalInfo = ({ control, errors, watch }) => {
  const {
    field: firstName,
    fieldState: { error: firstNameError },
  } = useController({
    name: "firstName",
    control: control,
  });

  const { field: middleName } = useController({
    name: "middleName",
    control: control,
  });

  const {
    field: lastName,
    fieldState: { error: lastNameError },
  } = useController({
    name: "lastName",
    control: control,
  });

  const {
    field: countryField,
    fieldState: { error: countryFieldError },
  } = useController({
    control,
    name: "country",
  });

  const {
    field: nationalityField,
    fieldState: { error: nationalityFieldError },
  } = useController({
    control,
    name: "nationality",
  });

  return (
    <WhiteSpaceWrapper className={"p-0"}>
      <SectionHeader
        descriptionText="Fill in your basic details to complete your profile."
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <UserIcon fillColor={"fill-primary-color-P1"} />
          </div>
        }
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between"
        titleText="Personal Informations"
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

      <div className="mx-[285px] mt-[64px]">
        <div className="space-y-12">
            {/* Firstname */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  firstName?.value,
                  "firstName"
                )}
              >
                <CustomNextUiInput
                  name="firstName"
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
                  classNames={{
                    inputWrapper: firstNameError?.message ? "form-input-error" : "!bg-[#F8F7F5]",
                  }}
                  onBlur={firstName.onBlur}
                  onChange={firstName.onChange}
                  value={firstName.value}
                />
              </InputLeftStickStatus>

              <SplitDynamicErrorZod message={firstNameError?.message} />
            </div>

            {/* Middlename */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  middleName?.value,
                  "middleName",
                  false
                )}
              >
                <CustomNextUiInput
                  name="middleName"
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
                  classNames={{
                    inputWrapper: "!bg-[#F8F7F5]",
                  }}
                  onChange={middleName.onChange}
                  value={middleName.value}
                />
              </InputLeftStickStatus>
            </div>

            {/* Lastname */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  lastName?.value,
                  "lastName"
                )}
              >
                <CustomNextUiInput
                  name="lastName"
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
                  classNames={{
                    inputWrapper: lastNameError?.message ? "form-input-error" : "!bg-[#F8F7F5]",
                  }}
                  onBlur={lastName.onBlur}
                  onChange={lastName.onChange}
                  value={lastName.value}
                />
              </InputLeftStickStatus>

              <SplitDynamicErrorZod message={lastNameError?.message} />
            </div>

            {/* Birthdate inputs (3) */}
            <BirthDateInput control={control} errors={errors} />
            {/* Country of residence */}
            <BaseCountryInput
              SelectComponent={PersonalInfoCountrySelect}
              placeholder={"Select a country"}
              fieldError={countryFieldError}
              nextInputName={"middleName"}
              field={countryField}
              label={
                <span className="flex gap-1.5 items-center">
                  Country
                  <QuestionMark fillColor={"fill-primary-color-P4"} />
                </span>
              }
              name={"country"}
              errors={errors}
            />

            {/* Country of nationality */}
            <BaseCountryInput
              SelectComponent={PersonalInfoNationalitySelect}
              fieldError={nationalityFieldError}
              placeholder={"Select a nationality"}
              nextInputName={"lastName"}
              field={nationalityField}
              label={
                <span className="flex gap-1.5 items-center">
                  Nationality
                  <QuestionMark fillColor={"fill-primary-color-P4"} />
                </span>
              }
              name={"nationality"}
              errors={errors}
            />

            {/* Gender checkboxes */}
            <PersonalInfoGenderCheck
              control={control}
              errors={errors}
              watch={watch}
            />
        </div>

        {/* Introduction about yourself */}
        <AboutYourSelfIntro control={control} errors={errors} />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
