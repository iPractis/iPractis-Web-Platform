import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

import {
  languagesLevels,
  masteredLanguagesImages,
} from "@/src/data/dataTeacherRegistration";

// External imports
import { Select, SelectItem } from "@nextui-org/react";
import { useController } from "react-hook-form";

// React imports
import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, TrashBinIcon } from "../../Icons";
import Image from "next/image";

const AboutYourselfLevelLanguage = ({
  handleDeleteMasteredLanguage,
  control,
  field,
  index,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, level } = field;

  const selectedLanguageImage = masteredLanguagesImages[name];

  const {
    field: { onChange, value, onBlur },
    fieldState: { error },
  } = useController({
    name: `languages.${index}.level`,
    control,
    defaultValue: level,
  });

  return (
    <>
      <InputLeftStickStatus
        inputBarStatusClassName={`${getInputStatusBorder(
          errors,
          value,
          `languages.${index}.level`
        )}`}
      >
        <div className="mb-4">
          <div className="flex items-end gap-2">
            <div
              className={`flex justify-between items-center gap-2.5 h-12 w-full rounded-2xl p-1.5 ${
                error ? "form-input-error" : "bg-primary-color-P11"
              }`}
            >
              <div className="flex-1 flex items-center gap-2.5 p-1.5">
                {selectedLanguageImage?.src && (
                  <Image
                    className="h-6 w-[39px] rounded-[4px]"
                    src={selectedLanguageImage?.src}
                    alt={"Country Image"}
                    width={39}
                    height={36}
                  />
                )}

                <h3 className="text-primary-color-P4 ST-3">{name}</h3>
              </div>

              <div className="flex-1">
                <Select
                  name="masteredLanguageLevel"
                  onOpenChange={(open) => {
                    setIsOpen(open);

                    if (!open) {
                      onBlur();
                    }
                  }}
                  labelPlacement="outside"
                  placeholder="Select your level"
                  selectorIcon={<span></span>}
                  isOpen={isOpen}
                  selectedKeys={[value]}
                  onSelectionChange={(selected) => {
                    const selectedValue = Array.from(selected).join("");
                    onChange(selectedValue);
                  }}
                  endContent={
                    <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                  }
                  classNames={{
                    base: "!w-full",
                    trigger: [
                      "select-wrapper-ipractis",
                      "!bg-primary-color-P12",
                      "w-[178px] ms-auto",
                      "min-h-fit",
                      "!rounded-xl",
                    ],
                    innerWrapper: ["select-ipractis", "w-full", "ps-2.5"],
                    value: [
                      "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                    ],
                    listbox: ["text-primary-color-P4"],
                  }}
                >
                  {languagesLevels?.map((languageLevel) => (
                    <SelectItem key={languageLevel}>{languageLevel}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <button
              className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
              onClick={() => handleDeleteMasteredLanguage(index)}
              type="button"
            >
              <TrashBinIcon
                fillColor={"fill-primary-color-P4"}
                strokeColor={"stroke-primary-color-P4"}
              />
            </button>
          </div>
        </div>
      </InputLeftStickStatus>

      <div className="mb-4">
        <SplitDynamicErrorZod message={error?.message} />
      </div>
    </>
  );
};

export default AboutYourselfLevelLanguage;
