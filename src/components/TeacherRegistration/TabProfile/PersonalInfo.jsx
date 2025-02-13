import {
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
} from "../../Icons";

import PersonalInfoNationalitySelect from "./PersonalInfoNationalitySelect";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
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
      <div className="md:px-8 mt-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[50px]">
          <div className="space-y-12">
            <div>
              {/* <div className="w-1 h-4 rounded-sm bg-senary-color-W8"></div> */}

              <CustomNextUiInput
                name="firstName"
                defaultValue={draft?.firstName}
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
                    findInputErrorZod(errors, "middleName")?.message &&
                    "form-input-error",
                }}
              />
            </div>

            <div>
              <CustomNextUiInput
                name="lastName"
                defaultValue={draft?.lastName}
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
                  inputWrapper:
                    findInputErrorZod(errors, "lastName")?.message &&
                    "form-input-error",
                }}
              />

              <ErrorZodResponse errors={errors} fieldName={"lastName"} />
            </div>

            <BirthDateInput
              findInputErrorZod={findInputErrorZod}
              setBirthDate={setBirthDate}
              birthDate={birthDate}
              errors={errors}
            />
          </div>

          <div className="space-y-12">
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

            <PersonalInfoGenderCheck
              findInputErrorZod={findInputErrorZod}
              setSelectedGender={setSelectedGender}
              selectedGender={selectedGender}
              errors={errors}
            />
          </div>
        </div>

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
