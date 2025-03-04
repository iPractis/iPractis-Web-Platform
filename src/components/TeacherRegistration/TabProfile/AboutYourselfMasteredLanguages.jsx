import { languages as allLanguages } from "@/src/data/dataTeacherRegistration";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import AboutYourselfLevelLanguage from "./AboutYourselfLevelLanguage";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { useController, useFieldArray } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

// React imports
import { useRef, useState } from "react";

// Icons
import {
  ChevronDownBigIcon,
  QuestionMark,
  UserSpeakingIcon,
} from "../../Icons";

const AboutYourselfMasteredLanguages = ({ errors, control }) => {
  const {
    fields: languages,
    append,
    remove,
  } = useFieldArray({ control, name: "languages" });

  const {
    field: language,
    fieldState: { error: languagesError },
  } = useController({
    name: "languages",
    control: control,
  });

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

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:px-8">
      <div>
        {/* Select Language */}
        <InputLeftStickStatus
          inputBarStatusClassName={`${getInputStatusBorder(
            errors,
            languages,
            "languages"
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
              selectedKeys={language?.value}
              onChange={handleAddMasteredLanguage}
              onOpenChange={(open) => {
                setIsOpen(open);

                if (!open) {
                  language?.onBlur();
                }
              }}
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
                  (languagesError?.message || languagesError !== undefined) &&
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
            control={control}
            key={field.id}
            index={index}
            field={field}
          />
        ))}

        <SplitDynamicErrorZod message={languagesError?.message} />
      </div>
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
