import {
  AnalyticIcon,
  CalendarIcon,
  LuggageIcon,
  NotebookOpenedIcon,
  UserIcon,
} from "../components/Icons";

// Import from shared data
import {
  teachingSubjects,
  languages,
  languagesLevels,
  countryFlags,
  countryAveragePrices,
  subjectImages,
  masteredLanguagesImages,
  timeZones,
  studentLevels,
  months,
  abbreviatedDaysOfWeek,
  columnsHeaderWorkSchedule,
  rowsWorkSchedule,
} from "./sharedData";

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

// Re-export from shared data
export { languagesLevels, languages, teachingSubjects };

export const subSubjects = [
  "Conversationnal",
  "Professional Field-Specific",
  "Initiation for beginner",
  "Children class",
  "School support",
  "Exam's preparation",
  "Literature and Culture",
];

// Re-export from shared data
export {
  timeZones,
  columnsHeaderWorkSchedule,
  rowsWorkSchedule,
  months,
  abbreviatedDaysOfWeek
};

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
    profileTitle: object?.profileTitle,
    teachToAmateurPersons: object?.teachToAmateurPersons,
    hourlyPrice: object?.hourlyPrice,
    teachToYoungPersons: object?.teachToYoungPersons,
    teachToSameGender: object?.teachToSameGender,
    subSubject: object?.subSubject,
    videoLink: object?.videoLink,
    studentLevel: object?.studentLevel,
    subject: object?.subject,
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

// Re-export from shared data
export { subjectImages, masteredLanguagesImages };

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

// Re-export from shared data
export { studentLevels, countryFlags, countryAveragePrices };
