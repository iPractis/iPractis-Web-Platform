import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

// React imports
import { useState } from "react";

// Icons
import { BabyWalkerIcon, CalendarBiggerIcon, QuestionMark } from "../../Icons";

const BirthDateInput = ({}) => {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <div className="!mt-4 group">
      {/* label */}
      <span className="flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
        Birth date <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      {/* Inputs */}
      <div
        className={`flex justify-between gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9`}
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
            name="birthDateNumber"
            type="text"
            readOnly
          />
        </div>

        {/* Month */}
        <div>
          <input
            className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
            name="birthDateMonth"
            type="text"
            readOnly
          />
        </div>

        {/* Year */}
        <div>
          <input
            className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
            name="birthDateYear"
            type="text"
            readOnly
          />
        </div>

        {/* Calendar Trigger Icon */}
        <div className="relative">
          <button
            className="p-1.5 rounded-[10px] bg-primary-color-P12"
            onClick={() => setFocused(true)}
            type="button"
          >
            <CalendarBiggerIcon fillColor={"fill-primary-color-P4"} />
          </button>

          <div className="absolute">
            <SingleDatePicker
              onFocusChange={({ focused }) => setFocused(focused)}
              onDateChange={(date) => setDate(date)}
              isOutsideRange={() => false}
              hideKeyboardShortcutsPanel
              displayFormat="DD/MM/YYYY"
              focused={focused}
              numberOfMonths={1}
              id="birthDate"
              date={date}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthDateInput;
