import {
  columnsHeaderWorkSchedule,
  rowsWorkSchedule,
  timeZones,
} from "@/src/data/dataTeacherRegistration";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
} from "@nextui-org/react";

import {
  ChevronDownBigIcon,
  ChevronLeftBigIcon,
  ChevronRightMediumIcon,
  EarthIcon,
} from "../Icons";
import InputBGWrapperIcon from "./InputBGWrapperIcon";
import { useEffect, useState } from "react";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";

const WorkScheduleTable = ({
  bookedLessonSpot,
  timeZoneFilter,
  showCurrentDate,
  fromToFilter,
}) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [weekDates, setWeekDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const defaultTimeZone = "GMT+00:00";
    updateWeekDates(defaultTimeZone, 0);
  }, []);

  const updateWeekDates = (selectedTimeZone, offsetDays) => {
    const offset = parseFloat(
      selectedTimeZone.replace("GMT", "").replace(":", ".")
    );

    const localDate = new Date();
    const adjustedDate = new Date(localDate.getTime() + offset * 3600000);

    const weekDatesArray = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(adjustedDate);
      date.setDate(adjustedDate.getDate() + index + offsetDays);
      return date;
    });

    setWeekDates(
      weekDatesArray.map((date) =>
        date.toLocaleDateString("en-US", {
          day: "numeric",
        })
      )
    );

    setMinDate({
      actualDate: weekDatesArray[0].getDate(),
      actualYear: weekDatesArray[0].getFullYear(),
      actualMonth: weekDatesArray[0].getMonth(),
    });

    setMaxDate({
      actualDate: weekDatesArray[6].getDate(),
      actualYear: weekDatesArray[6].getFullYear(),
      actualMonth: weekDatesArray[6].getMonth(),
    });
  };

  const handleTimeZoneChange = (e) => {
    const selectedTimeZone = e.target.value;
    updateWeekDates(selectedTimeZone, currentOffset);
  };

  const handleGetDayAndHour = (hour, day) => {
    const slotDetails = {
      hour: hour,
      day: day,
    };

    setSelectedSlots((prevSlots) => {
      // If hour and day already exist in the array, remove it
      if (prevSlots.some((slot) => slot.hour === hour && slot.day === day)) {
        return prevSlots.filter(
          (slot) => !(slot.hour === hour && slot.day === day)
        );
      }

      // If hour and day doesn't exist in the array, add it
      return [...prevSlots, slotDetails];
    });
  };

  // This is if a slot of calendar is selected (returns true or false)
  const isSelected = (hour, day) => {
    return selectedSlots.some((slot) => slot.hour === hour && slot.day === day);
  };

  // This is for decrementing days of a month (- 7)
  const handleDecrementWeek = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset - 7;
      updateWeekDates("GMT+00:00", newOffset);
      return newOffset;
    });
  };

  // This is for incrementing days of a month (+ 7)
  const handleIncrementWeek = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset + 7;
      updateWeekDates("GMT+00:00", newOffset);
      return newOffset;
    });
  };

  return (
    <>
      {fromToFilter && (
        <div className="flex items-center justify-center gap-8 px-5 mb-4">
          <button onClick={handleDecrementWeek} type="button">
            <ChevronLeftBigIcon fillColor={"fill-primary-color-P1"} />
          </button>

          <h3 className="text-primary-color-P1 ST-4">From</h3>

          <div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9 w-[284px]">
            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-2 !py-1.5 w-[48px] h-9"
              defaultValue={minDate?.actualDate}
              name="birthDateNumber"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[141px] h-9"
              defaultValue={getMonthNumberAsText(minDate?.actualMonth + 1)}
              name="birthDateMonth"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
              defaultValue={minDate?.actualYear}
              name="birthDateYear"
              readOnly
            />
          </div>

          <h3 className="text-primary-color-P1 ST-4">To</h3>

          <div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9 w-[284px]">
            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[52px] h-9"
              name="birthDateNumber"
              defaultValue={maxDate?.actualDate}
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[137px] h-9"
              defaultValue={getMonthNumberAsText(maxDate?.actualMonth + 1)}
              name="birthDateMonth"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
              name="birthDateYear"
              defaultValue={maxDate?.actualYear}
              readOnly
            />
          </div>

          <button onClick={handleIncrementWeek} type="button">
            <ChevronRightMediumIcon fillColor={"fill-primary-color-P1"} />
          </button>
        </div>
      )}

      {/* THIS IS FOR DESKTOP SCREENS - 768px to up */}
      <Table
        className="md:block hidden"
        classNames={{
          th: "bg-transparent !bg-none p-0",
        }}
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="!h-0 w-[27.50px]" key="empty-column">
            <div className="h-6 w-[27.50px]"></div>
          </TableColumn>

          {Array.from({ length: 24 }, (_, index) => (
            <TableColumn className="!h-0 w-[27.50px]" key={`hour-${index}`}>
              <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-SB-3 h-5 w-[27.50px]">
                {index}
              </div>
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {columnsHeaderWorkSchedule.map((column, rowIndex) => (
            <TableRow key={column.key}>
              <TableCell className="!p-0 !pb-0.5">
                <div
                  className={`flex gap-0.5 items-center ${
                    false
                      ? "w-[60px] bg-tertiary-color-SC5 ps-2 p-1 text-primary-color-P12 rounded-lg"
                      : "ps-2 p-1"
                  }`}
                >
                  <div
                    className={`${
                      false ? "text-primary-color-P12" : "text-primary-color-P1"
                    } ST-SB-3 w-[22px]`}
                  >
                    {column.label}
                  </div>

                  <div
                    className={`${
                      false
                        ? "bg-primary-color-P12 text-tertiary-color-SC5"
                        : "bg-primary-color-P1 text-primary-color-P12"
                    } h-5 w-[24px] rounded-md flex justify-center items-center`}
                  >
                    <p className="ST-4">
                      {showCurrentDate ? weekDates[rowIndex] || "--" : "X"}
                    </p>
                  </div>
                </div>
              </TableCell>

              {Array.from({ length: 24 }, (_, hourIndex) => (
                <TableCell
                  className={`!p-0 !pb-0.5`}
                  key={`${column.key}-${hourIndex}`}
                >
                  <button
                    className={`${
                      isSelected(hourIndex, column.label)
                        ? "bg-quinary-color-VS10"
                        : "bg-primary-color-P11"
                    } flex justify-center items-center rounded-md ST-4 h-5 w-[27.50px]`}
                    onClick={() => handleGetDayAndHour(hourIndex, column.label)}
                    type="button"
                  ></button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* THIS IS FOR RESPONSIVE SCREENS - 768px to bottom */}
      <Table
        className="md:hidden block"
        classNames={{
          th: "bg-transparent !bg-none p-0",
        }}
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="pr-1.5 w-[24.5px]" key="custom-column">
            <div className="bg-primary-color-P12 ST-SB-3 h-6 w-full">
              <p></p>
            </div>

            <div className="bg-primary-color-P12 ST-SB-3 h-6 w-full mt-1.5">
              <p></p>
            </div>
          </TableColumn>

          {columnsHeaderWorkSchedule.map((column, index) => (
            <TableColumn className="h-auto mt-auto w-[24.5px]" key={column.key}>
              <div className="bg-primary-color-P12 text-primary-color-P1 text-center rounded-lg h-full w-[24.5px]">
                <div className="ST-SB-3 !px-0">{column.label}</div>

                <div className="bg-primary-color-P1 rounded-md flex justify-center items-center mt-0.5 h-5">
                  <p className="text-primary-color-P12 ST-4">
                    {showCurrentDate ? weekDates[index] || "--" : "X"}
                  </p>
                </div>
              </div>
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {rowsWorkSchedule.map((row) => (
            <TableRow key={row.hour}>
              <TableCell className="p-0 w-[24.5px] pr-1.5 pb-1.5">
                <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[24.5px]">
                  {row?.hour}
                </div>
              </TableCell>

              {columnsHeaderWorkSchedule.map((column) => (
                <TableCell
                  className="p-0 w-[24.5px] pr-1.5 pb-1.5"
                  key={column?.key}
                >
                  <button
                    className={`${
                      isSelected(row?.hour, column?.label)
                        ? "bg-quinary-color-VS10"
                        : "bg-primary-color-P11"
                    } text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[24.5px]`}
                    onClick={() =>
                      handleGetDayAndHour(row?.hour, column?.label)
                    }
                    type="button"
                  >
                    {column?.slot}
                  </button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Spots */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-4">
          {bookedLessonSpot && (
            <div className="flex items-center gap-2.5">
              <div className="h-[18px] w-[18px] bg-quaternary-color-A10 rounded-md"></div>
              <h3 className="ST-3 text-primary-color-P1">Booked lesson</h3>
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <div className="h-[18px] w-[18px] bg-quinary-color-VS10 rounded-md"></div>
            <h3 className="ST-3 text-primary-color-P1">Available for lesson</h3>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-[18px] w-[18px] bg-primary-color-P11 rounded-md"></div>
            <h3 className="ST-3 text-primary-color-P1">Unavailable</h3>
          </div>
        </div>

        <div>
          {timeZoneFilter && (
            <Select
              defaultSelectedKeys={["GMT+00:00"]}
              onChange={handleTimeZoneChange}
              name="timeZoneCalendar"
              onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
              placeholder="Select a time zone"
              selectorIcon={<span></span>}
              isOpen={isOpen}
              startContent={
                <InputBGWrapperIcon>
                  <EarthIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                trigger: ["select-wrapper-ipractis"],
                innerWrapper: ["select-ipractis", "w-full"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
              }}
            >
              {timeZones?.map((timeZone) => (
                <SelectItem key={timeZone}>{timeZone}</SelectItem>
              ))}
            </Select>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkScheduleTable;
