import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { reasons } from "@/src/data/dataSupportRequest";

// Nextjs imports
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";

// Images && icons
import circleHelpInput from "@/public/icons/circle-help-input.png";
import { ChevronDownBigIcon } from "../Icons";

const LeftColumnReasonsSelect = ({
  frontEndErrors,
  backEndErrors,
  register,
  watch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <InputLeftStickStatus
          inputBarStatusClassName={getLeftStickInputColorStatus(
            frontEndErrors,
            backEndErrors,
            watch("reason")
          )}
        >
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
            {...register("reason", {
              required:
                "Invalid Situation --- Please, describe the situation of the problem.",
            })}
            classNames={{
              trigger: [
                "select-wrapper-ipractis",
                (frontEndErrors?.reason?.type || backEndErrors?.message) &&
                  "form-input-error",
                ,
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
        </InputLeftStickStatus>
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
