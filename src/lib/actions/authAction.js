"use server";

import { signOut, signIn } from "@/src/auth";
import { redirect } from "next/navigation";

// WITHOUT AUTHJS
export async function registerUser(prevState, formData) {
  // This is the request if user chooses between EMAIL or PHONE NUMBER
  const toggleInput = formData.get("toggleInput");

  // Regex to check for accents and hyphen (-)
  const invalidCharsRegex = /[áéíóúÁÉÍÓÚ-]/;

  const rawFormData = {
    email: formData.get("email") ? formData.get("email") : "",
    phone: formData.get("number") ? formData.get("number") : "",
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
  };

  // Check if firstname input is not empty
  if (!rawFormData.firstName.trim(" ")) {
    const invalidFirstNameError = {
      title: "Invalid First Name",
      message: "First name can't be empty.",
    };

    return invalidFirstNameError;
  }

  // Check if firstname input is too short (can't be less than 2)
  if (rawFormData.firstName.length < 2) {
    const invalidFirstNameError = {
      title: "First name too short",
      message: "You need at least 2 characters.",
    };

    return invalidFirstNameError;
  }

  // Check if password input is too long (can't excess 30)
  if (rawFormData.firstName.length > 30) {
    const invalidFirstNameError = {
      title: "First name too long",
      message: "Your first name should not exceed 30 characters.",
    };

    return invalidFirstNameError;
  }

  // Check if firstname contains invalid characters (guion - and accents)
  const containsFirstNameInvalidChars = invalidCharsRegex.test(
    rawFormData.firstName
  );

  if (containsFirstNameInvalidChars) {
    const invalidFirstNameError = {
      title: "Invalid First Name",
      message:
        "First name should not contain hyphen (-) or accents (á, é, í, ó, ú).",
    };

    return invalidFirstNameError;
  }

  // Check if lastname input is not empty
  if (!rawFormData.lastName.trim(" ")) {
    const invalidLastNameError = {
      title: "Invalid Last Name",
      message: "Last name can't be empty.",
    };

    return invalidLastNameError;
  }

  // Check if lastname input is too short (can't be less than 2)
  if (rawFormData.lastName.length < 2) {
    const invalidLastNameError = {
      title: "Last name too short",
      message: "You need at least 2 characters.",
    };

    return invalidLastNameError;
  }

  // Check if lastname input is too long (can't exceed 30)
  if (rawFormData.lastName.length > 30) {
    const invalidLastNameError = {
      title: "Last name too long",
      message: "Your last name should not exceed 30 characters.",
    };

    return invalidLastNameError;
  }

  // Check if lastname contains invalid characters (hyphen - and accents)
  const containsLastNameInvalidChars = invalidCharsRegex.test(
    rawFormData.lastName
  );

  if (containsLastNameInvalidChars) {
    const invalidLastNameError = {
      title: "Invalid Last Name",
      message:
        "Last name should not contain hyphen (-) or accents (á, é, í, ó, ú).",
    };

    return invalidLastNameError;
  }

  if (toggleInput === "email") {
    // Check if email input is not empty
    if (!rawFormData.email) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Email can't be empty.",
      };

      return invalidEmailError;
    }

    // Validation of gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // If user chooses email we're gonna get the EMAIL INPUT (ignore phone number)
    if (!gmailRegex.test(rawFormData.email)) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Check your spelling email",
      };

      return invalidEmailError;
    }
  } else {
    // If user chooses number we're gonna get the PHONE NUMBER INPUT (ignore email)
    const number = rawFormData?.phone;

    // Validation of empty field (phone number)
    if (!number.trim(" ")) {
      const invalidPhoneNumberError = {
        title: "Invalid Phone Number",
        message: "Phone number can't be empty.",
      };

      return invalidPhoneNumberError;
    }
  }

  // Check if password input is not empty
  if (!rawFormData.password) {
    const invalidPasswordError = {
      title: "Invalid Password",
      message: "Password can't be empty.",
    };

    return invalidPasswordError;
  }

  // Check if password input is too short (can't be less than 8)
  if (rawFormData.password.length < 8) {
    const invalidPasswordError = {
      title: "Password too short",
      message: "You need at least 8 characters to make a password.",
    };

    return invalidPasswordError;
  }

  // Check if password input is too long (can't excess 30)
  if (rawFormData.password.length > 30) {
    const invalidPasswordError = {
      title: "Password too long",
      message: "Your password should not exceed 30 characters.",
    };

    return invalidPasswordError;
  }

  const res = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  const json = await res.json();

  if (!res.ok) {
    return json;
  }

  redirect("/login");
}

// WITHOUT AUTHJS
export async function logInUser(formData) {
  const rawFormData = {
    password: formData.get("password"),
    email: formData.get("email") ? formData.get("email") : "",
    phone: formData.get("number") ? formData.get("number") : "",
  };

  try {
    const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(rawFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return json;
    }
  } catch (err) {
    console.log(err);
  }
}

// WITHOUT AUTHJS
export async function requestPasswordInput(formData) {
  const rawFormData = {
    email: formData.get("email") ? formData.get("email") : "",
  };

  try {
    const res = await fetch(`${process.env.BASE_URL}/auth/recover-password`, {
      method: "POST",
      body: JSON.stringify(rawFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return json;
    }
  } catch (err) {
    console.log(err);
  }
}

// WITH AUTHJS
export async function logInUserOtp(prevState, formData) {
  const rawFormData = {
    redirect: false,
    email: formData.get("email"),
    otp: formData.get("otp"),
  };

  try {
    await signIn("credentials", rawFormData);

    return { success: "ok" };
  } catch (err) {
    if (err instanceof Error && "type" in err && err.type === "AuthError") {
      return {
        formError: err.message,
      };
    }

    return {
      formError: { message: "Failed to login", title: String(err) },
    };
  }
}

// WITH AUTHJS
export async function logOutUser() {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }

  redirect("/login");
}
