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
  AddBoxIcon,
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
    <div className="mx-[285px] mt-[32px]">
      {/* Select Language */}
      <div>
        <InputLeftStickStatus
          inputBarStatusClassName={`${getInputStatusBorder(
            errors,
            languages,
            "languages"
          )}`}
        >
          <div className="flex items-end gap-2">
            <Select
              name="languages"
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
                <InputBGWrapperIcon className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1">
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </InputBGWrapperIcon>
              }
              classNames={{
                trigger: [
                  "!bg-blue-500 rounded-2xl p-1.5 h-auto border-0 shadow-none",
                  (languagesError?.message || languagesError !== undefined) &&
                    "form-input-error",
                ],
                innerWrapper: ["text-white placeholder:text-white", "w-full"],
                value: [
                  "group-data-[has-value=true]:text-white text-white ST-3 ml-4",
                ],
                listbox: ["text-primary-color-P4"],
                base: "!mt-0",
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

        <SplitDynamicErrorZod message={languagesError?.message} />
      </div>

      {/* Select Level Language */}
      <div className="mt-4">
        {languages.map((field, index) => (
          <AboutYourselfLevelLanguage
            handleDeleteMasteredLanguage={handleDeleteMasteredLanguage}
            control={control}
            errors={errors}
            key={field.id}
            index={index}
            field={field}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
