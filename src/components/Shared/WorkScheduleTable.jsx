import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import InputBGWrapperIcon from "./InputBGWrapperIcon";
import {
  columnsHeaderWorkSchedule,
  timeZones,
} from "@/src/data/dataTeacherRegistration";

// External imports
import { Select, SelectItem } from "@nextui-org/react";
import { useFieldArray } from "react-hook-form";

// Icons
import {
  ChevronDownBigIcon,
  ChevronLeftBigIcon,
  ChevronRightMediumIcon,
  EarthIcon,
} from "../Icons";

// React imports
import { useEffect, useState } from "react";

const WorkScheduleTable = ({
  showCurrentActiveDay = true,
  setDailyWorkTimeLimit,
  wrapperClassName,
  bookedLessonSpot,
  timeZoneFilter,
  fromToFilter,
  control,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/Chicago");
  const [is12HourFormat, setIs12HourFormat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [startCell, setStartCell] = useState(null);
  const [weekDates, setWeekDates] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // We use "useFieldArray" to manage the selected slots
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "workSchedule",
  });

  // All that happen in this useEffect are the DEFAULT VALUES for the calendar
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

    // Calculate the date of the last day of the week (Sunday)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    // Helper function to format a date object into an object with actualDate, actualMonth, and actualYear
    const formatDateObject = (date) => {
      return {
        actualDate: date.getDate(),
        actualMonth: date.getMonth(),
        actualYear: date.getFullYear(),
      };
    };

    // Format the first and last day of the week
    const formattedMinDate = formatDateObject(firstDayOfWeek);
    const formattedMaxDate = formatDateObject(lastDayOfWeek);

    // Create an array of 7 consecutive dates (Monday, Tuesday, ..., Sunday)
    const generatedWeekDates = Array.from({ length: 7 }, (_, index) => {
      const newDate = new Date(firstDayOfWeek);
      newDate.setDate(firstDayOfWeek.getDate() + index);
      return newDate;
    });

    // Set the generated week dates
    setWeekDates(generatedWeekDates);

    // Update the state of minDate and maxDate with the formatted objects
    setMinDate(formattedMinDate);
    setMaxDate(formattedMaxDate);

    // Set the current day of the week
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date().toLocaleDateString("en-US", {
      timeZone: userTimeZone,
    });
    setCurrentDay(new Date(now).getDate());
  }, []);

  useEffect(() => {
    setDailyWorkTimeLimit(fields);
  }, [fields, setDailyWorkTimeLimit]);

  // This is the main logic of the calendar, the goal of this func is to update the week dates by the timezone of the calendar!
  const updateWeekDates = (selectedTimeZone) => {
    const adjustedWeekDates = weekDates?.map((date) => {
      // Convert the date to the selected time zone
      const options = {
        timeZone: selectedTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      // Correctly break down the date to reconstruct it in the correct time zone
      const [month, day, year] = formattedDate.split("/");
      return new Date(`${year}-${month}-${day}T00:00:00`);
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

    // 🟢 Here we also adjust the current date according to the time zone
    const today = new Date();
    const options = {
      timeZone: selectedTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedToday = new Intl.DateTimeFormat("en-US", options).format(
      today
    );

    const [month, day, year] = formattedToday.split("/");
    const correctedDate = new Date(`${year}-${month}-${day}T00:00:00`);

    setCurrentDay(correctedDate.getDate());
  };

  // Once we change the timezone in select, we update the changes to updateWeekDates (Because time changes depending on Timezone)
  const handleTimeZoneChange = (e) => {
    const selectedTimezone = e.target.value;
    setSelectedTimeZone(selectedTimezone);
    updateWeekDates(selectedTimezone);
  };

  // Function to handle the selection of day and hour
  const handleGetDayAndHour = (hour, day, isSecondButton = false) => {
    const selectedTime = isSecondButton ? `${hour + 1}:00` : `${hour}:30`;

    const existingIndex = fields.findIndex((slot) => slot.day === day);

    if (existingIndex !== -1) {
      const existingHours = [...fields[existingIndex].hour];
      const hasSelected = existingHours.includes(selectedTime);

      let updatedHours = [...existingHours];

      if (hasSelected) {
        updatedHours = updatedHours.filter((h) => h !== selectedTime);
      } else {
        updatedHours.push(selectedTime);

        // Sort the hours after adding a new one
        updatedHours.sort((a, b) => {
          const [aHour, aMin] = a.split(":").map(Number);
          const [bHour, bMin] = b.split(":").map(Number);
          return aHour - bHour || aMin - bMin;
        });
      }

      if (updatedHours.length > 0) {
        update(existingIndex, { day, hour: updatedHours });
      } else {
        remove(existingIndex);
      }
    } else {
      // If the day does not exist, we add it with the selected hour (already sorted)
      append({ day, hour: [selectedTime] });
    }
  };

  // Checks if a specific time is selected
  const isSelected = (hour, day, isSecondButton = false) => {
    const timeToCheck = isSecondButton ? `${hour + 1}:00` : `${hour}:30`;

    const daySlot = fields.find((slot) => slot.day === day);
    if (!daySlot) return false;

    return daySlot.hour.includes(timeToCheck);
  };

  // This is for decrementing days of a month (- 7)
  const handleDecrementWeek = () => {
    setWeekDates((prevDates) =>
      prevDates?.map((date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      })
    );

    setMinDate((prevMin) => {
      const newDate = new Date(
        prevMin.actualYear,
        prevMin.actualMonth,
        prevMin.actualDate - 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });

    setMaxDate((prevMax) => {
      const newDate = new Date(
        prevMax.actualYear,
        prevMax.actualMonth,
        prevMax.actualDate - 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });
  };

  // This is for incrementing days of a month (+ 7)
  const handleIncrementWeek = () => {
    setWeekDates((prevDates) =>
      prevDates?.map((date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      })
    );

    setMinDate((prevMin) => {
      const newDate = new Date(
        prevMin.actualYear,
        prevMin.actualMonth,
        prevMin.actualDate + 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });

    setMaxDate((prevMax) => {
      const newDate = new Date(
        prevMax.actualYear,
        prevMax.actualMonth,
        prevMax.actualDate + 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });
  };

  // Function to toggle between 12h and 24h
  const handleChangeHoursDisplayed = () => {
    setIs12HourFormat(!is12HourFormat);
  };

  // Format hour (12H or 24H format)
  const formatHour = (hour) => {
    // Keep 0-23 if it's 24h format
    if (!is12HourFormat) return hour;

    // Convert 1-12 using modulo if it's 12h format
    return (hour % 12) + 1;
  };

  // Only acts if the click is pressed AND it is a different cell from the initial one
  const handleMouseEnter = (hour, day, isSecondButton) => {
    if (isDragging && startCell) {
      handleGetDayAndHour(hour, day, isSecondButton);
    }
  };

  // Handles mouse-up events to stop the drag selection and resets dragging state and clears the starting cell
  const handleMouseUp = () => {
    setIsDragging(false);
    setStartCell(null);
  };

  // Sets dragging state, stores the starting cell, and immediately selects the initial cell.
  const handleMouseDown = (hour, day, isSecondButton) => {
    setIsDragging(true);
    setStartCell({ hour, day, isSecondButton });

    // Selects the initial cell inmediately
    handleGetDayAndHour(hour, day, isSecondButton);
  };

  // If users clicks on HOURS of the day (0-23 or 1-12)
  const handleHourClick = (hour) => {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const time1 = `${hour}:30`;
    const time2 = `${hour + 1}:00`;

    // Check if ALL days already have the selected hours
    const allSelected = days.every((day) => {
      const daySlot = fields.find((slot) => slot.day === day);
      return (
        daySlot && daySlot.hour.includes(time1) && daySlot.hour.includes(time2)
      );
    });

    // Check if SOME days already have the selected hours (but not all)
    const someSelected = days.some((day) => {
      const daySlot = fields.find((slot) => slot.day === day);
      return (
        daySlot &&
        (daySlot.hour.includes(time1) || daySlot.hour.includes(time2))
      );
    });

    if (allSelected) {
      // If all are selected, deselect all (original behavior)
      const toRemove = [];
      const toUpdate = [];

      fields.forEach((slot, index) => {
        if (days.includes(slot.day)) {
          const updatedHours = slot.hour.filter(
            (h) => !(h === time1 || h === time2)
          );
          if (updatedHours.length > 0) {
            toUpdate.push({
              index,
              updatedSlot: { day: slot.day, hour: updatedHours },
            });
          } else {
            toRemove.push(index);
          }
        }
      });

      toRemove
        .sort((a, b) => b - a)
        .forEach((index) => {
          remove(index);
        });

      toUpdate.forEach((item) => {
        if (item.index < fields.length) {
          update(item.index, item.updatedSlot);
        }
      });
    } else {
      // If some or none are selected, we select ALL the days
      days.forEach((day) => {
        const existingIndex = fields.findIndex((slot) => slot.day === day);

        if (existingIndex !== -1) {
          const existingHours = [...fields[existingIndex].hour];
          const hasTime1 = existingHours.includes(time1);
          const hasTime2 = existingHours.includes(time2);
          let updatedHours = [...existingHours];

          if (!hasTime1) updatedHours.push(time1);
          if (!hasTime2) updatedHours.push(time2);

          // We order the hours
          updatedHours.sort((a, b) => {
            const [aHour, aMin] = a.split(":").map(Number);
            const [bHour, bMin] = b.split(":").map(Number);
            return aHour - bHour || aMin - bMin;
          });

          update(existingIndex, { day, hour: updatedHours });
        } else {
          append({ day, hour: [time1, time2] });
        }
      });
    }
  };

  return (
    <section className={wrapperClassName}>
      {/* FILTER TO AND FROM! E.G = January 1th to 7th and viceversa! */}
      {fromToFilter && (
        <div className="flex items-center justify-center gap-8 mb-4">
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

      {/* Calendar */}
      <main className="flex flex-row gap-3 max-w-[1000px] mx-auto w-full">
        {/* Left column - time slots */}
        <div className="flex flex-col gap-3 min-w-[110px] flex-shrink-0">
          {/* Format button placeholder to align with day headers */}
          <div className="h-[40px] flex items-center">
            <button
              className="bg-black text-white text-center rounded-md ST-SB-3 px-4 py-2 w-[110px] h-[40px] flex items-center justify-center"
              onClick={handleChangeHoursDisplayed}
              type="button"
            >
              Format
            </button>
          </div>

          {/* Time slots column */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 24 }, (_, index) => {
              const displayTime = index < 10 ? `0${index}:00` : `${index}:00`;
              
              return (
                <div
                  className="bg-[#f8f7f5] text-black rounded-[10px] w-[110px] h-[40px] flex items-center justify-center px-3"
                  key={`hour-${index}`}
                >
                  <span className="ST-3 font-bold">{displayTime}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar grid */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {/* Days header row */}
          <div className="flex flex-row gap-3 items-center">
            {columnsHeaderWorkSchedule.map((column, rowIndex) => {
              const columnDate = weekDates[rowIndex];
              const isToday =
                columnDate instanceof Date &&
                !isNaN(columnDate) &&
                columnDate.getDate() === currentDay &&
                columnDate.getMonth() === new Date().getMonth() &&
                columnDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  className={`text-black rounded-md text-center p-2 min-w-[100px] w-full h-[40px] flex items-center justify-center ${
                    showCurrentActiveDay && isToday
                      ? "bg-tertiary-color-SC5"
                      : "bg-[#f8f7f5]"
                  }`}
                  key={column.key}
                >
                  <h3 className="ST-3">{column.label}</h3>
                </div>
              );
            })}
          </div>

          {/* Calendar grid rows */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 24 }, (_, hourIndex) => (
              <div className="flex flex-row gap-3" key={`hour-row-${hourIndex}`}>
                {columnsHeaderWorkSchedule.map((column, dayIndex) => {
                  const columnDate = weekDates[dayIndex];
                  const isToday =
                    columnDate instanceof Date &&
                    !isNaN(columnDate) &&
                    columnDate.getDate() === currentDay &&
                    columnDate.getMonth() === new Date().getMonth() &&
                    columnDate.getFullYear() === new Date().getFullYear();

                  return (
                    <div
                      className={`flex-1 h-[40px] rounded-md bg-[#f8f7f5] hover:bg-secondary-color-S9 transition-colors ${
                        showCurrentActiveDay &&
                        isToday &&
                        "bg-tertiary-color-SC5"
                      }`}
                      key={`${column.key}-${hourIndex}`}
                    >
                      <button
                        className={`${
                          isSelected(hourIndex, column.key, false)
                            ? "bg-quinary-color-VS10"
                            : "bg-[#f8f7f5]"
                        } w-full h-full rounded-md cursor-pointer`}
                        onMouseDown={() =>
                          handleMouseDown(hourIndex, column.key, false)
                        }
                        onMouseEnter={() =>
                          handleMouseEnter(hourIndex, column.key, false)
                        }
                        onMouseUp={handleMouseUp}
                        type="button"
                      ></button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Spots - booked, available, unavailable and also timezone filter */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-4">
          {bookedLessonSpot && (
            <div className="flex items-center gap-2.5">
              <div className="h-[18px] w-[18px] bg-quaternary-color-A10 rounded-md"></div>
              <h3 className="ST-3 text-primary-color-P1">Booked lesson</h3>
            </div>
          )}
        </div>

        <div>
          {timeZoneFilter && (
            <Select
              value={selectedTimeZone}
              onChange={handleTimeZoneChange}
              defaultSelectedKeys={["America/Chicago"]}
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
    </section>
  );
};

export default WorkScheduleTable;
