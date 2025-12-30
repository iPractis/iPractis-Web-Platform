import {
  PadLockClosedMediumIcon,
  NotificationMediumIcon,
  UserMonitorMediumIcon,
  DashboardMediumIcon,
  UserHatNormalIcon,
  WalletMediumIcon,
  UserMediumIcon,
  LocationStarIcon,
  UserCardIcon,
} from "../components/Icons";

export const tabsButtons = [
  {
    textButton: "Dashboard",
    Icon: DashboardMediumIcon,
  },

  {
    textButton: "Account",
    Icon: UserMediumIcon,
  },

  {
    textButton: "Security",
    Icon: PadLockClosedMediumIcon,
  },

  {
    textButton: "Notification",
    Icon: NotificationMediumIcon,
  },

  {
    textButton: "Finance",
    Icon: WalletMediumIcon,
  },
  {
    textButton: "Availability",
    Icon: UserMonitorMediumIcon,
  }
];

export const languages = [
  "Spanish",
  "English",
  "French",
  "Arabic",
  "Japenese",
  "Italian",
  "Portuguese",
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

export const currencies = ["USD", "EUR", "CLP", "GBP", "BRL", "JPY", "CNY"];

export const notificationTypes = [
  {
    key: "accountSystem",
    title: "Account and system's notifications",
    description:
      "Stay on top of your learning journey with personalized notifications.",
    icon: <LocationStarIcon fillcolor={"fill-primary-color-P1"} />,
    items: ["New features or tools", "Maintenance", "Policy Updates"],
    forRoles: ["student", "teacher"],
  },

  {
    key: "student",
    title: "Student's notification",
    description:
      "Stay on top of your learning journey with personalized notifications.",
    icon: <UserHatNormalIcon fillcolor={"fill-primary-color-P1"} />,
    items: [
      "Lesson starting soon",
      "Lesson rescheduled or canceled",
      "Payment",
      "Time zone change alert",
      "Teacher downtime",
    ],
    forRoles: ["student"],
  },

  {
    key: "teacher",
    title: "Teacher's notification",
    description:
      "Streamline your teaching experience by managing notifications.",
    icon: <UserCardIcon fillcolor={"fill-primary-color-P1"} />,
    items: [
      "Lesson starting soon",
      "Lesson rescheduled or canceled",
      "New lesson scheduled",
      "New student",
      "Payment",
      "Time zone change alert",
    ],
    forRoles: ["teacher"],
  },
];
