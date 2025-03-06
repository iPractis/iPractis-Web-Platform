import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
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

// Icons
import {
  RightArrowMediumIcon,
  LeftArrowMediumIcon,
  CalendarBiggerIcon,
  BabyWalkerIcon,
  QuestionMark,
} from "../../Icons";

const BirthDateInput = ({ errors, control }) => {
  const {
    field: birthDate,
    fieldState: { error: birthDateError },
  } = useController({
    name: "birthDate",
    control: control,
  });

  const handleDateChange = (date) => {
    const dateString = date ? moment(date).format("D/MM/YYYY") : null;
    birthDate.onChange(dateString);
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
              value={
                birthDate.value
                  ? moment(birthDate.value, "D/MM/YYYY").format("D")
                  : ""
              }
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
                birthDate.value
                  ? getMonthNumberAsText(
                      moment(birthDate.value, "D/MM/YYYY").format("MM")
                    )
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
              value={
                birthDate.value
                  ? moment(birthDate.value, "D/MM/YYYY").format("YYYY")
                  : ""
              }
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
              showPopperArrow={false}
              dateFormat="D/MM/YYYY"
              dropdownMode="select"
              selected={
                birthDate.value
                  ? moment(birthDate.value, "D/MM/YYYY").toDate()
                  : getDateYearsAgo(18)
              }
              calendarStartDay={1}
              showMonthDropdown
              showYearDropdown
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
