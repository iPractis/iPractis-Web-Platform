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
            <UserIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        }
        wrapperSectionHeaderClassName="relative bg-secondary-color-S11 p-8 rounded-[32px] w-[1000px] h-[112px] flex items-center gap-16"
        titleText="Personal Informations"
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
      />

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
                      <QuestionMark fillcolor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserBigIcon fillcolor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    inputWrapper: firstNameError?.message ? "form-input-error" : "!bg-secondary-color-S11",
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
                  placeholder="Enter your middle name"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Middle name{" "}
                      <QuestionMark fillcolor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserBigIcon fillcolor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    inputWrapper: "!bg-secondary-color-S11",
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
                      <QuestionMark fillcolor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <ThreeUsersIcon fillcolor={"fill-primary-color-P1"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    inputWrapper: lastNameError?.message ? "form-input-error" : "!bg-secondary-color-S11",
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

            {/* Gender checkboxes */}
            <PersonalInfoGenderCheck
              control={control}
              errors={errors}
              watch={watch}
            />

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
                  <QuestionMark fillcolor={"fill-primary-color-P4"} />
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
                  <QuestionMark fillcolor={"fill-primary-color-P4"} />
                </span>
              }
              name={"nationality"}
              errors={errors}
            />


        </div>

        {/* Introduction about yourself */}
        <AboutYourSelfIntro control={control} errors={errors} />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
