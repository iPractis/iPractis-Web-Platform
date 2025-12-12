import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromJWT() {
  const cookieStore = await cookies();
  const token =  cookieStore.get("auth-token")?.value;
console.log("Token in getUserFromJWT:", token);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { userId, email, name, role }
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}
