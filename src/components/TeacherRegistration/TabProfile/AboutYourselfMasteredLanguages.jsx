import { DynamicInputErrorMessageWithZod } from "../../../lib/utils/getZodValidations";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { languages as allLanguages } from "@/src/data/dataTeacherRegistration";
import AboutYourselfLevelLanguage from "./AboutYourselfLevelLanguage";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { Select, SelectItem } from "@nextui-org/react";
import { useFieldArray } from "react-hook-form";
import { useRef, useState } from "react";

// Images && icons
import {
  ChevronDownBigIcon,
  QuestionMark,
  UserSpeakingIcon,
} from "../../Icons";

const AboutYourselfMasteredLanguages = ({
  frontEndErrors,
  backEndErrors,
  control,
  watch,
}) => {
  const { fields: languages, append, remove, update } = useFieldArray({ control, name: "languages" });
  const [isOpen, setIsOpen] = useState(false);
  const masteredLanguageRef = useRef("");

  // Add Mastered Language
  const handleAddMasteredLanguage = (e) => {
    const languageSelected = e?.target?.value;

    // Append the new language to the field array
    append({
      name: languageSelected,
      level: "",
    });

    // Clear the select input
    masteredLanguageRef.current.value = "";
  };

  // Delete Mastered Language
  const handleDeleteMasteredLanguage = (index) => {
    remove(index);
  };

  // Update language level
  const handleLanguageLevel = (levelSelected, index) => {
    update(index, { ...languages[index], level: levelSelected });
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:px-8">
      <div>
        {/* Select Language */}
        <InputLeftStickStatus
          inputBarStatusClassName={`${getLeftStickInputColorStatus(
            frontEndErrors,
            backEndErrors,
            watch("languages"),
            "languages",
          )} top-[54%] -translate-y-0`}
        >
          <div className="flex items-end gap-2 mt-[75px]">
            <Select
              name="languages"
              label={
                <div className="mb-2">
                  <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                    Select the languages your masters{" "}
                    <QuestionMark fillColor={"fill-primary-color-P4"} />
                  </span>

                  <span className="text-primary-color-P4 ST-3">
                    Select only the languages you can use to teach.
                  </span>
                </div>
              }
              ref={masteredLanguageRef}
              selectedKeys={
                masteredLanguageRef?.current?.value
                  ? [masteredLanguageRef?.current?.value]
                  : []
              }
              onChange={handleAddMasteredLanguage}
              onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
              labelPlacement="outside"
              placeholder="Add language"
              selectorIcon={<span></span>}
              isOpen={isOpen}
              startContent={
                <InputBGWrapperIcon>
                  <UserSpeakingIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                trigger: [
                  "select-wrapper-ipractis",
                  (frontEndErrors?.languages?.message ||
                    backEndErrors?.message) &&
                    "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
              }}
            >
              {allLanguages
                ?.filter(
                  (language) =>
                    !languages.some(
                      (masteredLanguage) => masteredLanguage.name === language
                    )
                )
                .map((language) => (
                  <SelectItem key={language}>{language}</SelectItem>
                ))}
            </Select>
          </div>
        </InputLeftStickStatus>

        {/* Select Level Language */}
        {languages.map((field, index) => (
          <AboutYourselfLevelLanguage
            handleDeleteMasteredLanguage={handleDeleteMasteredLanguage}
            handleLanguageLevel={handleLanguageLevel}
            key={field.id}
            index={index}
            field={field}
          />
        ))}

        <DynamicInputErrorMessageWithZod
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="languages"
        />
      </div>
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
