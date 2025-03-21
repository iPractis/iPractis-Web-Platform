import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
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
  SparkleIcon,
  Clock5Icon,
} from "../../Icons";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

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

  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-16"
        titleIcon={<SparkleIcon fillColor={"fill-primary-color-P1"} />}
        descriptionText={"Customize your account settings."}
        descriptionClassName={"mt-[4px]"}
        titleText={"Preferences"}
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] lg:px-8">
        {/* language */}
        <div>
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
              label={
                <div className="ps-0 mb-2">
                  <p className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                    Language{" "}
                    <QuestionMark fillColor={"fill-primary-color-P4"} />
                  </p>
                </div>
              }
              startContent={
                <InputBGWrapperIcon>
                  <EarthBorderedIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              defaultSelectedKeys={new Set([language.value])}
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0];
                language.onChange(key);
              }}
              onOpenChange={(open) => {
                setIsOpenLanguage(open);

                if (!open) {
                  language.onBlur();
                }
              }}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis min-h-fit",
                  languageError?.message && "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full", "!pt-0"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
                label: "mb-12 !scale-100",
              }}
            >
              {languages?.map((tz, index) => (
                <SelectItem key={index} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </Select>
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={languageError?.message} />
        </div>

        {/* Timezone */}
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
              isOpen={isOpenTimezone}
              label={
                <div className="ps-0 mb-2">
                  <p className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                    Timezone{" "}
                    <QuestionMark fillColor={"fill-primary-color-P4"} />
                  </p>
                </div>
              }
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
                setIsOpenTimezone(open);

                if (!open) {
                  timeZone.onBlur();
                }
              }}
              classNames={{
                trigger: [
                  "select-wrapper-ipractis min-h-fit",
                  timeZoneError?.message && "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full", "!pt-0"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
                label: "mb-12 !scale-100",
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
        <div>
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
              label={
                <div className="ps-0 mb-2">
                  <p className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                    Currency{" "}
                    <QuestionMark fillColor={"fill-primary-color-P4"} />
                  </p>
                </div>
              }
              startContent={
                <InputBGWrapperIcon>
                  <DollarSignCircleIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
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
                  "select-wrapper-ipractis min-h-fit",
                  currencyError?.message && "form-input-error",
                ],
                innerWrapper: ["select-ipractis", "w-full", "!pt-0"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
                label: "mb-12 !scale-100",
              }}
            >
              {currencies?.map((tz, index) => (
                <SelectItem key={index} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </Select>
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={currencyError?.message} />
        </div>

        {/* Time format */}
        <div className="relative">
          <div className="absolute -top-8">
            <span className="flex ps-[5px] gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
              Time format <QuestionMark fillColor={"fill-primary-color-P4"} />
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
                className={`flex items-center gap-1.5 w-full rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9`}
              >
                <InputBGWrapperIcon>
                  <SunAndMoonIcon fillColor={"fill-primary-color-P4"} />
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
      </div>
    </div>
  );
};

export default Preferences;
