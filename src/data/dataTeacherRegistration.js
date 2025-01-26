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
  "GMT-12:00",
  "GMT-11:00",
  "GMT-10:00",
  "GMT-09:30",
  "GMT-09:00",
  "GMT-08:00",
  "GMT-07:00",
  "GMT-06:00",
  "GMT-05:00",
  "GMT-04:00",
  "GMT-03:30",
  "GMT-03:00",
  "GMT-02:00",
  "GMT-01:00",
  "GMT+00:00",
  "GMT+01:00",
  "GMT+02:00",
  "GMT+03:00",
  "GMT+03:30",
  "GMT+04:00",
  "GMT+04:30",
  "GMT+05:00",
  "GMT+05:30",
  "GMT+05:45",
  "GMT+06:00",
  "GMT+06:30",
  "GMT+07:00",
  "GMT+08:00",
  "GMT+08:45",
  "GMT+09:00",
  "GMT+09:30",
  "GMT+10:00",
  "GMT+10:30",
  "GMT+11:00",
  "GMT+12:00",
  "GMT+12:45",
  "GMT+13:00",
  "GMT+14:00",
];

export const columnsHeaderWorkSchedule = [
  {
    key: "Sa",
    label: "Sa",
    slot: "",
  },
  
  {
    key: "Su",
    label: "Su",
    slot: "",
  },

  {
    key: "Mo",
    label: "Mo",
    slot: "",
  },

  {
    key: "Tu",
    label: "Tu",
    slot: "",
  },

  {
    key: "We",
    label: "We",
    slot: "",
  },

  {
    key: "Th",
    label: "Th",
    slot: "",
  },

  {
    key: "Fr",
    label: "Fr",
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

export const abbreviatedDaysOfWeek = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
