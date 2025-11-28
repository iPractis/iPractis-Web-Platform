import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import {
  currencies,
  languages,
  timeZones,
} from "@/src/data/dataAccountSettings";

// External imports
import { Select, SelectItem } from "@nextui-org/react";
import { useController } from "react-hook-form";

// React imports
import { useState } from "react";

// Icons
import {
  DollarSignCircleIcon,
  ChevronDownBigIcon,
  EarthBorderedIcon,
  SunAndMoonIcon,
  QuestionMark,
  Clock5Icon,
  CircleImportantIcon,
  CircleLocationIcon,
} from "../../Icons";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { useAuth } from "@/src/hooks/useAuth";

const Preferences = ({ errors, control, watch }) => {
  const [isOpenTimezone, setIsOpenTimezone] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  const {
    field: timeZone,
    fieldState: { error: timeZoneError },
  } = useController({
    name: "timeZone",
    control,
  });

  const {
    field: language,
    fieldState: { error: languageError },
  } = useController({
    name: "language",
    control,
  });

  const {
    field: currency,
    fieldState: { error: currencyError },
  } = useController({
    name: "currency",
    control,
  });

  const {
    field: timeFormat,
    fieldState: { error: timeFormatError },
  } = useController({
    name: "timeFormat",
    control,
  });

  const selectedTimeFormat = watch("timeFormat");

  const handleCheckboxChange = (timeSelected) => {
    timeFormat.onChange(timeSelected);
  };

  const { user } = useAuth();

  const isTeacher = user.role.toLowerCase() === "teacher";

  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<CircleLocationIcon fillcolor={"fill-primary-color-P1"} />}
        titleText={"Account's Preferences"}
        descriptionText={"Customize your account settings."}
      />
      <SectionContent>
        <div>
          <div className="flex flex-col mb-2 ps-1.5">
            <span className="flex gap-1.5 items-center text-primary-color-P4 ST-SB-4">
              Account Language{" "}
              <QuestionMark fillcolor={"fill-primary-color-P4"} />
            </span>
          </div>
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              language.value,
              "language"
            )}
          >
            <Select
              name="language"
              placeholder="Select a language"
              selectorIcon={<span></span>}
              isOpen={isOpenLanguage}
              startContent={
                <InputBGWrapperIcon>
                  <EarthBorderedIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              defaultSelectedKeys={new Set([language.value])}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys).at(0);
                language.onChange(selectedKey);
              }}
              onOpenChange={(open) => {
                setIsOpenLanguage(open);

                if (!open) {
                  language.onBlur();
                }
              }}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis min-h-fit bg-secondary-color-S11",
                  languageError?.message && "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full", "!pt-0"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
              }}
            >
              {languages?.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </Select>
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={languageError?.message} />
        </div>

        {/* Timezone */}
        <div>
          <div className="flex flex-col mb-2 ps-1.5">
            <span className="flex gap-1.5 items-center text-primary-color-P4 ST-SB-4">
              Timezone{" "}
              <QuestionMark fillcolor={"fill-primary-color-P4"} />
            </span>
          </div>
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
              isOpen={isOpenTimezone}
              startContent={
                <InputBGWrapperIcon>
                  <Clock5Icon fillcolor={"fill-primary-color-P4"} />
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
                setIsOpenTimezone(open);

                if (!open) {
                  timeZone.onBlur();
                }
              }}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis min-h-fit bg-secondary-color-S11",
                  timeZoneError?.message && "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full", "!pt-0"],
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

          <SplitDynamicErrorZod message={timeZoneError?.message} />
        </div>

        {/* Currency */}
        {isTeacher && <div>
          <div className="flex flex-col mb-2 ps-1.5">
            <span className="flex gap-1.5 items-center text-primary-color-P4 ST-SB-4">
              Currency{" "}
              <QuestionMark fillcolor={"fill-primary-color-P4"} />
            </span>
          </div>
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              currency.value,
              "currency"
            )}
          >
            <Select
              name="currency"
              placeholder="Select a currency"
              selectorIcon={<span></span>}
              isOpen={isOpenCurrency}
              startContent={
                <InputBGWrapperIcon>
                  <DollarSignCircleIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              defaultSelectedKeys={new Set([currency.value])}
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0];
                currency.onChange(key);
              }}
              onOpenChange={(open) => {
                setIsOpenCurrency(open);

                if (!open) {
                  currency.onBlur();
                }
              }}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis min-h-fit bg-secondary-color-S11",
                  currencyError?.message && "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full", "!pt-0"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
              }}
            >
              {currencies?.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </Select>
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={currencyError?.message} />
        </div>}

        {/* Time format */}
        <div>
          <div className="flex flex-col mb-2 ps-1.5">
            <span className="flex gap-1.5 items-center text-primary-color-P4 ST-SB-4">
              Time format <QuestionMark fillcolor={"fill-primary-color-P4"} />
            </span>
          </div>
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              timeFormat?.value,
              "timeFormat"
            )}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 w-full rounded-2xl p-1.5 ST-3 bg-secondary-color-S11 group-hover:bg-secondary-color-S9`}
              >
                <InputBGWrapperIcon>
                  <SunAndMoonIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>

                <CustomNextUiInput
                  isReadOnly
                  type="text"
                  name="timeFormat"
                  placeholder="12 H"
                  labelPlacement="outside"
                  endContent={
                    <CustomNextUiCheckbox
                      className="checkbox-label-ipractis"
                      isSelected={selectedTimeFormat === "12h"}
                      onChange={() => handleCheckboxChange("12h")}
                      size="sm"
                    />
                  }
                  classNames={{
                    input: "!px-1.5 group",
                    inputWrapper: timeFormatError?.message
                      ? "form-input-error"
                      : "!bg-primary-color-P12 input-wrapper-ipractis-custom",
                  }}
                />

                <CustomNextUiInput
                  isReadOnly
                  name="timeFormat"
                  type="text"
                  placeholder="24 H"
                  labelPlacement="outside"
                  endContent={
                    <CustomNextUiCheckbox
                      className="checkbox-label-ipractis"
                      isSelected={selectedTimeFormat === "24h"}
                      onChange={() => handleCheckboxChange("24h")}
                      size="sm"
                    />
                  }
                  classNames={{
                    input: "!px-1.5 group",
                    inputWrapper: timeFormatError?.message
                      ? "form-input-error"
                      : "!bg-primary-color-P12 input-wrapper-ipractis-custom",
                  }}
                />
              </div>
            </div>
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={timeFormatError?.message} />
        </div>
      </SectionContent>
    </SectionWrapper>
  );
};

export default Preferences;
