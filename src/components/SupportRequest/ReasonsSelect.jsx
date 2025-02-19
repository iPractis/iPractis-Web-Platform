import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import { errorFormMessages, reasons } from "@/src/data/dataSupportRequest";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";

// Nextjs imports
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, HelpIcon } from "../Icons";

const ReasonsSelect = ({
  frontEndErrors,
  backEndErrors,
  register,
  watch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <InputLeftStickStatus
        inputBarStatusClassName={getLeftStickInputColorStatus(
          frontEndErrors,
          backEndErrors,
          watch("reason")
        )}
      >
        <div className="flex items-center gap-2">
          <Select
            name="reason"
            onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
            placeholder="Select a reason"
            selectorIcon={<span></span>}
            isOpen={isOpen}
            startContent={
              <InputBGWrapperIcon className={"cursor-pointer"}>
                <HelpIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <InputBGWrapperIcon>
                <ChevronDownBigIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            {...register("reason", {
              required:
                "Invalid Reason --- Please, include a reason of the problem.",
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
        </div>
      </InputLeftStickStatus>

      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        fieldName="reason"
      />
    </>
  );
};

export default ReasonsSelect;
