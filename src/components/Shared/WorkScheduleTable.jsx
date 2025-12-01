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
import { useEffect, useState, useCallback, useRef } from "react";

// Constants for day handling - defined outside component to prevent recreation on every render
const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const getDayIndex = (dayKey) => DAY_ORDER.indexOf(dayKey);

const WorkScheduleTable = ({
  showCurrentActiveDay = true,
  setDailyWorkTimeLimit,
  wrapperClassName,
  bookedLessonSpot,
  timeZoneFilter,
  fromToFilter,
  control,
  defaultTimeZone,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    defaultTimeZone || "America/Chicago" // ✅ use draft timezone if available
  );
  const [is12HourFormat, setIs12HourFormat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [startCell, setStartCell] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [selectionMode, setSelectionMode] = useState('select'); // 'select' or 'erase'

  // Refs for frequently changing state to avoid useCallback dependency issues
  const startCellRef = useRef(startCell);
  const selectionEndRef = useRef(selectionEnd);
  const selectionModeRef = useRef(selectionMode);
  const isDraggingRef = useRef(isDragging);

  // Update refs when state changes
  useEffect(() => {
    startCellRef.current = startCell;
  }, [startCell]);

  useEffect(() => {
    selectionEndRef.current = selectionEnd;
  }, [selectionEnd]);

  useEffect(() => {
    selectionModeRef.current = selectionMode;
  }, [selectionMode]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);
  const [weekDates, setWeekDates] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Map two-letter day labels to three-letter display labels without changing keys/logic
  const toThreeLetterDay = (twoLetter) => {
    const map = {
      Mo: "Mon",
      Tu: "Tue",
      We: "Wed",
      Th: "Thu",
      Fr: "Fri",
      Sa: "Sat",
      Su: "Sun",
    };
    return map[twoLetter] || twoLetter;
  };

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

  // This component no longer pushes selected slots as the daily limit.
  // The daily limit is a static, user-defined value handled in WorkTimePreferences.

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
    // Use independent markers for each half:
    // Top half (first 30 min): stores hour:00 (start of slot)
    // Bottom half (second 30 min): stores hour:30 (midpoint of slot)
    const selectedTime = isSecondButton ? `${hour}:30` : `${hour}:00`;

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
    // Top half checks for hour:00, bottom half checks for hour:30
    const timeToCheck = isSecondButton ? `${hour}:30` : `${hour}:00`;

    const daySlot = fields.find((slot) => slot.day === day);
    if (!daySlot) return false;

    return daySlot.hour.includes(timeToCheck);
  };

  // Time-based color helper functions
  const getTimeBasedColor = (hour, isSelected) => {
    // Before 8:00 AM (hours 0-7): use primary-color-p11 for unselected, attention-a12 for selected
    if (hour < 8) {
      return isSelected ? "bg-quaternary-color-A12" : "bg-primary-color-P11";
    }
    // From 8:00 AM onwards (hours 8-23): use secondary-s11 for unselected, attention-a12 for selected
    return isSelected ? "bg-quaternary-color-A12" : "bg-secondary-color-S11";
  };

  const getTimeBasedHoverColor = (hour) => {
    // Before 8:00 AM (hours 0-7): use primary-color-p11 with transparency
    if (hour < 8) {
      return "hover:bg-primary-color-P11/30";
    }
    // From 8:00 AM onwards (hours 8-23): use secondary-s11 with transparency
    return "hover:bg-secondary-color-S11/30";
  };

  // Rectangle selection helper functions
  const getCellsInRectangle = useCallback((start, end) => {
    if (!start || !end) return [];

    const startDayIndex = getDayIndex(start.day);
    const endDayIndex = getDayIndex(end.day);

    const minHour = Math.min(start.hour, end.hour);
    const maxHour = Math.max(start.hour, end.hour);
    const minDayIndex = Math.min(startDayIndex, endDayIndex);
    const maxDayIndex = Math.max(startDayIndex, endDayIndex);

    const cells = [];

    for (let dayIdx = minDayIndex; dayIdx <= maxDayIndex; dayIdx++) {
      for (let hour = minHour; hour <= maxHour; hour++) {
        // For the start hour, respect the starting half-hour boundary
        if (hour === minHour && hour === maxHour) {
          // Same hour - include only the range between start and end halves
          const startHalf = start.isSecondButton ? 1 : 0;
          const endHalf = end.isSecondButton ? 1 : 0;
          const minHalf = Math.min(startHalf, endHalf);
          const maxHalf = Math.max(startHalf, endHalf);

          for (let half = minHalf; half <= maxHalf; half++) {
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: half === 1,
            });
          }
        } else if (hour === minHour) {
          // Start hour - include only from start half onwards
          if (start.isSecondButton) {
            // Start from bottom half (:30)
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: true,
            });
          } else {
            // Start from top half (:00) - include both halves
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: false,
            });
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: true,
            });
          }
        } else if (hour === maxHour) {
          // End hour - include only up to end half
          if (end.isSecondButton) {
            // End at bottom half (:30) - include both halves
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: false,
            });
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: true,
            });
          } else {
            // End at top half (:00) - include only top half
            cells.push({
              day: DAY_ORDER[dayIdx],
              hour: hour,
              isSecondButton: false,
            });
          }
        } else {
          // Middle hours - include both halves
          cells.push({
            day: DAY_ORDER[dayIdx],
            hour: hour,
            isSecondButton: false,
          });
          cells.push({
            day: DAY_ORDER[dayIdx],
            hour: hour,
            isSecondButton: true,
          });
        }
      }
    }

    return cells;
  }, []);

  // Get preview state for a cell during rectangle selection
  const getCellPreviewState = (hour, day, isSecondButton) => {
    if (!isDragging || !startCell || !selectionEnd) return null;

    const startDayIndex = getDayIndex(startCell.day);
    const endDayIndex = getDayIndex(selectionEnd.day);
    const currentDayIndex = getDayIndex(day);

    const minHour = Math.min(startCell.hour, selectionEnd.hour);
    const maxHour = Math.max(startCell.hour, selectionEnd.hour);
    const minDayIndex = Math.min(startDayIndex, endDayIndex);
    const maxDayIndex = Math.max(startDayIndex, endDayIndex);

    // Check if current cell is within the rectangle bounds
    const isDayInRectangle = currentDayIndex >= minDayIndex && currentDayIndex <= maxDayIndex;
    const isHourInRectangle = hour >= minHour && hour <= maxHour;

    if (!isDayInRectangle || !isHourInRectangle) return null;

    // Check half-hour boundaries for edge hours
    if (hour === minHour && hour === maxHour) {
      // Same hour - check if within half range
      const startHalf = startCell.isSecondButton ? 1 : 0;
      const endHalf = selectionEnd.isSecondButton ? 1 : 0;
      const currentHalf = isSecondButton ? 1 : 0;
      const minHalf = Math.min(startHalf, endHalf);
      const maxHalf = Math.max(startHalf, endHalf);

      if (currentHalf < minHalf || currentHalf > maxHalf) return null;
    } else if (hour === minHour) {
      // Start hour - check if after start half
      const startHalf = startCell.isSecondButton ? 1 : 0;
      const currentHalf = isSecondButton ? 1 : 0;

      if (currentHalf < startHalf) return null;
    } else if (hour === maxHour) {
      // End hour - check if before end half
      const endHalf = selectionEnd.isSecondButton ? 1 : 0;
      const currentHalf = isSecondButton ? 1 : 0;

      if (currentHalf > endHalf) return null;
    }

    const timeString = isSecondButton ? `${hour}:30` : `${hour}:00`;
    const daySlot = fields.find(slot => slot.day === day);
    const isCurrentlySelected = daySlot?.hour.includes(timeString);

    // Preview state based on selection mode
    if (selectionMode === 'select' && !isCurrentlySelected) {
      return 'will-select';
    } else if (selectionMode === 'erase' && isCurrentlySelected) {
      return 'will-erase';
    }

    return null;
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

  // Format hour (12H or 24H format) with proper display
  const formatHourDisplay = (hour) => {
    if (!is12HourFormat) {
      // 24h format: 00:00 to 23:00
      return hour < 10 ? `0${hour}:00` : `${hour}:00`;
    }
    
    // 12h format: 12:00 AM to 11:00 PM
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:00 ${period}`;
  };

  // Only acts if the click is pressed AND it is a different cell from the initial one
  const handleMouseEnter = (hour, day, isSecondButton) => {
    if (isDragging && startCell) {
      // Update the end cell for rectangle selection
      setSelectionEnd({ hour, day, isSecondButton });
    }
  };

  // Handles mouse-up events to stop the drag selection and resets dragging state and clears the starting cell
  const handleMouseUp = useCallback((e) => {
    e.preventDefault();

    if (isDraggingRef.current && startCellRef.current) {
      // If selectionEnd is not set (e.g., unclicked on border or outside canvas),
      // use startCell as both start and end for single cell selection
      const endCell = selectionEndRef.current || startCellRef.current;

      // Apply the rectangle selection immediately
      const cellsToProcess = getCellsInRectangle(startCellRef.current, endCell);

      // Group operations by day for efficiency
      const operationsByDay = {};

      cellsToProcess.forEach(cell => {
        const timeString = cell.isSecondButton ? `${cell.hour}:30` : `${cell.hour}:00`;

        if (!operationsByDay[cell.day]) {
          operationsByDay[cell.day] = { toAdd: [], toRemove: [] };
        }

        const existingIndex = fields.findIndex(slot => slot.day === cell.day);
        if (existingIndex !== -1) {
          const existingHours = fields[existingIndex].hour;
          const isCurrentlySelected = existingHours.includes(timeString);

          if (selectionModeRef.current === 'select' && !isCurrentlySelected) {
            operationsByDay[cell.day].toAdd.push(timeString);
          } else if (selectionModeRef.current === 'erase' && isCurrentlySelected) {
            operationsByDay[cell.day].toRemove.push(timeString);
          }
        } else if (selectionModeRef.current === 'select') {
          operationsByDay[cell.day].toAdd.push(timeString);
        }
      });

      // Apply operations in the correct order - first snapshots, then updates
      const fieldsSnapshot = [...fields];
      const updatesToApply = [];
      const removalsToApply = [];

      Object.keys(operationsByDay).forEach(day => {
        const ops = operationsByDay[day];
        const existingIndex = fieldsSnapshot.findIndex(slot => slot.day === day);

        if (existingIndex !== -1) {
          let updatedHours = [...fieldsSnapshot[existingIndex].hour];

          // Remove unwanted hours
          if (ops.toRemove.length > 0) {
            updatedHours = updatedHours.filter(hour => !ops.toRemove.includes(hour));
          }

          // Add new hours
          if (ops.toAdd.length > 0) {
            updatedHours = [...updatedHours, ...ops.toAdd];
          }

          // Sort the hours
          updatedHours.sort((a, b) => {
            const [aHour, aMin] = a.split(":").map(Number);
            const [bHour, bMin] = b.split(":").map(Number);
            return aHour - bHour || aMin - bMin;
          });

          if (updatedHours.length > 0) {
            updatesToApply.push({ index: existingIndex, day, hour: updatedHours });
          } else {
            removalsToApply.push(existingIndex);
          }
        } else if (ops.toAdd.length > 0) {
          // New day entry - sort first
          const sortedHours = [...ops.toAdd].sort((a, b) => {
            const [aHour, aMin] = a.split(":").map(Number);
            const [bHour, bMin] = b.split(":").map(Number);
            return aHour - bHour || aMin - bMin;
          });
          updatesToApply.push({ index: -1, day, hour: sortedHours });
        }
      });

      // Apply removals first (in reverse order to maintain indices)
      removalsToApply.sort((a, b) => b - a).forEach(index => {
        remove(index);
      });

      // Then apply updates
      updatesToApply.forEach(({ index, day, hour }) => {
        if (index === -1) {
          // New day
          append({ day, hour });
        } else {
          // Update existing day
          update(index, { day, hour });
        }
      });
    }

    // Reset all drag states
    setIsDragging(false);
    setStartCell(null);
    setSelectionEnd(null);
    setSelectionMode('select');
  }, [fields, append, remove, update, getCellsInRectangle]);

  // Add global mouse-up listener to handle cases where user unclicks outside the component
  useEffect(() => {
    const handleGlobalMouseUp = (e) => {
      if (isDragging) {
        handleMouseUp(e);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseUp]);

  // Sets dragging state, stores the starting cell, and determines selection mode
  const handleMouseDown = (hour, day, isSecondButton) => {
    setIsDragging(true);
    setStartCell({ hour, day, isSecondButton });
    setSelectionEnd({ hour, day, isSecondButton });

    // Determine selection mode based on the first clicked cell's state
    const timeString = isSecondButton ? `${hour}:30` : `${hour}:00`;
    const daySlot = fields.find(slot => slot.day === day);
    const isCurrentlySelected = daySlot && daySlot.hour.includes(timeString);

    setSelectionMode(isCurrentlySelected ? 'erase' : 'select');
  };

  // If users clicks on HOURS of the day (0-23 or 1-12)
  const handleHourClick = (hour) => {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    // For full hour selection, we need both time markers
    const time1 = `${hour}:00`;  // First half marker
    const time2 = `${hour}:30`;  // Second half marker

    // Check if ALL days already have the full hour selected (both times)
    const allSelected = days.every((day) => {
      const daySlot = fields.find((slot) => slot.day === day);
      return (
        daySlot && 
        daySlot.hour.includes(time1) && 
        daySlot.hour.includes(time2)
      );
    });

    // Check if SOME days already have any of these times
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
      // If some or none are selected, we select ALL the days with full hour
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
            <ChevronLeftBigIcon fillcolor={"fill-primary-color-P1"} />
          </button>

          <h3 className="text-primary-color-P1 ST-4">From</h3>

          <div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9 w-[284px]">
            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-2 !py-1.5 w-[48px] h-9"
              defaultValue={minDate?.actualDate || ""}
              name="birthDateNumber"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[141px] h-9"
              defaultValue={getMonthNumberAsText(minDate?.actualMonth + 1) || ""}
              name="birthDateMonth"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
              defaultValue={minDate?.actualYear || ""}
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
              defaultValue={maxDate?.actualDate || ""}
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[137px] h-9"
              defaultValue={getMonthNumberAsText(maxDate?.actualMonth + 1) || ""}
              name="birthDateMonth"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
              name="birthDateYear"
              defaultValue={maxDate?.actualYear || ""}
              readOnly
            />
          </div>

          <button onClick={handleIncrementWeek} type="button">
            <ChevronRightMediumIcon fillcolor={"fill-primary-color-P1"} />
          </button>
        </div>
      )}

      {/* Calendar */}
      <main className="flex flex-row gap-8 max-w-[1000px] mx-auto w-full">
        {/* Left column - time slots */}
        <div className="flex flex-col gap-3 min-w-[100px] flex-shrink-0">
          {/* Format button placeholder to align with day headers */}
            <div className="h-[36px] flex items-center">
            <button
              className="bg-primary-color-P1 text-primary-color-P12 text-center MT-1 p-[6px] w-[114px] rounded-[10px] flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleChangeHoursDisplayed}
              type="button"
            >
              Format
            </button>
          </div>

          {/* Time slots column */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 24 }, (_, index) => {
              const is12 = is12HourFormat;
              const hour12 = index === 0 ? 12 : index > 12 ? index - 12 : index;
              const period = index < 12 ? "AM" : "PM";
              const displayNumeric = is12 ? `${hour12}:00` : (index < 10 ? `0${index}:00` : `${index}:00`);

              return (
                <div
                  className="w-[114px] h-[36px] flex items-center justify-between"
                  key={`hour-${index}`}
                >
                  <div className={`bg-white text-black rounded-[10px] h-full flex-1 flex items-center ${is12 ? 'justify-start' : 'justify-center'} px-3`}>
                    <span className="ST-3 font-bold">{displayNumeric}</span>
                  </div>
                  {is12 && (
                    <div
                      className={`text-black rounded-[10px] h-full w-[46px] flex items-center justify-center ${getTimeBasedColor(
                        index,
                        false
                      )}`}
                    >
                      <span className="ST-3 font-bold">{period}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar grid */}
        <div className="flex flex-col gap-[10px] flex-1 min-w-0">
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
                  className={`text-primary-color-P1 text-center p-[6px] rounded-[10px] h-[36px] min-w-[100px] w-full flex items-center justify-center ${
                    showCurrentActiveDay && isToday
                      ? "bg-tertiary-color-SC5"
                      : "bg-secondary-color-S11"
                  }`}
                  key={column.key}
                >
                  <h3 className="ST-3">{toThreeLetterDay(column.label)}</h3>
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

                  // Check if each half is selected for visual display
                  const isTopHalfSelected = isSelected(hourIndex, column.key, false);
                  const isBottomHalfSelected = isSelected(hourIndex, column.key, true);
                  const bothSelected = isTopHalfSelected && isBottomHalfSelected;

                  // Get preview states for rectangle selection
                  const topHalfPreview = getCellPreviewState(hourIndex, column.key, false);
                  const bottomHalfPreview = getCellPreviewState(hourIndex, column.key, true);

                  return (
                    <div
                      className={`flex-1 min-w-[100px] h-[36px] relative group rounded-[10px] overflow-hidden flex flex-col items-start p-0 ${
                        showCurrentActiveDay &&
                        isToday &&
                        "bg-tertiary-color-SC5"
                      }`}
                      key={`${column.key}-${hourIndex}`}
                    >
                      {/* Top half visual layer */}
                      <div
                        className={`absolute top-0 left-0 w-full h-1/2 ${
                          showCurrentActiveDay && isToday
                            ? "bg-tertiary-color-SC5"
                            : topHalfPreview === 'will-select'
                            ? "bg-blue-400/50"
                            : topHalfPreview === 'will-erase'
                            ? "bg-red-400/50"
                            : getTimeBasedColor(hourIndex, isTopHalfSelected)
                        } ${
                          !bothSelected && isTopHalfSelected && !topHalfPreview ? "rounded-t-md" : ""
                        }`}
                      />

                      {/* Bottom half visual layer */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-1/2 ${
                          showCurrentActiveDay && isToday
                            ? "bg-tertiary-color-SC5"
                            : bottomHalfPreview === 'will-select'
                            ? "bg-blue-400/50"
                            : bottomHalfPreview === 'will-erase'
                            ? "bg-red-400/50"
                            : getTimeBasedColor(hourIndex, isBottomHalfSelected)
                        } ${
                          !bothSelected && isBottomHalfSelected && !bottomHalfPreview ? "rounded-b-md" : ""
                        }`}
                      />
                      
                      {/* Top half button - invisible, just for click handling */}
                      <button
                        className={`w-full h-1/2 cursor-pointer absolute top-0 left-0 z-10 transition-colors ${
                          showCurrentActiveDay && isToday
                            ? "hover:bg-tertiary-color-SC5/50"
                            : getTimeBasedHoverColor(hourIndex)
                        }`}
                        onMouseDown={() =>
                          handleMouseDown(hourIndex, column.key, false)
                        }
                        onMouseEnter={() =>
                          handleMouseEnter(hourIndex, column.key, false)
                        }
                        onMouseUp={handleMouseUp}
                        type="button"
                        aria-label={`Select first 30 minutes of ${hourIndex}:00`}
                      ></button>

                      {/* Bottom half button - invisible, just for click handling */}
                      <button
                        className={`w-full h-1/2 cursor-pointer absolute bottom-0 left-0 z-10 transition-colors ${
                          showCurrentActiveDay && isToday
                            ? "hover:bg-tertiary-color-SC5/50"
                            : getTimeBasedHoverColor(hourIndex)
                        }`}
                        onMouseDown={() =>
                          handleMouseDown(hourIndex, column.key, true)
                        }
                        onMouseEnter={() =>
                          handleMouseEnter(hourIndex, column.key, true)
                        }
                        onMouseUp={handleMouseUp}
                        type="button"
                        aria-label={`Select second 30 minutes of ${hourIndex}:00`}
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
                  <EarthIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />
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
