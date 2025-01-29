import {
  columnsHeaderWorkSchedule,
  rowsWorkSchedule,
  timeZones,
} from "@/src/data/dataTeacherRegistration";

import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import InputBGWrapperIcon from "./InputBGWrapperIcon";

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

import { useEffect, useState } from "react";

const WorkScheduleTable = ({
  bookedLessonSpot,
  timeZoneFilter,
  showCurrentDate,
  fromToFilter,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("Etc/GMT+12");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentDay, setCurrentDay] = useState("");
  const [weekDates, setWeekDates] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get actual date
    const today = new Date();

    // Get day of week (0 - sunday, 1 - monday, ..., 6 - saturday)
    const currentDay = today.getDay();

    // Calculate the difference of days up to the first day of the week (Monday, for example)
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay; // if it's sunday, we go back 6 days

    // Calculate the date of the first day of the week (Monday)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() + daysToMonday);

    // Create an array of 7 consecutive dates (Monday, Tuesday, ..., Sunday)
    const generatedWeekDates = Array.from({ length: 7 }, (_, index) => {
      const newDate = new Date(firstDayOfWeek);
      newDate.setDate(firstDayOfWeek.getDate() + index);
      return newDate;
    });

    setWeekDates(generatedWeekDates);
  }, []);

  // This is the main logic of the calendar, the goal of this func is to update the week dates by the timezone of the calendar!
  const updateWeekDates = (selectedTimeZone) => {
    const adjustedWeekDates = weekDates.map((date) => {
      const options = {
        timeZone: selectedTimeZone,
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      const dateString = date.toLocaleString("en-US", options);
      return new Date(dateString);
    });

    setWeekDates(adjustedWeekDates);

    setMinDate({
      actualDate: adjustedWeekDates[0].getDate(),
      actualYear: adjustedWeekDates[0].getFullYear(),
      actualMonth: adjustedWeekDates[0].getMonth(),
    });

    setMaxDate({
      actualDate: adjustedWeekDates[6].getDate(),
      actualYear: adjustedWeekDates[6].getFullYear(),
      actualMonth: adjustedWeekDates[6].getMonth(),
    });

    setCurrentDay(
      adjustedWeekDates[0].toLocaleDateString("en-US", { weekday: "short" })
    );

    // Si necesitas imprimir la fecha ajustada en el log, puedes hacerlo aquí:
    console.log(
      `Fechas de la semana ajustadas a la zona ${selectedTimeZone}:`,
      adjustedWeekDates
    );
  };

  // Once we change the timezone in select, we update the changes to updateWeekDates (Because time changes depending on Timezone)
  const handleTimeZoneChange = (e) => {
    const selectedTimezone = e.target.value;

    setSelectedTimeZone(selectedTimezone);

    updateWeekDates(selectedTimezone, currentOffset);

    const date = new Date();

    const options = {
      timeZone: selectedTimezone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const timeInSelectedTimezone = new Intl.DateTimeFormat(
      "en-US",
      options
    ).format(date);
    console.log(
      `Fecha y hora seleccionada (${selectedTimezone}):`,
      timeInSelectedTimezone
    );
  };

  // We get DAY selected (Sa, Su, Mo, Tu, We, Th, Fr) and HOUR (0 to 23)
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
      updateWeekDates(selectedTimeZone, newOffset);
      return newOffset;
    });
  };

  // This is for incrementing days of a month (+ 7)
  const handleIncrementWeek = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset + 7;
      updateWeekDates(selectedTimeZone, newOffset);
      return newOffset;
    });
  };

  return (
    <>
      {/* FILTER TO AND FROM! E.G = January 1th to 7th and viceversa! */}
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
              <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-SB-3 h-5 w-[27.50px] mx-auto">
                {index}
              </div>
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {columnsHeaderWorkSchedule.map((column, rowIndex) => (
            <TableRow key={column.key}>
              <TableCell className="!p-0 !pb-0.5 !pe-1.5">
                <div
                  className={`flex gap-0.5 items-center ${
                    currentDay === column.key
                      ? "w-[60px] bg-tertiary-color-SC5 ps-2 p-1 text-primary-color-P12 rounded-lg"
                      : "ps-2 p-1"
                  }`}
                >
                  <div
                    className={`${
                      currentDay === column.key
                        ? "text-primary-color-P12"
                        : "text-primary-color-P1"
                    } ST-SB-3 w-[22px]`}
                  >
                    {column.label}
                  </div>

                  <div
                    className={`${
                      currentDay === column.key
                        ? "bg-primary-color-P12 text-tertiary-color-SC5"
                        : "bg-primary-color-P1 text-primary-color-P12"
                    } h-5 w-[24px] rounded-md flex justify-center items-center`}
                  >
                    <p className="ST-4">
                      {showCurrentDate ? weekDates[rowIndex] ? weekDates[rowIndex]?.toLocaleDateString()?.split('/')[0] : "--" : "X"}
                    </p>
                  </div>
                </div>
              </TableCell>

              {Array.from({ length: 24 }, (_, hourIndex) => (
                <TableCell
                  className={`${
                    currentDay === column.key
                      ? "bg-tertiary-color-SC5 [&:nth-child(2)]:rounded-s-lg  last:rounded-r-lg h-7 !w-[27.50px] !p-1 !px-0.5"
                      : "!p-0 !pb-0.5"
                  }`}
                  key={`${column.key}-${hourIndex}`}
                >
                  <button
                    className={`${
                      isSelected(hourIndex, column.label)
                        ? "bg-quinary-color-VS10"
                        : "bg-primary-color-P11"
                    } flex justify-center items-center rounded-md ST-4 h-5 w-[27.50px] mx-auto`}
                    onClick={() => handleGetDayAndHour(hourIndex, column.label)}
                    type="button"
                  ></button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* THIS IS FOR RESPONSIVE SCREENS - 768px to bottom
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
      </Table> */}

      {/* Spots - booked, available, unavailable and also timezone filter */}
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
              value={selectedTimeZone}
              onChange={handleTimeZoneChange}
              defaultSelectedKeys={["Etc/GMT+12"]}
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
              {timeZones?.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkScheduleTable;
