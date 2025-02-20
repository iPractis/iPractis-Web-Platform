"use server";

import { signOut, signIn } from "@/src/auth";
import { redirect } from "next/navigation";

// WITHOUT AUTHJS
export async function registerUser(prevState, reactHookFormData) {
  const res = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reactHookFormData),
  });

  const json = await res.json();

  if (!res.ok) {
    return json;
  }

  redirect("/login");
}

// WITHOUT AUTHJS
export async function logInUser(reactHookFormData) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(reactHookFormData),
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
export async function requestPasswordInput(reactHookFormData) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/auth/recover-password`, {
      method: "POST",
      body: JSON.stringify(reactHookFormData),
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
export async function newPasswordInputs(reactHookFormData) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/auth/confirm-password`, {
      method: "POST",
      body: JSON.stringify(reactHookFormData),
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
export async function supportRequestIssue(reactHookFormData) {
  const constructedData = {
    ...reactHookFormData,
    uploadedImage:
      reactHookFormData?.upload_image !== "undefined"
        ? reactHookFormData?.upload_image
        : "",
  };

  try {
    const res = await fetch(`${process.env.BASE_URL}/support/issue`, {
      method: "POST",
      body: JSON.stringify(constructedData),
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
export async function logInUserOtp(prevState, reactHookFormData) {
  const constructedData = {
    ...reactHookFormData,
    redirect: false,
  };

  try {
    await signIn("credentials", constructedData);

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
