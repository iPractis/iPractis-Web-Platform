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
