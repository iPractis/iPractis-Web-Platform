import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { timeZones } from "@/src/data/dataTeacherRegistration";
import IconHeader from "../../Shared/IconHeader";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { useController, Controller } from "react-hook-form";

// React imports
import { useState } from "react";

// Icons
import {
  ChevronDownBigIcon,
  LuggageBiggerIcon,
  LuggageClockIcon,
  EarthIcon,
  QuestionMark,
  CheckIcon,
  CloseBoxIcon,
} from "../../Icons";
import { GenderIcon } from "../../Icons";

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

  const {
    field: enableWorkTimeLimit,
  } = useController({
    name: "enableWorkTimeLimit",
    control,
  });

  // dailyWorkTime should be a static user-defined value (hours/day)

  return (
    <>
      <SectionHeader
        titleIcon={<LuggageClockIcon fillcolor="fill-primary-color-P1" />}
        titleText="Work time preferences"
        descriptionText="Minimum working time is set to 8 hours par week, please consider your weekly tasks and commitment to define your work time."
        titleClassName="MT-SB-1"
      />

      <div className="flex flex-col gap-[50px] ml-[285px] max-w-[430px]">
        {/* Set your time zone */}
        <div>
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
                  <EarthIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />
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
              label={
                <div className="flex flex-col lg:mb-2 mb-2 ps-1.5">
                    <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                      Time zone{" "}
                      <QuestionMark fillcolor={"fill-primary-color-P4"} />
                    </span>

                    <span className=" text-primary-color-P4 ST-3 text-left">
                      Please set your time zone to ensure that all session times are displayed accurately in your local time. This helps avoid any scheduling conflicts and ensures smooth coordination between tutor and students.
                    </span>
                  </div>
              }
              classNames={{
                trigger: [
                  "select-wrapper-ipractis",
                  timeZoneError?.message && "form-input-error",
                  "!bg-[#f8f7f5]",
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
          <IconHeader
            icon={<GenderIcon fillcolor="fill-primary-color-P1" />}
            title="Work time limit"
            description="Define the operational cap for your daily working hour to ensure consistent alignment with your capacity."
          />

          <Controller
            name="enableWorkTimeLimit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="mb-4">
                <Switch
                  name="enableWorkTimeLimit"
                  isSelected={value}
                  onValueChange={onChange}
                  size="sm"
                  classNames={{
                    wrapper: `bg-primary-color-P6 group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
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
                  <span className="text-primary-color-P1 ST-4">
                    Enable daily work time limit
                  </span>
                </Switch>
              </div>
            )}
          />

          <InputLeftStickStatus
            inputBarStatusClassName={
              !enableWorkTimeLimit.value
                ? "border-[#e5e5e5]"
                : getInputStatusBorder(errors, dailyWorkTime.value, "dailyWorkTime")
            }
            className={!enableWorkTimeLimit.value ? "opacity-50" : ""}
          >
            <div className="relative">
              <CustomNextUiInput
                type="number"
                step="0.5"
                name="dailyWorkTime"
                placeholder="Define your daily work time"
                isDisabled={!enableWorkTimeLimit.value}
                classNames={{
                  inputWrapper: [
                    enableWorkTimeLimit.value && dailyWorkTimeError?.message && "form-input-error",
                    !enableWorkTimeLimit.value ? "!bg-[#e5e5e5]" : "!bg-[#f8f7f5]",
                  ],
                }}
                startContent={
                  <InputBGWrapperIcon>
                    <LuggageBiggerIcon
                      fillcolor={enableWorkTimeLimit.value ? "fill-primary-color-P4" : "fill-primary-color-P6"}
                    />
                  </InputBGWrapperIcon>
                }
                onChange={(e) => {
                  const val = e.target.value;
                  dailyWorkTime.onChange(val === "" ? "" : Number(val));
                }}
                onBlur={dailyWorkTime.onBlur}
                value={dailyWorkTime.value ?? ""}
              />
              {dailyWorkTime.value !== undefined && dailyWorkTime.value !== "" && (
                <span
                  className={`absolute top-1/2 -translate-y-1/2 ST-3 pointer-events-none whitespace-nowrap ${
                    enableWorkTimeLimit.value ? "text-primary-color-P4" : "text-primary-color-P6"
                  }`}
                  style={{ left: `${(String(dailyWorkTime.value).length * 8) + 65}px` }}
                >
                  {" Hours"}
                </span>
              )}
            </div>
          </InputLeftStickStatus>

          {enableWorkTimeLimit.value && (
            <SplitDynamicErrorZod
              message={
                dailyWorkTimeError?.message &&
                "Working time doesn't meet requirement — minimum is 1 hour per day."
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default WorkTimePreferences;
