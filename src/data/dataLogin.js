import unitedKingdom from "@/public/flags/united-kingdom.png";
import spain from "@/public/flags/spain.png";

export const flagAndAreaCodeCountries = [
  {
    image: unitedKingdom,
    alt: "Flag of United Kingdom",
    areaCode: "+44",
  },

  {
    image: spain,
    alt: "Flag of Spain",
    areaCode: "+34",
  },
];

export const validPhoneNumberErrors = ["Invalid Phone Number"];

export const validEmailErrors = [
  "Invalid Email Submission",
  "Invalid Email Length",
  "Invalid Email",
  "No account exists for this email address.",
  "Email recently changed",
];

export const validPasswordErrors = [
  "Password too short",
  "Account Locked: Too many login attempts",
  "Invalid Password",
  "Wrong password",
  "Character limit",
];
