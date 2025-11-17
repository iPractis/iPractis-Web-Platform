// Centralized data for shared use across the application

// Flag imports - shared across components
import france from "@/public/flags/france.png";
import italy from "@/public/flags/italy.png";
import spain from "@/public/flags/spain.png";
import unitedKingdom from "@/public/flags/united-kingdom.png";

// Export flag images for reuse
export const flags = {
  france,
  italy,
  spain,
  unitedKingdom,
};

// Available translated languages
export const availableTranslatedLanguages = [
  { value: "en", language: "English" },
  { value: "es", language: "Español" },
];

// Work schedule data
export const abbreviatedDaysOfWeek = [
  "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
];

export const columnsHeaderWorkSchedule = [
  { key: "Mon", label: "Mo", slot: "" },
  { key: "Tue", label: "Tu", slot: "" },
  { key: "Wed", label: "We", slot: "" },
  { key: "Thu", label: "Th", slot: "" },
  { key: "Fri", label: "Fr", slot: "" },
  { key: "Sat", label: "Sa", slot: "" },
  { key: "Sun", label: "Su", slot: "" },
];

// Country flags mapping
export const countryFlags = {
  France: france,
  Italy: italy,
  Spain: spain,
  UnitedKingdom: unitedKingdom,
};

// Country average prices data
export const countryAveragePrices = {
  Australia: {
    price: "20 AUD",
    flag: null, // Placeholder
  },
  Canada: {
    price: "17 CAD",
    flag: null, // Placeholder
  },
  France: {
    price: "14 EUR",
    flag: france,
  },
  Germany: {
    price: "16 EUR",
    flag: null, // Placeholder
  },
  Italy: {
    price: "13 EUR",
    flag: italy,
  },
  Spain: {
    price: "13 EUR",
    flag: spain,
  },
  // Default fallback for other countries
  default: {
    price: "13 USD",
    flag: null,
  },
  "United Kingdom": {
    price: "15 USD",
    flag: unitedKingdom,
  },
  "United States": {
    price: "18 USD",
    flag: unitedKingdom, // Using UK flag as placeholder
  },
};

// Consolidated languages list
export const languages = [
  "Arabic",
  "Chinese",
  "English",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Mandarin",
  "Portuguese",
  "Spanish",
];

// Language levels
export const languagesLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

// Mastered languages images mapping
export const masteredLanguagesImages = {
  Arabic: null,
  French: france,
  German: null,
  Italian: italy,
  Mandarin: null,
  Spanish: spain,
  English: unitedKingdom,
};

// Time/date data
export const months = [
  "April", "August", "December", "February", "January", "July",
  "June", "March", "May", "November", "October", "September",
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

// Search bar subjects with keys
export const searchBarSubjects = [
  {
    key: "chinese",
    subject: "Chinese",
  },
  {
    key: "english",
    subject: "English",
  },
  {
    key: "french",
    subject: "French",
  },
  {
    key: "italian",
    subject: "Italian",
  },
  {
    key: "mathematics",
    subject: "Mathematics",
  },
  {
    key: "physics",
    subject: "Physics",
  },
  {
    key: "science",
    subject: "Science",
  },
  {
    key: "spanish",
    subject: "Spanish",
  },
];

// Student levels
export const studentLevels = [
  { value: "advanced", label: "Advanced" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
];

// Consolidated subjects list (unique values)
export const subjects = [
  "Chinese",
  "English",
  "French",
  "Italian",
  "Mathematics",
  "Physics",
  "Science",
  "Spanish",
];

// Subject images mapping
export const subjectImages = {
  Arabic: null,
  French: france,
  German: null,
  Italian: italy,
  Mandarin: null,
  Spanish: spain,
  English: unitedKingdom,
};

// Teaching subjects (for teacher registration)
export const teachingSubjects = [
  "Arabic",
  "English",
  "French",
  "German",
  "Italian",
  "Mandarin",
  "Spanish",
];

// Time zones data
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