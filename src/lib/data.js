import { auth } from "@/src/auth";

// This if for fetching data that user input in fields,
// if he leaves the page we'll fetch them and fill up the blanks that he filled.
export async function fetchDraft() {
  const session = await auth();

  try {
    const data = await fetch(`${process.env.BASE_URL}/teacher/draft`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
      cache: "no-store",
    });

    const draft = await data.json();

    return draft;
  } catch (error) {
    console.log(error);
  }
}
