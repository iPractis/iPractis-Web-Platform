import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function fetchDraft() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      console.warn("No auth token found");
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.userId;
    if (!userId) throw new Error("Invalid token: missing userId");

    // 🧠 Ensure base URL works in both local + deployed

    const res = await fetch(`http:localhost:3000/api/teacher-draft/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch teacher draft:", res.statusText);
      return null;
    }

    const { draft } = await res.json();
    return draft;
  } catch (err) {
    console.error("Error fetching teacher draft:", err);
    return null;
  }
}
