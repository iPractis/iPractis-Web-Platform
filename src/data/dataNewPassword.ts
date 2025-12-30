export const errorFormMessages = {
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
  repeatedPassword: {
    required: {
      typeError: "Invalid Repeated Password",
      descError: "Password repeated can't be empty.",
    },

    minLength: {
      typeError: "Password repeated too short",
      descError: "You need at least 8 characters to make a password.",
    },

    maxLength: {
      typeError: "Password repeated too long",
      descError: "Your password should not exceed 30 characters.",
    },

    validate: {
      typeError: "Passwords do not match",
      descError: "The passwords you entered do not match.",
    },
  },
};
