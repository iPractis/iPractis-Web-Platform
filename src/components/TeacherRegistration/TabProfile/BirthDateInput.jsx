import { getSuggestionClassName } from "@/src/lib/helpers/getSuggestionClassName";
import { getMonthNumberFromText } from "@/src/lib/helpers/getMonthNumberFromText";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getMonthSuggestions } from "@/src/lib/helpers/getMonthSuggestions";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import { getPaddingClass } from "@/src/lib/helpers/getPaddingClass";
import { getDateYearsAgo } from "@/src/lib/utils/getDateYearsAgo";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import BirthDateCustomHeader from "./BirthDateCustomHeader";

// External imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

// React imports
import { useController } from "react-hook-form";
import { useEffect, useState, useRef } from "react";

// Icons
import { CalendarBiggerIcon, BabyWalkerIcon, QuestionMark } from "../../Icons";

const BirthDateInput = ({ errors, control }) => {
  const currentDate = dayjs(getDateYearsAgo(18));
  const defaultDate = currentDate.format("D");
  const defaultMonth = currentDate.format("MM");
  const defaultYear = currentDate.format("YYYY");

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  // Refs for month input suggestive text positioning
  const monthMirrorRef = useRef(null);
  const monthInputRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

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
      const date = dayjs(birthDate.value, "YYYY/MM/D");
      birthDateNumber.onChange(date.format("D"));
      birthDateMonth.onChange(date.format("MM"));
      birthDateYear.onChange(date.format("YYYY"));
      setInputValue(getMonthNumberAsText(date.format("MM")));
    }
  }, [birthDate.value, defaultDate, defaultMonth, defaultYear]);

  useEffect(() => {
    if (birthDateMonth.value) {
      setInputValue(getMonthNumberAsText(birthDateMonth.value));
    }
  }, [birthDateMonth.value]);

  // Measure text width for accurate positioning
  useEffect(() => {
    if (monthMirrorRef.current) {
      setTextWidth(monthMirrorRef.current.offsetWidth);
    }
  }, [inputValue]);

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
        const updatedDate = dayjs(birthDate.value || currentDate, "YYYY/MM/D")
          .month(monthNumber - 1)
          .format("YYYY/MM/D");
        birthDate.onChange(updatedDate);
        birthDateMonth.onChange(monthNumber.toString().padStart(2, "0"));
      }
    }
  };

  const handleDateChange = (date) => {
    const dateString = date
      ? dayjs(date).format("YYYY/MM/D")
      : currentDate.format("YYYY/MM/D");
    birthDate.onChange(dateString);
    birthDateNumber.onChange(dayjs(dateString, "YYYY/MM/D").format("D"));
    birthDateMonth.onChange(dayjs(dateString, "YYYY/MM/D").format("MM"));
    birthDateYear.onChange(dayjs(dateString, "YYYY/MM/D").format("YYYY"));
    setInputValue(
      getMonthNumberAsText(dayjs(dateString, "YYYY/MM/D").format("MM"))
    );
  };

  const selectedDate = dayjs(
    `${birthDateYear.value}/${birthDateMonth.value}/${birthDateNumber.value}`,
    "YYYY/MM/D"
  ).toDate();

  const handleKeyDown = (e) => {
    if (
      (e.key === "Tab" || e.key === "ArrowRight" || e.key === "Enter") &&
      suggestions.length > 0
    ) {
      e.preventDefault();
      const completedMonth = suggestions[0];
      setInputValue(completedMonth);

      // Update the month and date
      const monthNumber = getMonthNumberFromText(completedMonth);
      if (monthNumber !== null) {
        const updatedDate = dayjs(birthDate.value || currentDate, "YYYY/MM/D")
          .month(monthNumber - 1)
          .format("YYYY/MM/D");
        birthDate.onChange(updatedDate);
        birthDateMonth.onChange(monthNumber.toString().padStart(2, "0"));
      }

      // Move the focus to the next input (birthDateYear)
      const yearInput = document.querySelector('input[name="birthDateYear"]');
      if (yearInput) {
        yearInput.focus();
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
              : "bg-[#F8F7F5]"
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
                let numericValue = e.target.value.replace(/\D/g, "");

                // Prevent the first character from being a 0
                if (numericValue.length === 1 && numericValue === "0") {
                  numericValue = "";
                } else if (
                  numericValue.length > 1 &&
                  numericValue.startsWith("0")
                ) {
                  numericValue = numericValue.slice(1);
                }

                // Get the current month and year
                const month = birthDateMonth.value;
                const year = birthDateYear.value;

                // Calculate the maximum number of days for the current month
                let maxDays = 31; // Value by default
                if (month && year) {
                  const daysInMonth = dayjs(
                    `${year}-${month}`,
                    "YYYY-MM"
                  ).daysInMonth();
                  maxDays = daysInMonth;
                }

                // Limit the value to the maximum number of days in the month
                if (numericValue.length > 0) {
                  const day = parseInt(numericValue.slice(0, 2), 10);
                  if (day > maxDays) {
                    numericValue = maxDays.toString(); // Force the maximum value
                  }
                }

                birthDateNumber.onChange(numericValue.slice(0, 2));

                // Validate and format the date
                const day = numericValue.slice(0, 2);
                if (day.length > 0 && month && year) {
                  const date = dayjs(
                    `${year}/${month}/${day}`,
                    "YYYY/MM/D",
                    true
                  );
                  if (date.isValid()) {
                    birthDate.onChange(date.format("YYYY/MM/D"));
                  }
                }
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

          <div className="flex-[65%] relative">
            <input
              ref={monthInputRef}
              className="w-full outline-none rounded-xl !p-0 text-center h-9 px-2 bg-white"
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                birthDateMonth.onBlur();
                birthDate.onBlur();
              }}
              name="birthDateMonth"
              value={inputValue}
              type="text"
              placeholder="Month"
            />
            
            {/* Invisible mirror span for typed text */}
            <span
              ref={monthMirrorRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 invisible whitespace-pre px-2 py-2 font-inherit text-base text-center"
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                letterSpacing: 'inherit',
                lineHeight: 'inherit'
              }}
            >
              {inputValue}
            </span>

            {/* Ghost suggestion - positioned right after typed text */}
            {suggestions.length > 0 && inputValue && (
              <span
                className="absolute text-primary-color-P7 pointer-events-none whitespace-pre text-center"
                style={{
                  top: '50%',
                  left: `calc(50% + ${textWidth / 2}px + 1px)`,
                  transform: 'translateY(-50%)',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  letterSpacing: 'inherit',
                  lineHeight: 'inherit',
                  height: 'inherit'
                }}
              >
                {suggestions[0].slice(inputValue.length)}
              </span>
            )}
          </div>

          <div className="flex-[45%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 h-9"
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                const yearValue = numericValue.slice(0, 4);
                birthDateYear.onChange(yearValue);
                
                // Only update the full date if we have a complete year (4 digits) and valid month/day
                if (yearValue.length === 4 && birthDateMonth.value && birthDateNumber.value) {
                  const newDate = dayjs(
                    `${yearValue}/${birthDateMonth.value}/${birthDateNumber.value}`,
                    "YYYY/MM/D"
                  );
                  if (newDate.isValid()) {
                    birthDate.onChange(newDate.format("YYYY/MM/D"));
                  }
                }
              }}
              onBlur={() => {
                birthDateYear.onBlur();
                birthDate.onBlur();
              }}
              value={birthDateYear.value || ""}
              name="birthDateYear"
              type="text"
              placeholder="YYYY"
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
