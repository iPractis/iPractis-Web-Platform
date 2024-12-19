"use server";

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
