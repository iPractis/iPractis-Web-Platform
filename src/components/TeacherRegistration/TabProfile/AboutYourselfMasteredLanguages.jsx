import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, ChevronDownIcon, QuestionMark, UserSpeakingIcon } from "../../Icons";
import AboutYourselfLevelLanguage from "./AboutYourselfLevelLanguage";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { Select, SelectItem } from "@nextui-org/react";

const AboutYourselfMasteredLanguages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 w-full">
      {/* Select Language */}
      <div className="flex items-end gap-2 mt-7">
        <Select
          label={
            <div className="mb-2">
              <span className="flex gap-1.5  items-center text-primary-color-P4 MT-SB-1">
                Select the languages your masters{" "}
                <QuestionMark fillColor={"fill-primary-color-P4"} />
              </span>

              <span className="text-primary-color-P4 ST-3">
                Select only the languages you can use to teach.
              </span>
            </div>
          }
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
            trigger: ["select-wrapper-ipractis"],
            innerWrapper: ["select-ipractis", "w-full"],
            value: [
              "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
            ],
            listbox: ["text-primary-color-P4"],
          }}
        >
          {["Spanish", "English", "French", "Italian", "Portuguese"].map(
            (reason) => (
              <SelectItem key={reason}>{reason}</SelectItem>
            )
          )}
        </Select>
      </div>

      {/* Select Level Language */}
      <AboutYourselfLevelLanguage />
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
