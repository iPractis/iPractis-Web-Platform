import { languages as allLanguages, languagesLevels, masteredLanguagesImages } from "@/src/data/dataTeacherRegistration";
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
  ChevronDownBigIcon,
} from "../../Icons";
import Image from "next/image";

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

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);


  // Add Language when + button is clicked
  const handleAddLanguage = () => {
    if (selectedLanguage && selectedLevel) {
      // Check if language already exists
      const languageExists = languages.some(
        (lang) => lang.name === selectedLanguage
      );
      
      if (!languageExists) {
        append({
          name: selectedLanguage,
          level: selectedLevel,
        });
        
        // Clear selections
        setSelectedLanguage("");
        setSelectedLevel("");
      }
    }
  };

  // Delete Mastered Language
  const handleDeleteMasteredLanguage = (index) => {
    remove(index);
  };

  const selectedLanguageImage = masteredLanguagesImages[selectedLanguage];

  return (
    <div className="mx-[285px] mt-[32px]">
      <div className="space-y-4">
        {/* Add Language Button - Keep existing styling */}
        <Select
          name="languages"
          selectedKeys={[]}
          onChange={() => {}} // This won't be used
          labelPlacement="outside"
          placeholder="Add a language"
          selectorIcon={<span></span>}
          startContent={
            <InputBGWrapperIcon>
              <UserSpeakingIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon 
              className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px] cursor-pointer"
              onClick={handleAddLanguage}
            >
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
              "!bg-black rounded-2xl p-1.5 h-auto border-0 shadow-none",
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
          {/* Empty - this is just for styling */}
        </Select>

        {/* Select Language Button Outer Attribute - 16px below the Add Language button */}
        <div className="w-full h-[48px] bg-[#F8F7F5] rounded-2xl opacity-100 gap-[2px] flex items-center relative">
          {/* Floating Yellow Stick - like other input boxes */}
          <div className="pointer-events-none w-1 h-4 bg-yellow-500 rounded-sm absolute top-1/2 -left-1.5 transform -translate-y-1/2 z-10"></div>
          
          {/* Language Selector Dropdown - 6px from top, bottom, left of outer container */}
          <div className="mt-[6px] mb-[6px] ml-[6px] w-[203px] h-[36px] bg-white rounded-[10px] border border-gray-200">
            <Select
              placeholder="Language"
              selectedKeys={selectedLanguage ? [selectedLanguage] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys).join("");
                setSelectedLanguage(selected);
              }}
              onOpenChange={(open) => setIsLanguageOpen(open)}
              isOpen={isLanguageOpen}
              selectorIcon={<span></span>}
              startContent={
                selectedLanguageImage && (
                  <Image
                    className="h-6 w-[39px] rounded-[4px]"
                    src={selectedLanguageImage.src}
                    alt={selectedLanguage}
                    width={39}
                    height={24}
                  />
                )
              }
              endContent={<ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis",
                  "!bg-primary-color-P12",
                  "w-full",
                  "min-h-fit",
                  "!rounded-xl",
                ],
                innerWrapper: ["select-ipractis", "w-full", "ps-2.5"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
                base: "!w-full",
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

          {/* Level Dropdown - 6px from top, bottom, right of outer container */}
          <div className="mt-[6px] mb-[6px] mr-[6px] w-[203px] h-[36px] bg-white rounded-[10px] border border-gray-200 ml-auto">
            <Select
              placeholder="Level"
              selectedKeys={selectedLevel ? [selectedLevel] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys).join("");
                setSelectedLevel(selected);
              }}
              onOpenChange={(open) => setIsLevelOpen(open)}
              isOpen={isLevelOpen}
              selectorIcon={<span></span>}
              endContent={<ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis",
                  "!bg-primary-color-P12",
                  "w-full",
                  "min-h-fit",
                  "!rounded-xl",
                ],
                innerWrapper: ["select-ipractis", "w-full", "ps-2.5"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
                base: "!w-full",
              }}
            >
              {languagesLevels.map((level) => (
                <SelectItem key={level}>{level}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <SplitDynamicErrorZod message={languagesError?.message} />

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