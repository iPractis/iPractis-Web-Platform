// External imports
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import { useFieldArray, useController } from "react-hook-form";

// Project imports
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import {
  languages as allLanguages,
  languagesLevels,
  masteredLanguagesImages,
} from "@/src/data/dataTeacherRegistration";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import {
  ChevronDownBigIcon,
  LanguageSpeakingIcon,
  PlusIcon,
  TrashBinIcon,
  UserSpeakingRightIcon,
} from "../../Icons";
import SectionWrapper from "../../Shared/SectionWrapper";

const AboutYourselfMasteredLanguages = ({ errors, control }) => {
  // Use useFieldArray for proper form array management
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "languages",
  });

  // Get the languages field for validation and error display
  const {
    fieldState: { error: languagesError },
  } = useController({
    name: "languages",
    control: control,
  });

  // Add new language entry
  const handleAddLanguage = () => {
    append({ name: "", level: "" });
  };

  // Update language field
  const updateLanguage = (index, field, value) => {
    update(index, { ...fields[index], [field]: value });
  };

  // Delete language entry
  const handleDeleteLanguage = (index) => {
    remove(index);
  };

  // Check if all language entries are valid (both name and level selected)
  const allSelectorsValid =
    fields.length > 0 && fields.every((field) => field.name && field.level);

  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<UserSpeakingRightIcon fillcolor="fill-primary-color-P1" />}
        titleText="Language proficiency level"
        descriptionText="Select only the languages you can use to teach."
        titleClassName="MT-SB-1"
      />

      <SectionContent>
        <div className="space-y-4">
          {/* Add Language Button */}
          <div>
            <InputLeftStickStatus
              inputBarStatusClassName={getInputStatusBorder(
                errors,
                allSelectorsValid ? "valid" : null,
                "languages",
              )}
            >
              <div className="flex items-center bg-primary-color-P1 rounded-[16px] p-[6px] justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-[8px] rounded-[10px] bg-primary-color-P12">
                    <LanguageSpeakingIcon fillColor={"fill-primary-color-P4"} />
                  </div>
                  <div>
                    <span className="ST-3 text-primary-color-P12">
                      Add a language
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Add language"
                  className=""
                  onClick={handleAddLanguage}
                >
                  <div className="p-[8px] rounded-[10px] bg-primary-color-P12 hover:bg-secondary-color-S8 transition-colors">
                    <PlusIcon />
                  </div>
                </button>
              </div>
            </InputLeftStickStatus>
          </div>

          {/* Language Entries */}
          {fields.map((field, index) => {
            const selectedLanguageImage = masteredLanguagesImages[field.name];

            return (
              <InputLeftStickStatus
                key={field.id}
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  field.name && field.level
                    ? { name: field.name, level: field.level }
                    : field.name
                      ? { name: field.name, level: "" }
                      : null,
                  `languages.${index}`,
                )}
              >
                <div className="flex items-center gap-[6px]">
                  <div className="w-full flex gap-[6px] bg-secondary-color-S11 p-[6px] rounded-[16px]">
                    {/* Language Selector Dropdown */}
                    <div className="w-1/2">
                      <Select
                        placeholder="Language"
                        selectedKeys={field.name ? [field.name] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys).join("");
                          updateLanguage(index, "name", selected);
                        }}
                        selectorIcon={<span></span>}
                        startContent={
                          selectedLanguageImage && (
                            <Image
                              className="h-6 w-[39px] rounded-[4px]"
                              src={selectedLanguageImage.src}
                              alt={field.name}
                              width={39}
                              height={24}
                            />
                          )
                        }
                        endContent={
                          <ChevronDownBigIcon
                            fillcolor={"fill-primary-color-P1"}
                          />
                        }
                        classNames={{
                          trigger: [
                            "select-wrapper-ipractis",
                            "!bg-primary-color-P12",
                            "w-full",
                            "min-h-fit",
                            "!rounded-xl",
                          ],
                          innerWrapper: ["select-ipractis", "w-full", "ps--1"],
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
                              !fields.some(
                                (f, idx) =>
                                  f.name === language && idx !== index,
                              ) || language === field.name,
                          )
                          .map((language) => (
                            <SelectItem key={language}>{language}</SelectItem>
                          ))}
                      </Select>
                    </div>

                    {/* Level Dropdown */}
                    <div className="w-1/2">
                      <Select
                        placeholder="Level"
                        selectedKeys={field.level ? [field.level] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys).join("");
                          updateLanguage(index, "level", selected);
                        }}
                        selectorIcon={<span></span>}
                        endContent={
                          <ChevronDownBigIcon
                            fillcolor={"fill-primary-color-P1"}
                          />
                        }
                        classNames={{
                          trigger: [
                            "select-wrapper-ipractis",
                            "!bg-primary-color-P12",
                            "w-full",
                            "min-h-fit",
                            "!rounded-xl",
                          ],
                          innerWrapper: ["select-ipractis", "w-full", "ps-1"],
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

                  {/* Delete Button - separated with 2px gap */}
                  <button
                    className="bg-secondary-color-S11 hover:bg-secondary-color-S8 p-[12px] rounded-[16px] transition-colors"
                    onClick={() => handleDeleteLanguage(index)}
                    type="button"
                  >
                    <TrashBinIcon
                      fillcolor={"fill-primary-color-P4"}
                      strokeColor={"stroke-primary-color-P4"}
                    />
                  </button>
                </div>
              </InputLeftStickStatus>
            );
          })}
        </div>

        <SplitDynamicErrorZod message={languagesError?.message} />
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYourselfMasteredLanguages;
