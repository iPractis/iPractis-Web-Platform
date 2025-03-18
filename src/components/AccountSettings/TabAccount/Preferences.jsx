import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { timeZones } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Select, SelectItem } from "@nextui-org/react";
import { useController } from "react-hook-form";

// React imports
import { useState } from "react";

// Icons
import { ChevronDownBigIcon, Clock5Icon, SparkleIcon } from "../../Icons";

const Preferences = ({ errors, control }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: timeZone,
    fieldState: { error: timeZoneError },
  } = useController({
    name: "timeZone",
    control,
  });

  return (
    <>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px]"
        titleIcon={<SparkleIcon fillColor={"fill-primary-color-P1"} />}
        descriptionText={"Customize your account settings."}
        descriptionClassName={"mt-[4px]"}
        titleText={"Preferences"}
        titleClassName="MT-SB-1"
      />

      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          timeZone.value,
          "timeZone"
        )}
      >
        <Select
          name="timeZone"
          placeholder="Select a time zone"
          selectorIcon={<span></span>}
          isOpen={isOpen}
          startContent={
            <InputBGWrapperIcon>
              <Clock5Icon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon>
              <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
            </InputBGWrapperIcon>
          }
          defaultSelectedKeys={new Set([timeZone.value])}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            timeZone.onChange(key);
          }}
          onOpenChange={(open) => {
            setIsOpen(open);

            if (!open) {
              timeZone.onBlur();
            }
          }}
          classNames={{
            trigger: [
              "select-wrapper-ipractis",
              timeZoneError?.message && "form-input-error",
            ],
            innerWrapper: ["select-ipractis", "w-full"],
            value: [
              "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
            ],
            listbox: ["text-primary-color-P4"],
          }}
        >
          {timeZones?.map((tz) => (
            <SelectItem key={tz.value} value={tz.value}>
              {tz.label}
            </SelectItem>
          ))}
        </Select>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod
        message={
          timeZoneError?.message &&
          "Invalid timezone --- Please provide a timezone from select."
        }
      />
    </>
  );
};

export default Preferences;
