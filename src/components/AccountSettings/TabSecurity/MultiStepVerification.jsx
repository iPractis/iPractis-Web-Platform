import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { Controller, useController } from "react-hook-form";

// React imports
import { useState } from "react";

// Icons
import {
  PadLockUserIcon,
  PadLockClosedIcon,
  ChevronDownBigIcon,
  CheckIcon,
  CloseBoxIcon,
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
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={
          "Enable multi-step verification for an added layer of security. Choose from various verification options for your account."
        }
        titleIcon={<PadLockUserIcon fillColor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px]"}
        titleText={"Multi-Step Verification"}
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:px-8">
        <Controller
          name="multiStepVerification"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
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
            </>
          )}
        />

        <div>
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
              placeholder="Select an option"
              selectorIcon={<span></span>}
              isOpen={isOpen}
              startContent={
                <InputBGWrapperIcon>
                  <PadLockClosedIcon versionIcon={2} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                trigger: "px-1 py-1.5 h-auto",
                innerWrapper: ["select-ipractis", "w-full"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
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
    </div>
  );
};

export default MultiStepVerification;
