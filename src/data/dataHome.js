import calculator from "@/public/icons/calculator.png";
import messages from "@/public/icons/messages.png";
import pencil from "@/public/icons/pencil.png";
import wrist from "@/public/icons/wrist.png";

import userScreen from "@/public/icons/user-screen.png";
import threeUsers from "@/public/icons/3-users.png";
import calendar from "@/public/icons/calendar.png";
import card from "@/public/icons/card.png";

import tutorVideoPreview from "@/public/images/tutor-video-preview.png";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";

// Import from shared data
import {
  flags,
  subjects,
  availableTranslatedLanguages,
  searchBarSubjects,
} from "./sharedData";

export const averagePricesLanguagues = [
  {
    image: flags.unitedKingdom,
    title: "Average Price",
    price: "15 USD For 30 mins",
  },

  {
    image: flags.france,
    title: "Average Price",
    price: "14 EUR For 30 mins",
  },

  {
    image: flags.italy,
    title: "Average Price",
    price: "13 EUR For 30 mins",
  },

  {
    image: flags.spain,
    title: "Average Price",
    price: "13 EUR For 30 mins",
  },

  {
    image: flags.unitedKingdom,
    title: "Average Price",
    price: "18 USD For 30 mins",
  },

  {
    image: flags.france,
    title: "Average Price",
    price: "16 EUR For 30 mins",
  },

  {
    image: flags.italy,
    title: "Average Price",
    price: "17 CAD For 30 mins",
  },

  {
    image: flags.spain,
    title: "Average Price",
    price: "20 AUD For 30 mins",
  },
];

export const subjectsList = subjects.map(subject => ({ name: subject }));

export const subjectsAndTutors = [
  {
    imageSrc: tutorVideoPreview,
    tutorImagePreview: tutorImagePreview,
    tutorName: "Alexandra",
    tutorFlag: flags.unitedKingdom,
    tutorProfession: "Teaches English",
    tutorExtraLanguages: "+1",
    videoSrc: "https://www.youtube.com/embed/NCtzkaL2t_Y?si=PmnDqW2Y6oKvkJ3L",
  },

  {
    imageSrc: tutorVideoPreview,
    tutorImagePreview: tutorImagePreview,
    tutorName: "Alexandra",
    tutorFlag: flags.unitedKingdom,
    tutorProfession: "Teaches English",
    tutorExtraLanguages: "+1",
    videoSrc: "https://www.youtube.com/embed/A_MjCqQoLLA?si=zffSiFsL7n2tV6vc",
  },

  {
    imageSrc: tutorVideoPreview,
    tutorImagePreview: tutorImagePreview,
    tutorName: "Alexandra",
    tutorFlag: flags.unitedKingdom,
    tutorProfession: "Teaches English",
    tutorExtraLanguages: "+1",
    videoSrc: "https://www.youtube.com/embed/CGj85pVzRJs?si=IT7cp45C3LXmoTgL",
  },

  {
    imageSrc: tutorVideoPreview,
    tutorImagePreview: tutorImagePreview,
    tutorName: "Alexandra",
    tutorFlag: flags.unitedKingdom,
    tutorProfession: "Teaches English",
    tutorExtraLanguages: "+1",
    videoSrc: "https://www.youtube.com/embed/2RicaUqd9Hg?si=hAQ-TEynRpyKSdPt",
  },

  {
    imageSrc: tutorVideoPreview,
    tutorImagePreview: tutorImagePreview,
    tutorName: "Alexandra",
    tutorFlag: flags.unitedKingdom,
    tutorProfession: "Teaches English",
    tutorExtraLanguages: "+1",
    videoSrc: "https://www.youtube.com/embed/VOgFZfRVaww?si=qThhJhk_G_4GzOY3",
  },
];

export const easyStepsGetStarted = [
  {
    stepIcon: threeUsers,
    stepIconAlt: "Icon 3 Users",
    stepTitle: "Choose a tutor",
    stepDesc:
      "Browse qualified tutors based on level, goals, budget, and availability.",
  },

  {
    stepIcon: calendar,
    stepIconAlt: "Icon Calendar",
    stepTitle: "Schedule a lesson",
    stepDesc:
      "Pick  the date and time that works for you and get ready to conquer your goals.",
  },

  {
    stepIcon: card,
    stepIconAlt: "Icon Card",
    stepTitle: "Pay as you go",
    stepDesc: "Pay only for the lessons you take, no contracts or hidden fees.",
  },

  {
    stepIcon: userScreen,
    stepIconAlt: "User Screen",
    stepTitle: "Start learning",
    stepDesc: "Pay only for the lessons you take, no contracts or hidden fees.",
  },
];

export const variousInterestingSubjects = [
  {
    subjectIcon: messages,
    subjectIconAlt: "Icon Messages",
    subjectTitle: "Linguistic subjects",
    subjectDesc:
      "Enhance your fluency and communication skills in any languages with personalized guidance.",
  },

  {
    subjectIcon: calculator,
    subjectIconAlt: "Icon Calculator",
    subjectTitle: "Scientific subjects",
    subjectDesc:
      "Master subjects like math, physics, and chemistry with expert tutors.",
  },

  {
    subjectIcon: pencil,
    subjectIconAlt: "Icon Pencil",
    subjectTitle: "Artistic subjects",
    subjectDesc:
      "Explore creative fields like drawing, music, and design with guided lessons.",
  },

  {
    subjectIcon: wrist,
    subjectIconAlt: "Icon Wrist",
    subjectTitle: "Start learning",
    subjectDesc:
      "Learn career-focused skills like coding, business, and digital marketing.",
  },
];

// Re-export from shared data
export { availableTranslatedLanguages, searchBarSubjects };
