"use server";

import { signIn, signOut } from "@/src/auth";
import { redirect } from "next/navigation";

export async function registerUser(prevState, formData) {
  const rawFormData = {
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
  };

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

export async function logInUser(formData) {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return { success: "ok" };
  } catch (err) {
    if (err instanceof Error && "type" in err && err.type === "AuthError") {
      return {
        formError: err.message,
      };
    }

    return { error: { message: "Failed to login!", error: String(err) } };
  }
}

export async function logOutUser() {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }

  redirect("/login");
}
