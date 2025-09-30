import { auth } from "@/src/auth";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// This if for fetching data that user input in fields,
// if he leaves the page we'll fetch them and fill up the blanks that he filled.
export async function fetchDraft() {
  // const session = await auth();
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await fetch(`${process.env.BASE_URL}/teacher/draft`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const draft = await data.json();

    return draft;
  } catch (error) {
    console.log(error);
  }
}
