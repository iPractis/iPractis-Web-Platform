import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { timeZones } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";
import { Select, SelectItem } from "@nextui-org/react";
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
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";

const WorkTimePreferences = ({ draft, errors, selectedSlots }) => {
  // console.log(selectedSlots?.length) // --> gives 0
  // console.log(draft?.dailyWorkTime) // --> gives 8

  const [dailyWorkTime, setDailyWorkTime] = useState(draft?.dailyWorkTime);
  const [isOpen, setIsOpen] = useState(false);

  const timeZoneError = findInputErrorZod(errors, "timeZone")?.message;
  const dailyWorkTimeError = findInputErrorZod(
    errors,
    "dailyWorkTime"
  )?.message;

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

          <Select
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
            defaultSelectedKeys={[draft?.timeZone]}
            classNames={{
              trigger: [
                "select-wrapper-ipractis",
                timeZoneError && "form-input-error",
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

          <ErrorZodResponse errors={errors} fieldName={"timeZone"} />
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

          <CustomNextUiInput
            readOnly
            type="text"
            name="dailyWorkTime"
            value={dailyWorkTime}
            onChange={(e) => setDailyWorkTime(e?.target?.value)}
            defaultValue={draft?.dailyWorkTime}
            placeholder="Define your daily work time"
            startContent={
              <InputBGWrapperIcon>
                <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            classNames={{
              inputWrapper: dailyWorkTimeError && "form-input-error",
            }}
          />

          <ErrorZodResponse errors={errors} fieldName={"dailyWorkTime"} />
        </div>
      </div>
    </>
  );
};

export default WorkTimePreferences;
