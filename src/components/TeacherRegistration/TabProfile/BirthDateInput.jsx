import { getMonthNumberFromText } from "@/src/lib/helpers/getMonthNumberFromText";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getMonthSuggestions } from "@/src/lib/helpers/getMonthSuggestions";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import { getDateYearsAgo } from "@/src/lib/utils/getDateYearsAgo";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

// React imports
import { useController } from "react-hook-form";
import { useEffect, useState } from "react";

// Icons
import {
  RightArrowMediumIcon,
  LeftArrowMediumIcon,
  CalendarBiggerIcon,
  BabyWalkerIcon,
  QuestionMark,
} from "../../Icons";

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
    defaultValue: currentDate.format("YYYY/MM/D"),
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
    if (birthDateMonth.value) {
      setInputValue(getMonthNumberAsText(birthDateMonth.value));
    }
  }, [birthDateMonth.value]);

  const handleInputChange = (value) => {
    // Regex para validar que todos los caracteres formen parte de los nombres de los meses
    const validCharacters = /^[JFMASONDjfmasond][a-zA-Z]*$/;

    // Permitir cadena vacía (para que el usuario pueda borrar el input)
    if (value === "" || validCharacters.test(value)) {
      setInputValue(value);
      const monthNumber = getMonthNumberFromText(value);
      if (monthNumber !== null) {
        const updatedDate = moment(birthDate.value || currentDate, "YYYY/MM/D")
          .month(monthNumber - 1)
          .format("YYYY/MM/D");
        birthDate.onChange(updatedDate);
        birthDateMonth.onChange(monthNumber.toString().padStart(2, "0"));
      }
      setSuggestions(getMonthSuggestions(value)); // Actualiza las sugerencias
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
  };

  const renderCustomHeader = ({
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    date,
  }) => {
    return (
      <div className="flex justify-between items-center gap-1.5 mb-1.5">
        {/* Group of arrows (Months) */}
        <div className="flex-[60%] flex justify-between items-center rounded-xl p-1.5 bg-primary-color-P12">
          <button type="button" onClick={decreaseMonth}>
            <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>

          <span className="fill-primary-color-P4 mx-1.5 ST-3">
            {date.toLocaleString("en-US", { month: "long" })}
          </span>

          <button type="button" onClick={increaseMonth}>
            <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>
        </div>

        {/* Group of arrows (Years) */}
        <div className="flex-1 flex justify-between items-center rounded-xl p-1.5 bg-primary-color-P12">
          <button type="button" onClick={decreaseYear}>
            <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>

          <span className="fill-primary-color-P4 mx-1.5 ST-3">
            {date.getFullYear()}
          </span>

          <button type="button" onClick={increaseYear}>
            <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="!mt-4 group">
      {/* label */}
      <span className="flex gap-1.5 ps-[5px] items-center MT-SB-1 mb-1 text-primary-color-P4">
        Birth date <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      {/* Inputs */}
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
          {/* Icon */}
          <div>
            <InputBGWrapperIcon>
              <BabyWalkerIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          </div>

          {/* Date */}
          <div className="flex-[30%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={birthDateNumber.value}
              name="birthDateNumber"
              type="text"
              readOnly
            />
          </div>

          {/* Month */}
          <div className="relative flex-[65%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 !px-8 h-9"
              onChange={(e) => handleInputChange(e.target.value)}
              name="birthDateMonth"
              value={inputValue}
              type="text"
            />

            {suggestions.length > 0 && (
              <span
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none text-gray-400"
                style={{ left: `${inputValue.length}ch` }} // Ajustar posición de la sugerencia
              >
                {suggestions[0].slice(inputValue.length)}
              </span>
            )}
          </div>

          {/* Year */}
          <div className="flex-[45%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={birthDateYear.value}
              name="birthDateYear"
              type="text"
              readOnly
            />
          </div>

          {/* Calendar Trigger Icon */}
          <div>
            <DatePicker
              renderCustomHeader={renderCustomHeader}
              onChange={handleDateChange}
              onBlur={birthDate.onBlur}
              showPopperArrow={false}
              value={birthDate.value}
              dateFormat="YYYY/MM/D"
              dropdownMode="select"
              calendarStartDay={1}
              selected={
                birthDate.value
                  ? moment(birthDate.value, "YYYY/MM/D").toDate()
                  : getDateYearsAgo(18)
              }
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
