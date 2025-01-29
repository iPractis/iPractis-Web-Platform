import {
  AnalyticIcon,
  CalendarIcon,
  LuggageIcon,
  NotebookOpenedIcon,
  UserIcon,
} from "../components/Icons";

// Images && icons
import unitedKingdom from "@/public/flags/united-kingdom.png";
import france from "@/public/flags/france.png";
import italy from "@/public/flags/italy.png";
import spain from "@/public/flags/spain.png";

export const tabsButtons = [
  {
    textButton: "Profile",
    Icon: UserIcon,
  },

  {
    textButton: "Subject",
    Icon: NotebookOpenedIcon,
  },

  {
    textButton: "Background",
    Icon: LuggageIcon,
  },

  {
    textButton: "Availability",
    Icon: CalendarIcon,
  },

  {
    textButton: "Status",
    Icon: AnalyticIcon,
  },
];

export const countriesSelection = [
  {
    image: unitedKingdom,
    key: "United Kingdom",
    alt: "Flag of United Kindgom",
  },

  {
    image: france,
    key: "France",
    alt: "Flag of France",
  },

  {
    image: italy,
    key: "Italy",
    alt: "Flag of Italy",
  },

  {
    image: spain,
    key: "Spain",
    alt: "Flag of Spain",
  },
];

export const languagesLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

export const languages = [
  "Spanish",
  "English",
  "French",
  "Arabic",
  "Japenese",
  "Italian",
  "Portuguese",
];

export const teachingSubjects = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "German",
  "Italian",
  "Arabic",
];

export const subSubjects = [
  "Conversationnal",
  "Professional Field-Specific",
  "Initiation for beginner",
  "Children class",
  "School support",
  "Exam's preparation",
  "Literature and Culture",
];

export const timeZones = [
  { label: "GMT-12", value: "Etc/GMT+12" },
  { label: "GMT-11", value: "Pacific/Midway" },
  { label: "GMT-10", value: "Pacific/Honolulu" },
  { label: "GMT-9", value: "America/Anchorage" },
  { label: "GMT-8", value: "America/Los_Angeles" },
  { label: "GMT-7", value: "America/Denver" },
  { label: "GMT-6", value: "America/Chicago" },
  { label: "GMT-5", value: "America/New_York" },
  { label: "GMT-4", value: "America/Santiago" },
  { label: "GMT-3", value: "America/Argentina/Buenos_Aires" },
  { label: "GMT-2", value: "Atlantic/South_Georgia" },
  { label: "GMT-1", value: "Atlantic/Azores" },
  { label: "GMT", value: "Etc/UTC" },
  { label: "GMT+1", value: "Europe/Madrid" },
  { label: "GMT+2", value: "Europe/Athens" },
  { label: "GMT+3", value: "Europe/Moscow" },
  { label: "GMT+4", value: "Asia/Dubai" },
  { label: "GMT+5", value: "Asia/Karachi" },
  { label: "GMT+6", value: "Asia/Dhaka" },
  { label: "GMT+7", value: "Asia/Bangkok" },
  { label: "GMT+8", value: "Asia/Singapore" },
  { label: "GMT+9", value: "Asia/Tokyo" },
  { label: "GMT+10", value: "Australia/Sydney" },
  { label: "GMT+11", value: "Pacific/Noumea" },
  { label: "GMT+12", value: "Pacific/Auckland" },
  { label: "GMT+13", value: "Pacific/Tongatapu" },
  { label: "GMT+14", value: "Pacific/Kiritimati" },
];

export const columnsHeaderWorkSchedule = [
  {
    key: "Mon",
    label: "Mo",
    slot: "",
  },

  {
    key: "Tue",
    label: "Tu",
    slot: "",
  },

  {
    key: "Wed",
    label: "We",
    slot: "",
  },

  {
    key: "Thu",
    label: "Th",
    slot: "",
  },

  {
    key: "Fri",
    label: "Fr",
    slot: "",
  },

  {
    key: "Sat",
    label: "Sa",
    slot: "",
  },

  {
    key: "Sun",
    label: "Su",
    slot: "",
  },

];

export const rowsWorkSchedule = [
  { hour: 0, label: "", key: "0" },
  { hour: 1, label: "", key: "1" },
  { hour: 2, label: "", key: "2" },
  { hour: 3, label: "", key: "3" },
  { hour: 4, label: "", key: "4" },
  { hour: 5, label: "", key: "5" },
  { hour: 6, label: "", key: "6" },
  { hour: 7, label: "", key: "7" },
  { hour: 8, label: "", key: "8" },
  { hour: 9, label: "", key: "9" },
  { hour: 10, label: "", key: "10" },
  { hour: 11, label: "", key: "11" },
  { hour: 12, label: "", key: "12" },
  { hour: 13, label: "", key: "13" },
  { hour: 14, label: "", key: "14" },
  { hour: 15, label: "", key: "15" },
  { hour: 16, label: "", key: "16" },
  { hour: 17, label: "", key: "17" },
  { hour: 18, label: "", key: "18" },
  { hour: 19, label: "", key: "19" },
  { hour: 20, label: "", key: "20" },
  { hour: 21, label: "", key: "21" },
  { hour: 22, label: "", key: "22" },
  { hour: 23, label: "", key: "23" },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const abbreviatedDaysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
