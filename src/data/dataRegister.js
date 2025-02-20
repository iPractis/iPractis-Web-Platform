export const validFirstNameErrors = [
  "Invalid First Name",
  "First name too short",
  "First name too long",
];

export const validLastNameErrors = [
  "Invalid Last Name",
  "Last name too short",
  "Last name too long",
];

export const errorFormMessages = {
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
        "First name shouldn't contain hyphen (-), accents (á, é, í, ó, ú), special characters, spaces, numbers.",
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
        "Last name shouldn't contain hyphen (-), accents (á, é, í, ó, ú), special characters, spaces, numbers.",
    },
  },
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

    minLength: {
      typeError: "Password too short",
      descError: "You need at least 8 characters to make a password.",
    },

    maxLength: {
      typeError: "Password too long",
      descError: "Your password should not exceed 30 characters.",
    },
  },
};