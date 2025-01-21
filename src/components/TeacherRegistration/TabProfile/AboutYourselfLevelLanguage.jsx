import { useState } from "react";

// Images && icons
import {
  ChevronDownBigIcon,
  QuestionMark,
  TrashBinIcon,
  UserSpeakingIcon,
} from "../../Icons";
import { languagesLevels } from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { Select, SelectItem } from "@nextui-org/react";

const AboutYourselfLevelLanguage = ({
  handleDeleteMasteredLanguage,
  handleLanguageLevel,
  name: nameLanguage,
  languageLevel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-end mt-10 gap-2">
      <Select
        name="masteredLanguageLevel"
        label={
          <div className="mb-2">
            <span className="flex gap-1.5  items-center text-primary-color-P4 MT-SB-1">
              {nameLanguage}{" "}
              <QuestionMark fillColor={"fill-primary-color-P4"} />
            </span>
          </div>
        }
        onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
        labelPlacement="outside"
        placeholder="Select your level"
        selectorIcon={<span></span>}
        isOpen={isOpen}
        value={languageLevel}
        onChange={(e) => handleLanguageLevel(e, nameLanguage)}
        endContent={
          <InputBGWrapperIcon>
            <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>
        }
        startContent={
          <InputBGWrapperIcon>
            <UserSpeakingIcon fillColor={"fill-primary-color-P4"} />
          </InputBGWrapperIcon>
        }
        classNames={{
          trigger: ["select-wrapper-ipractis"],
          innerWrapper: ["select-ipractis", "w-full"],
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

      <button
        className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
        onClick={() => handleDeleteMasteredLanguage(nameLanguage)}
        type="button"
      >
        <TrashBinIcon
          fillColor={"fill-primary-color-P4"}
          strokeColor={"stroke-primary-color-P4"}
        />
      </button>
    </div>
  );
};

export default AboutYourselfLevelLanguage;
