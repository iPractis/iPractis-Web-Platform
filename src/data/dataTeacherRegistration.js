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
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:30",
  "UTC-09:00",
  "UTC-08:00",
  "UTC-07:00",
  "UTC-06:00",
  "UTC-05:00",
  "UTC-04:00",
  "UTC-03:30",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+03:30",
  "UTC+04:00",
  "UTC+04:30",
  "UTC+05:00",
  "UTC+05:30",
  "UTC+05:45",
  "UTC+06:00",
  "UTC+06:30",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+08:45",
  "UTC+09:00",
  "UTC+09:30",
  "UTC+10:00",
  "UTC+10:30",
  "UTC+11:00",
  "UTC+12:00",
  "UTC+12:45",
  "UTC+13:00",
  "UTC+14:00",
];

export const columnsHeaderWorkSchedule = [
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

  {
    key: "Sa",
    label: "Sa",
    slot: "",
  },
];

export const rowsWorkSchedule = [
  { hour: 0, label: "" },
  { hour: 1, label: "" },
  { hour: 2, label: "" },
  { hour: 3, label: "" },
  { hour: 4, label: "" },
  { hour: 5, label: "" },
  { hour: 6, label: "" },
  { hour: 7, label: "" },
  { hour: 8, label: "" },
  { hour: 9, label: "" },
  { hour: 10, label: "" },
  { hour: 11, label: "" },
  { hour: 12, label: "" },
  { hour: 13, label: "" },
  { hour: 14, label: "" },
  { hour: 15, label: "" },
  { hour: 16, label: "" },
  { hour: 17, label: "" },
  { hour: 18, label: "" },
  { hour: 19, label: "" },
  { hour: 20, label: "" },
  { hour: 21, label: "" },
  { hour: 22, label: "" },
  { hour: 23, label: "" },
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
