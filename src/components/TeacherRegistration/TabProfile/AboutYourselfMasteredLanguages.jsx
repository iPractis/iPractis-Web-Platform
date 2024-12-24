import { useState } from "react";
import Image from "next/image";

// Images && icons
import AboutYourselfIndividualMasterLanguage from "./AboutYourselfIndividualMasterLanguage";
import circleHelpInput from "@/public/icons/circle-help-input.png";
import { ChevronDownIcon, QuestionMark } from "../../Icons";
import { Select, SelectItem } from "@nextui-org/react";

const AboutYourselfMasteredLanguages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 h-full w-full">
      <div className="flex flex-col justify-between h-full">
        {/* Select Language */}
        <div className="flex items-end gap-2">
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
              <Image className="w-9" src={circleHelpInput} alt="User Input" />
            }
            classNames={{
              trigger: ["select-wrapper-ipractis"],
              innerWrapper: ["select-ipractis"],
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

          <button
            className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <ChevronDownIcon />
          </button>
        </div>

        {/* Select Level Language */}
        <AboutYourselfIndividualMasterLanguage />
      </div>
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
