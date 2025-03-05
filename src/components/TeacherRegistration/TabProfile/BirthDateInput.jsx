import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

// React imports
import { useController } from "react-hook-form";
import { useState } from "react";

// Icons
import { BabyWalkerIcon, CalendarBiggerIcon, QuestionMark } from "../../Icons";

const BirthDateInput = ({ errors, control }) => {
  const [focused, setFocused] = useState(false);

  const {
    field: birthDate,
    fieldState: { error: birthDateError },
  } = useController({
    name: "birthDate",
    control: control,
  });

  const handleDateChange = (date) => {
    const dateString = date ? moment(date).format("DD/MM/YYYY") : null;
    birthDate.onChange(dateString);
  };

  const dateValue = birthDate.value
    ? moment(birthDate.value, "DD/MM/YYYY").toDate()
    : null;

  // Renderizar un header personalizado
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Botón para retroceder al mes anterior */}
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ◄
        </button>

        {/* Mostrar el mes actual */}
        <span style={{ fontWeight: "bold", margin: "0 10px" }}>
          {date.toLocaleString("default", { month: "long" })}
        </span>

        {/* Mostrar el año actual */}
        <span style={{ fontWeight: "bold" }}>{date.getFullYear()}</span>

        {/* Botón para avanzar al siguiente mes */}
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ►
        </button>
      </div>
    );
  };

  return (
    <div className="!mt-4 group">
      {/* label */}
      <span className="flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
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
          <div>
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={dateValue ? moment(dateValue).format("D") : ""}
              name="birthDateNumber"
              type="text"
              readOnly
            />
          </div>

          {/* Month */}
          <div>
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={
                dateValue
                  ? getMonthNumberAsText(moment(dateValue).format("MM"))
                  : ""
              }
              name="birthDateMonth"
              type="text"
              readOnly
            />
          </div>

          {/* Year */}
          <div>
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={dateValue ? moment(dateValue).format("YYYY") : ""}
              name="birthDateYear"
              type="text"
              readOnly
            />
          </div>

          {/* Calendar Trigger Icon */}
          <div>
            <DatePicker
              onFocusChange={({ focused }) => setFocused(focused)}
              onCalendarClose={() => setFocused(false)}
              renderCustomHeader={renderCustomHeader}
              onCalendarOpen={() => setFocused(true)}
              onChange={handleDateChange}
              dateFormat="d/MM/yyyy"
              dropdownMode="select"
              selected={dateValue}
              showMonthDropdown
              showYearDropdown
              open={focused}
              customInput={
                <button
                  className="p-1.5 rounded-[10px] bg-primary-color-P12"
                  onClick={() => setFocused(true)}
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
