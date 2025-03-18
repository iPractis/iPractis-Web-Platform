import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { timeZones } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { useController, useWatch } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

// React imports
import { useEffect, useState } from "react";

// Icons
import {
  ChevronDownBigIcon,
  LuggageBiggerIcon,
  LuggageClockIcon,
  Clock1220Icon,
  Clock12Icon,
  EarthIcon,
} from "../../Icons";

const WorkTimePreferences = ({ errors, control }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: timeZone,
    fieldState: { error: timeZoneError },
  } = useController({
    name: "timeZone",
    control,
  });

  const {
    field: dailyWorkTime,
    fieldState: { error: dailyWorkTimeError },
  } = useController({
    name: "dailyWorkTime",
    control,
  });

  const workSchedule = useWatch({
    control,
    name: "workSchedule",
    defaultValue: [],
  });

  // Grab all the selected hours (what day selected not matter, we just grab the hour!)
  const slotsArray = workSchedule.reduce((acc, daySlot) => {
    const { day, hour } = daySlot;

    const dayHours = hour.map((h) => `${day}-${h}`);

    return [...acc, ...dayHours];
  }, []);

  useEffect(() => {
    dailyWorkTime.onChange(slotsArray.length);
  }, [slotsArray.length]);

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

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[50px] lg:px-8">
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
                  <EarthIcon fillColor={"fill-primary-color-P4"} />
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
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              dailyWorkTime.value,
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
                inputWrapper: dailyWorkTimeError?.message && "form-input-error",
              }}
              onChange={dailyWorkTime.onChange}
              onBlur={dailyWorkTime.onBlur}
              value={slotsArray?.length}
            />
          </InputLeftStickStatus>

          <SplitDynamicErrorZod
            message={
              dailyWorkTimeError?.message &&
              "Working time don't meet requirement --- Minimum working time is set to 8 hours per week."
            }
          />
        </div>
      </div>
    </>
  );
};

export default WorkTimePreferences;
