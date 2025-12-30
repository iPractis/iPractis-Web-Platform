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

export const errorFormMessages = {
  email: {
    required: {
      typeError: "Invalid Email",
      descError: "Email can't be empty.",
    },

    pattern: {
      typeError: "Invalid Email",
      descError: "Check your spelling email.",
    },

    maxLength: {
      typeError: "Invalid Email Length",
      descError: "Email can't exceed 254 of characters.",
    },
  },

  password: {
    required: {
      typeError: "Invalid Password",
      descError: "Password can't be empty.",
    },

    maxLength: {
      typeError: "Password too long",
      descError: "The input exceeds the allowed character limit.",
    },

    minLength: {
      typeError: "Password too short",
      descError: "You need at least 8 characters for password.",
    },
  },
};
