import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";

// Nextui imports
import {
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";

// React imports
import { useState } from "react";

// Icons
import { BabyWalkerIcon, CalendarBiggerIcon, QuestionMark } from "../../Icons";

const BirthDateInput = () => {
  const [birthDate, setBirthDate] = useState("");

  return (
    <div className="!mt-3 group">
      <span className=" flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
        Birth date <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9">
          <InputBGWrapperIcon>
            <BabyWalkerIcon fillColor={"fill-primary-color-P4"} />
          </InputBGWrapperIcon>

          <input
            type="text"
            className="input-ipractis text-center outline-none rounded-xl !p-0 pointer-events-none w-[60px] h-9"
            readOnly
            name="birthDateNumber"
            value={birthDate?.day || ""}
          />

          <input
            type="text"
            className="input-ipractis text-center outline-none rounded-xl !p-0 pointer-events-none w-[188px] h-9"
            readOnly
            value={getMonthNumberAsText(birthDate?.month) || ""}
            name="birthDateMonth"
          />

          <input
            type="text"
            className="input-ipractis text-center outline-none rounded-xl !p-0 pointer-events-none w-[60px] h-9"
            readOnly
            value={birthDate?.year || ""}
            name="birthDateYear"
          />
        </div>

        <Dropdown
          classNames={{
            content: "p-0",
          }}
          closeOnSelect={false}
        >
          <DropdownTrigger>
            <Button
              className="border-0 min-w-fit bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 rounded-2xl"
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
  );
};

export default BirthDateInput;
