import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../../lib/utils/getZodValidations";
import { errorFormMessages, reasons } from "@/src/data/dataSupportRequest";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";

// Nextjs imports
import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useState } from "react";

// Icons
import { ChevronDownBigIcon, HelpIcon } from "../Icons";

const ReasonsSelect = ({ frontEndErrors, backEndErrors, control, watch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <InputLeftStickStatus
        inputBarStatusClassName={getLeftStickInputColorStatus(
          frontEndErrors,
          backEndErrors,
          watch("reason"),
          "reason"
        )}
      >
        <div className="flex items-center gap-2">
          <Controller
            name="reason"
            control={control}
            rules={{
              required:
                "Invalid Reason --- Please, include a reason of the problem.",
            }}
            render={({ field, fieldState }) => (
              <Select
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  field.onChange(key);
                }}
                onOpenChange={(open) => {
                  setIsOpen(open);
                  
                  if (!open) {
                    field.onBlur();
                  }
                }}
                placeholder="Select a reason"
                selectorIcon={<span></span>}
                isOpen={isOpen}
                startContent={
                  <InputBGWrapperIcon className="cursor-pointer">
                    <HelpIcon fillcolor="fill-primary-color-P4" />
                  </InputBGWrapperIcon>
                }
                endContent={
                  <InputBGWrapperIcon>
                    <ChevronDownBigIcon fillcolor="fill-primary-color-P4" />
                  </InputBGWrapperIcon>
                }
                classNames={{
                  trigger: [
                    "select-wrapper-ipractis",
                    (fieldState?.invalid || backEndErrors?.message) &&
                      "form-input-error",
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
            )}
          />
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
