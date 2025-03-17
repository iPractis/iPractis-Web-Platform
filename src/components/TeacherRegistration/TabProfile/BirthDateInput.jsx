import { getSuggestionClassName } from "@/src/lib/helpers/getSuggestionClassName";
import { getMonthNumberFromText } from "@/src/lib/helpers/getMonthNumberFromText";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getMonthSuggestions } from "@/src/lib/helpers/getMonthSuggestions";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import { getDateYearsAgo } from "@/src/lib/utils/getDateYearsAgo";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import BirthDateCustomHeader from "./BirthDateCustomHeader";

// External imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

// React imports
import { useController } from "react-hook-form";
import { useEffect, useState } from "react";

// Icons
import { CalendarBiggerIcon, BabyWalkerIcon, QuestionMark } from "../../Icons";

const BirthDateInput = ({ errors, control }) => {
  const currentDate = moment(getDateYearsAgo(18));
  const defaultDate = currentDate.format("D");
  const defaultMonth = currentDate.format("MM");
  const defaultYear = currentDate.format("YYYY");

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const {
    field: birthDate,
    fieldState: { error: birthDateError },
  } = useController({
    name: "birthDate",
    control: control,
  });

  const { field: birthDateNumber } = useController({
    name: "birthDateNumber",
    control: control,
    defaultValue: defaultDate,
  });

  const { field: birthDateMonth } = useController({
    name: "birthDateMonth",
    control: control,
    defaultValue: defaultMonth,
  });

  const { field: birthDateYear } = useController({
    name: "birthDateYear",
    control: control,
    defaultValue: defaultYear,
  });

  useEffect(() => {
    if (!birthDate.value) {
      birthDateNumber.onChange(defaultDate);
      birthDateMonth.onChange(defaultMonth);
      birthDateYear.onChange(defaultYear);
      setInputValue(getMonthNumberAsText(defaultMonth));
    } else {
      const date = moment(birthDate.value, "YYYY/MM/D");
      birthDateNumber.onChange(date.format("D"));
      birthDateMonth.onChange(date.format("MM"));
      birthDateYear.onChange(date.format("YYYY"));
      setInputValue(getMonthNumberAsText(date.format("MM")));
    }
  }, [birthDate.value]);

  useEffect(() => {
    if (birthDateMonth.value) {
      setInputValue(getMonthNumberAsText(birthDateMonth.value));
    }
  }, [birthDateMonth.value]);

  const handleInputChange = (value) => {
    const validCharacters = /^[JFMASONDjfmasond][a-zA-Z]*$/;

    if (value === "" || validCharacters.test(value)) {
      const capitalizedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      setInputValue(capitalizedValue);
      setSuggestions(getMonthSuggestions(value));

      // Only update the month and date if the value is a complete and valid month
      const monthNumber = getMonthNumberFromText(value);
      if (
        monthNumber !== null &&
        value.toLowerCase() === getMonthNumberAsText(monthNumber).toLowerCase()
      ) {
        const updatedDate = moment(birthDate.value || currentDate, "YYYY/MM/D")
          .month(monthNumber - 1)
          .format("YYYY/MM/D");
        birthDate.onChange(updatedDate);
        birthDateMonth.onChange(monthNumber.toString().padStart(2, "0"));
      }
    }
  };

  const handleDateChange = (date) => {
    const dateString = date
      ? moment(date).format("YYYY/MM/D")
      : currentDate.format("YYYY/MM/D");
    birthDate.onChange(dateString);
    birthDateNumber.onChange(moment(dateString, "YYYY/MM/D").format("D"));
    birthDateMonth.onChange(moment(dateString, "YYYY/MM/D").format("MM"));
    birthDateYear.onChange(moment(dateString, "YYYY/MM/D").format("YYYY"));
    setInputValue(
      getMonthNumberAsText(moment(dateString, "YYYY/MM/D").format("MM"))
    );
  };

  const selectedDate = moment(
    `${birthDateYear.value}/${birthDateMonth.value}/${birthDateNumber.value}`,
    "YYYY/MM/D"
  ).toDate();

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      const completedMonth = suggestions[0];
      setInputValue(completedMonth);

      // Update the month and date
      const monthNumber = getMonthNumberFromText(completedMonth);
      if (monthNumber !== null) {
        const updatedDate = moment(birthDate.value || currentDate, "YYYY/MM/D")
          .month(monthNumber - 1)
          .format("YYYY/MM/D");
        birthDate.onChange(updatedDate);
        birthDateMonth.onChange(monthNumber.toString().padStart(2, "0"));
      }
    }
  };

  return (
    <div className="!mt-4 group">
      <span className="flex gap-1.5 ps-[5px] items-center MT-SB-1 mb-1 text-primary-color-P4">
        Birth date <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          birthDate.value,
          "birthDate"
        )}
      >
        <div
          className={`flex justify-between gap-1.5 rounded-2xl p-1.5 ST-3 ${
            birthDateError?.message
              ? "form-input-error"
              : "bg-primary-color-P11"
          } group-hover:bg-secondary-color-S9`}
        >
          <div>
            <InputBGWrapperIcon>
              <BabyWalkerIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          </div>

          <div className="flex-[30%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 h-9"
              onChange={(e) => {
                birthDateNumber.onChange(e.target.value);
                const newDate = moment(
                  `${birthDateYear.value}/${birthDateMonth.value}/${e.target.value}`,
                  "YYYY/MM/D"
                ).format("YYYY/MM/D");
                birthDate.onChange(newDate);
              }}
              onBlur={() => {
                birthDateNumber.onBlur();
                birthDate.onBlur();
              }}
              value={birthDateNumber.value}
              name="birthDateNumber"
              type="text"
            />
          </div>

          <div className="relative flex-[65%]">
            <input
              className={`input-ipractis ${
                inputValue.toLowerCase() ===
                getMonthNumberAsText(
                  getMonthNumberFromText(inputValue)
                )?.toLowerCase()
                  ? "text-center"
                  : "text-start"
              } w-full outline-none rounded-xl !p-0 !px-4 h-9`}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                birthDateMonth.onBlur();
                birthDate.onBlur();
              }}
              name="birthDateMonth"
              value={inputValue}
              type="text"
            />

            {suggestions.length > 0 && (
              <span
                className={`absolute top-0 ${
                  !inputValue.length
                    ? "left-[30%]"
                    : getSuggestionClassName(inputValue)
                } h-full flex items-center pointer-events-none text-gray-400`}
              >
                {suggestions[0].slice(inputValue.length)}
              </span>
            )}
          </div>

          <div className="flex-[45%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 h-9"
              onChange={(e) => {
                birthDateYear.onChange(e.target.value);
                const newDate = moment(
                  `${e.target.value}/${birthDateMonth.value}/${birthDateNumber.value}`,
                  "YYYY/MM/D"
                ).format("YYYY/MM/D");
                birthDate.onChange(newDate);
              }}
              onBlur={() => {
                birthDateYear.onBlur();
                birthDate.onBlur();
              }}
              value={birthDateYear.value}
              name="birthDateYear"
              type="text"
            />
          </div>

          <div>
            <DatePicker
              renderCustomHeader={BirthDateCustomHeader}
              onChange={handleDateChange}
              onBlur={birthDate.onBlur}
              showPopperArrow={false}
              value={birthDate.value}
              dateFormat="YYYY/MM/D"
              dropdownMode="select"
              calendarStartDay={1}
              selected={selectedDate}
              customInput={
                <button
                  className="p-1.5 rounded-[10px] bg-primary-color-P12"
                  type="button"
                >
                  <CalendarBiggerIcon fillColor={"fill-primary-color-P4"} />
                </button>
              }
            />
          </div>
        </div>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={birthDateError?.message} />
    </div>
  );
};

export default BirthDateInput;
