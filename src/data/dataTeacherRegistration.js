import {
  AnalyticIcon,
  CalendarIcon,
  LuggageIcon,
  NotebookOpenedIcon,
  UserIcon,
} from "../components/Icons";

// Images && icons
import unitedKingdom2 from "@/public/flags/united-kingdom-2.png";
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
    textButton: "Review",
    Icon: CalendarIcon,
  },

  {
    textButton: "Status",
    Icon: AnalyticIcon,
  },
];

// We do this because texts changes at the beggining and at the end of form submission
export const sectionHeaderContent = [
  {
    titleText: "Complete the application form",
    descriptionText:
      "Fill the form with all the necessary information, we will review them as soon as possible.",
  },

  {
    titleText: "Form completed and send successfully",
    descriptionText:
      "Your form has been successfully submitted! Our team will carefully review your application within 14 days, and we’ll update you as soon as possible. Thank you for your patience!",
  },

  {
    titleText: "Last step, review your profile before appling",
    descriptionText:
      "Double-check your info, then click Send application to finalize. Good luck!",
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

export const abbreviatedDaysOfWeek = [
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
];

export const tabProfileFields = (object) => {
  return {
    birthDate: object?.birthDate,
    // middleName: object?.middleName, --> Optional
    firstName: object?.firstName,
    lastName: object?.lastName,
    country: object?.country,
    nationality: object?.nationality,
    languages: object?.languages,
    uploadProfileImage: object?.uploadProfileImage,
    introduction: object?.introduction,
    gender: object?.gender,
  };
};

export const tabSubjectFields = (object) => {
  return {
    subjectIntroduction: object?.subjectIntroduction,
    emailWithdrawal: object?.emailWithdrawal,
    profileTitle: object?.profileTitle,
    teachToAmateurPersons: object?.teachToAmateurPersons,
    hourlyPrice: object?.hourlyPrice,
    teachToYoungPersons: object?.teachToYoungPersons,
    subSubject: object?.subSubject,
    videoLink: object?.videoLink,
    studentLevel: object?.studentLevel,
    subject: object?.subject,
    withdrawal: object?.withdrawal,
  };
};

export const tabBackgroundFields = (object) => {
  return {
    careerExperience: object?.careerExperience,
    education: object?.education,
  };
};

export const tabAvailabilityFields = (object) => {
  return {
    dailyWorkTime: object?.dailyWorkTime,
    workSchedule: object?.workSchedule,
    timeZone: object?.timeZone,
  };
};

export const subjectImages = {
  English: unitedKingdom,
  French: france,
  Spanish: spain,
  Italian: italy,
  Mandarin: null,
  German: null,
  Arabic: null,
};

export const masteredLanguagesImages = {
  English: unitedKingdom2,
  French: france,
  Spanish: spain,
  Italian: italy,
  Mandarin: null,
  German: null,
  Arabic: null,
};

export const errorFormMessagesTabProfile = {
  firstName: {
    required: {
      typeError: "Invalid First Name",
      descError: "First name can't be empty.",
    },

    minLength: {
      typeError: "First Name too short",
      descError: "You need at least 2 characters.",
    },

    maxLength: {
      typeError: "First Name too long",
      descError: "Your last name should not exceed 30 characters.",
    },

    pattern: {
      typeError: "Invalid First Name",
      descError:
        "First name shouldn't contain accents, special characters, numbers.",
    },
  },
  lastName: {
    required: {
      typeError: "Invalid Last Name",
      descError: "Last name can't be empty.",
    },

    minLength: {
      typeError: "Last Name too short",
      descError: "You need at least 2 characters.",
    },

    maxLength: {
      typeError: "Last Name too long",
      descError: "Your last name should not exceed 30 characters.",
    },

    pattern: {
      typeError: "Invalid Last Name",
      descError:
        "Last name shouldn't contain accents, special characters, numbers.",
    },
  },
  uploadProfileImage: {
    required: {
      typeError: "Invalid submission",
      descError: "Must provide an image (PNG or JPEG).",
    },
  },
};

export const studentLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const countryFlags = {
  UnitedKingdom: unitedKingdom,
  France: france,
  Spain: spain,
  Italy: italy,
};
