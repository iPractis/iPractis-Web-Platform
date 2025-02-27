import {
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
} from "../../Icons";

import { DynamicInputErrorMessageWithZod } from "../../../lib/utils/getZodValidations";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import PersonalInfoNationalitySelect from "./PersonalInfoNationalitySelect";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import PersonalInfoGenderCheck from "./PersonalInfoGenderCheck";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";
import AboutYourSelfIntro from "./AboutYourSelfIntro";
import BirthDateInput from "./BirthDateInput";

const PersonalInfo = ({
  setSelectedNationality,
  selectedNationality,
  setSelectedCountry,
  selectedCountry,
  frontEndErrors,
  backEndErrors,
  setValue,
  register,
  watch,
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
      <div className="md:px-8 mt-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[50px]">
          <div className="space-y-12">
            {/* Firstname */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getLeftStickInputColorStatus(
                  frontEndErrors,
                  backEndErrors,
                  watch("firstName"),
                  "firstName"
                )}
              >
                <CustomNextUiInput
                  name="firstName"
                  type="text"
                  {...register("firstName")}
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
                    inputWrapper:
                      (frontEndErrors?.firstName?.type ||
                        backEndErrors?.message) &&
                      "form-input-error",
                  }}
                />
              </InputLeftStickStatus>

              <DynamicInputErrorMessageWithZod
                frontEndErrors={frontEndErrors}
                backEndErrors={backEndErrors}
                fieldName="firstName"
              />
            </div>

            {/* Middlename */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getLeftStickInputColorStatus(
                  frontEndErrors,
                  backEndErrors,
                  watch("middleName"),
                  "middleName",
                  false
                )}
              >
                <CustomNextUiInput
                  name="middleName"
                  {...register("middleName")}
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
                    inputWrapper:
                      (frontEndErrors?.middleName?.type ||
                        backEndErrors?.message) &&
                      "form-input-error",
                  }}
                />
              </InputLeftStickStatus>
            </div>

            {/* Lastname */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getLeftStickInputColorStatus(
                  frontEndErrors,
                  backEndErrors,
                  watch("lastName"),
                  "lastName"
                )}
              >
                <CustomNextUiInput
                  name="lastName"
                  type="text"
                  {...register("lastName")}
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
                    inputWrapper:
                      (frontEndErrors?.lastName?.type ||
                        backEndErrors?.message) &&
                      "form-input-error",
                  }}
                />
              </InputLeftStickStatus>

              <DynamicInputErrorMessageWithZod
                frontEndErrors={frontEndErrors}
                backEndErrors={backEndErrors}
                fieldName="lastName"
              />
            </div>

            {/* Birthdate inputs (3) */}
            <BirthDateInput />
          </div>

          <div className="space-y-12">
            {/* Country of residence */}
            <div>
              <CustomNextUiInput
                type="text"
                isReadOnly
                placeholder="Select a country"
                label={
                  <span className="flex gap-1.5 items-center">
                    Country of residence{" "}
                    <QuestionMark fillColor={"fill-primary-color-P4"} />
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

            {/* Country of nationality */}
            <div>
              <CustomNextUiInput
                type="text"
                isReadOnly
                placeholder="Select a country"
                label={
                  <span className="flex gap-1.5 items-center">
                    Nationality{" "}
                    <QuestionMark fillColor={"fill-primary-color-P4"} />
                  </span>
                }
                labelPlacement="outside"
                startContent={
                  <span className="flex items-center gap-1.5">
                    <InputBGWrapperIcon>
                      <FlagIcon />
                    </InputBGWrapperIcon>

                    <PersonalInfoNationalitySelect
                      setSelectedNationality={setSelectedNationality}
                      selectedNationality={selectedNationality}
                    />
                  </span>
                }
              />
            </div>

            {/* Gender checkboxes */}
            <PersonalInfoGenderCheck
              frontEndErrors={frontEndErrors}
              backEndErrors={backEndErrors}
              setValue={setValue}
              watch={watch}
            />
          </div>
        </div>

        {/* Introduction about yourself */}
        <AboutYourSelfIntro
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
