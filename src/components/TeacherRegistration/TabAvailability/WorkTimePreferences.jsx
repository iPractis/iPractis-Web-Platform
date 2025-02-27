import { DynamicInputErrorMessageWithZod } from "../../Shared/DynamicInputErrorMessageWithZod";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { timeZones } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

// React imports
import { useState } from "react";

// Icons
import {
  ChevronDownBigIcon,
  Clock1220Icon,
  Clock12Icon,
  EarthIcon,
  LuggageBiggerIcon,
  LuggageClockIcon,
} from "../../Icons";

const WorkTimePreferences = ({
  frontEndErrors,
  backEndErrors,
  register,
  control,
  watch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(frontEndErrors, 'hay')

  return (
    <>
      <SectionHeader
        descriptionText="Minimum working time is set to 8 hours par week, please consider your weekly tasks and commitment to define your work time."
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8 mb-[50px]"
        }
        titleIcon={<LuggageClockIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Work time preferences"
        titleClassName="MT-SB-1"
      />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-[50px] md:px-8">
        {/* Set your time zone */}
        <div>
          <SectionHeader
            descriptionText="Please set your time zone to ensure that all session times are displayed accurately in your local time. This helps avoid any scheduling conflicts and ensures smooth coordination between tutor and students."
            wrapperSectionHeaderClassName={"p-0 mb-[50px]"}
            titleIcon={<Clock1220Icon fillColor={"fill-primary-color-P1"} />}
            titleText="Set your time zone"
            titleClassName="MT-SB-1"
          />

          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("timeZone"),
              "timeZone"
            )}
          >
            <Controller
              name="timeZone"
              control={control}
              rules={{
                required:
                  "Invalid timezone --- Please provide a timezone from select.",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  name="timeZone"
                  onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
                  placeholder="Select a time zone"
                  selectorIcon={<span></span>}
                  isOpen={isOpen}
                  startContent={
                    <InputBGWrapperIcon>
                      <EarthIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  endContent={
                    <InputBGWrapperIcon>
                      <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                    </InputBGWrapperIcon>
                  }
                  defaultSelectedKeys={[field.value]}
                  classNames={{
                    trigger: [
                      "select-wrapper-ipractis",
                      (frontEndErrors?.timeZone?.type ||
                        backEndErrors?.message) &&
                        "form-input-error",
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
              )}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessageWithZod
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="timeZone"
          />
        </div>

        {/* Set your daily work time limit */}
        <div>
          <SectionHeader
            descriptionText="Set your daily work time limit to manage your workload effectively and maintain a healthy work-life balance. This limit helps ensure you don't overcommit and have enough time for rest and practice personal activities."
            wrapperSectionHeaderClassName={"p-0 mb-[50px]"}
            titleIcon={<Clock12Icon fillColor={"fill-primary-color-P1"} />}
            titleText="Set your daily work time limit"
            titleClassName="MT-SB-1"
          />

          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("dailyWorkTime"),
              "dailyWorkTime"
            )}
          >
            <CustomNextUiInput
              readOnly
              type="text"
              name="dailyWorkTime"
              placeholder="Define your daily work time"
              startContent={
                <InputBGWrapperIcon>
                  <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper:
                  (frontEndErrors?.dailyWorkTime?.type ||
                    backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("dailyWorkTime")}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessageWithZod
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="dailyWorkTime"
          />
        </div>
      </div>
    </>
  );
};

export default WorkTimePreferences;
