import { useState } from "react";
import Image from "next/image";

// Images && icons
import circleHelpInput from "@/public/icons/circle-help-input.png";
import { Select, SelectItem } from "@nextui-org/react";
import { ChevronDownIcon } from "../../Icons";

const AboutYourselfMasteredLanguages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Select
        onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
        placeholder="Select a reason"
        selectorIcon={<span></span>}
        aria-label="reason"
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
        {["Reason 1", "Reason 2"].map((reason) => (
          <SelectItem key={reason}>{reason}</SelectItem>
        ))}
      </Select>

      <button
        className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <ChevronDownIcon />
      </button>
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
