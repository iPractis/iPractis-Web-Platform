import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";

// Nextui imports
import {
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";

// Icons
import { BabyWalkerIcon, CalendarBiggerIcon, QuestionMark } from "../../Icons";
import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";

const BirthDateInput = ({
  findInputErrorZod,
  setBirthDate,
  birthDate,
  errors,
}) => {
  return (
    <div className="!mt-3 group">
      <span className="flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
        Birth date <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div
            className={`flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 ${
              findInputErrorZod(errors, "birthDate")?.message
                ? "form-input-error"
                : "bg-primary-color-P11 group-hover:bg-secondary-color-S9"
            }`}
          >
            <InputBGWrapperIcon>
              <BabyWalkerIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>

            <div>
              <input
                className="input-ipractis w-[60px] text-center outline-none rounded-xl !p-0 pointer-events-none h-9"
                defaultValue={birthDate?.day}
                name="birthDateNumber"
                type="text"
                readOnly
              />
            </div>

            <div>
              <input
                className="input-ipractis w-[195px] text-center outline-none rounded-xl !p-0 pointer-events-none h-9"
                defaultValue={getMonthNumberAsText(birthDate?.month)}
                name="birthDateMonth"
                type="text"
                readOnly
              />
            </div>

            <div>
              <input
                className="input-ipractis w-[60px] text-center outline-none rounded-xl !p-0 pointer-events-none h-9"
                defaultValue={birthDate?.year}
                name="birthDateYear"
                type="text"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex-1">
          <Dropdown
            classNames={{
              content: "p-0",
            }}
            closeOnSelect={false}
          >
            <DropdownTrigger>
              <Button
                className="border-0 px-0 min-w-fit bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 rounded-2xl"
                variant="flat"
                type="button"
              >
                <CalendarBiggerIcon fillColor={"fill-primary-color-P4"} />
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              className="p-0 h-0"
              itemClasses={{
                base: "data-[hover=true]:bg-transparent",
              }}
            >
              <DropdownItem className="p-0">
                <Calendar
                  onChange={setBirthDate}
                  value={birthDate}
                  disableAnimation
                />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <ErrorZodResponse errors={errors} fieldName={"birthDate"} />
    </div>
  );
};

export default BirthDateInput;
