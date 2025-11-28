import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
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
  UserIcon,
  UserProfileIcon,
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
    <SectionWrapper>
      <SectionHeader
        titleIcon={<UserIcon fillcolor="fill-primary-color-P1" />}
        titleText="Personal information"
        descriptionText="Fill in your personal details to complete your profile."
        titleClassName="MT-SB-1"
      />
      <SectionContent>
        {/* First name */}
        <div>
          <span className="flex ps-[5px] gap-1.5 items-center ST-SB-4 mb-1 text-primary-color-P4 relative z-20">
            First name
          </span>
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              firstName?.value,
              "firstName",
            )}
          >
            <CustomNextUiInput
              name="firstName"
              type="text"
              placeholder="Text field content"
              startContent={
                <InputBGWrapperIcon>
                  <UserProfileIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper: firstNameError?.message
                  ? "form-input-error"
                  : "!bg-secondary-color-S11",
              }}
              onBlur={firstName.onBlur}
              onChange={firstName.onChange}
              value={firstName.value}
            />
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={firstNameError?.message} />
        </div>

        {/* Middle name */}
        <div>
          <span className="flex ps-[5px] gap-1.5 items-center ST-SB-4 mb-1 text-primary-color-P4 relative z-20">
            Middle name
          </span>
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              middleName?.value,
              "middleName",
              false,
            )}
          >
            <CustomNextUiInput
              name="middleName"
              type="text"
              placeholder="Text field content"
              startContent={
                <InputBGWrapperIcon>
                  <UserProfileIcon fillcolor={"fill-primary-color-P4"} />
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

        {/* Last name */}
        <div>
          <span className="flex ps-[5px] gap-1.5 items-center ST-SB-4 mb-1 text-primary-color-P4 relative z-20">
            Last name
          </span>
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              lastName?.value,
              "lastName",
            )}
          >
            <CustomNextUiInput
              name="lastName"
              type="text"
              placeholder="Text field content"
              startContent={
                <InputBGWrapperIcon>
                  <ThreeUsersIcon fillcolor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper: lastNameError?.message
                  ? "form-input-error"
                  : "!bg-secondary-color-S11",
              }}
              onBlur={lastName.onBlur}
              onChange={lastName.onChange}
              value={lastName.value}
            />
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={lastNameError?.message} />
        </div>

        {/* Birth date */}
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
              Country of residence
              <QuestionMark fillcolor={"fill-primary-color-P4"} />
            </span>
          }
          name={"country"}
          errors={errors}
        />

        {/* Citizenship */}
        <BaseCountryInput
          SelectComponent={PersonalInfoNationalitySelect}
          fieldError={nationalityFieldError}
          placeholder={"Select a country"}
          nextInputName={"lastName"}
          field={nationalityField}
          label={
            <span className="flex gap-1.5 items-center">
              Citizenship
              <QuestionMark fillcolor={"fill-primary-color-P4"} />
            </span>
          }
          name={"nationality"}
          errors={errors}
        />

        {/* Gender */}
        <PersonalInfoGenderCheck
          control={control}
          errors={errors}
          watch={watch}
        />

        {/* Introduction about yourself */}
        <AboutYourSelfIntro control={control} errors={errors} />
      </SectionContent>
    </SectionWrapper>
  );
};

export default PersonalInfo;
