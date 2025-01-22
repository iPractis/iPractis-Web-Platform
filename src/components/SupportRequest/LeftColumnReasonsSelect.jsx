import { Select, SelectItem } from "@nextui-org/react";
import { reasons } from "@/src/data/dataSupportRequest";
import { ChevronDownBigIcon } from "../Icons";

// Nextjs imports
import { useState } from "react";
import Image from "next/image";

// Images && icons
import circleHelpInput from "@/public/icons/circle-help-input.png";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";

const LeftColumnReasonsSelect = ({ isValidReasonErrors, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Select
          name="reason"
          onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
          placeholder="Select a reason"
          selectorIcon={<span></span>}
          aria-label="reason"
          isOpen={isOpen}
          startContent={
            <Image className="w-9" src={circleHelpInput} alt="User Input" />
          }
          endContent={
            <InputBGWrapperIcon>
              <ChevronDownBigIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          classNames={{
            trigger: [
              "select-wrapper-ipractis",
              isValidReasonErrors && "form-input-error",
            ],
            innerWrapper: ["select-ipractis w-full"],
            value: [
              "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
            ],
            listbox: ["text-primary-color-P4"],
          }}
        >
          {reasons?.map((reason) => (
            <SelectItem key={reason}>{reason}</SelectItem>
          ))}
        </Select>
      </div>

      {isValidReasonErrors && (
        <ErrorMessageiPractis
          typeError={error?.title}
          descError={error?.message}
        />
      )}
    </>
  );
};

export default LeftColumnReasonsSelect;
