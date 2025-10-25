import { auth } from "@/src/auth";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
export async function fetchDraft() {
  console.log("Fetching draft data...");
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null; // not logged in
    }

    // ✅ decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.userId;

    if (!userId) {
      throw new Error("Invalid token: missing userId");
    }

    // 🔥 Hit teacher-draft endpoint instead of teachers
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teacher-draft?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // don't cache, always fresh
    });

    if (!res.ok) {
      console.error("Failed to fetch teacher draft:", res.statusText);
      return null;
    }

    const { draft } = await res.json(); // API should return { draft: {...} }
    return draft;
  } catch (err) {
    console.error("Error fetching teacher draft:", err);
    return null;
  }
}
