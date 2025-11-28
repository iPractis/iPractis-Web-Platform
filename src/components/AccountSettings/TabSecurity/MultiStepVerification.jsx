import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { Controller, useController } from "react-hook-form";

// React imports
import { useState } from "react";

// Icons
import {
  PadLockClosedIcon,
  ChevronDownBigIcon,
  CheckIcon,
  CloseBoxIcon,
  GlobeGridIcon,
  PlayIcon,
} from "../../Icons";

const MultiStepVerification = ({ errors, control, isSubmitted }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name: "inputValue",
    control,
  });

  return (
    <div className="space-y-[32px]">
      <Controller
        name="multiStepVerification"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="flex flex-col space-y-2">
            <Switch
              name="multiStepVerification"
              isSelected={value}
              defaultSelected
              onValueChange={onChange}
              size="sm"
              classNames={{
                wrapper: `${
                  !value && isSubmitted
                    ? "form-input-error"
                    : "bg-primary-color-P6"
                } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                thumb: "bg-primary-color-P12",
                label: "text-primary-color-P1 ST-4 ml-1",
              }}
              thumbIcon={({ isSelected }) =>
                isSelected ? (
                  <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                ) : (
                  <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                )
              }
            >
              Enable Multi-Step verification
            </Switch>

            <SplitDynamicErrorZod message={error?.message} />
          </div>
        )}
      />

      <div>
        <div className="flex flex-col mb-2 ps-1.5">
          <span className="flex gap-1.5 items-center text-primary-color-P4 ST-SB-4">
            Authenticator
          </span>
          <span className="text-primary-color-P4 ST-3">
            Choose your preferred authentication method
          </span>
        </div>

        <InputLeftStickStatus
          inputBarStatusClassName={getInputStatusBorder(
            errors,
            value,
            "inputValue",
            false
          )}
        >
          <Select
            name="inputValue"
            onChange={onChange}
            value={value}
            onOpenChange={(open) => {
              setIsOpen(open);

              if (!open) {
                onBlur();
              }
            }}
            placeholder="Select an authenticator"
            selectorIcon={<span></span>}
            isOpen={isOpen}
            startContent={
              <InputBGWrapperIcon className="p-[8px]">
                <GlobeGridIcon />
              </InputBGWrapperIcon>
            }
            endContent={
              <InputBGWrapperIcon className="p-[8px]">
                <PlayIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>
            }
            classNames={{
              trigger: "!p-[6px] !min-h-0 h-auto bg-secondary-color-S11 !rounded-[16px] !shadow-none",
              innerWrapper: "!gap-0 !ps-0 w-full",
              value: "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3 !ml-[16px]",
              listbox: "text-primary-color-P4",
            }}
          >
            {["Option 1", "Option 2", "Option 3"].map((subSubject) => (
              <SelectItem key={subSubject}>{subSubject}</SelectItem>
            ))}
          </Select>
        </InputLeftStickStatus>

        <SplitDynamicErrorZod message={error?.message} />
      </div>
    </div>
  );
};

export default MultiStepVerification;
