import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";


export async function requireUser() {
  try {
    // 1️⃣ Read auth token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return { authorized: false, error: "Missing auth token" };
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded?.userId) {
      return { authorized: false, error: "Invalid token" };
    }

    // 3️⃣ Fetch user from DB
    const { data: user, error } = await supabaseServer
      .from("users")
      .select("user_id, email, role")
      .eq("user_id", decoded.userId)
      .single();

    if (error || !user) {
      return { authorized: false, error: "User not found" };
    }

    const { data: teacher, error: teacherError} = await supabaseServer.from("teachers").select("teacher_id").eq("user_id", decoded.userId);

    if(teacherError || !teacher){
      return {authorized : false, error: "user not a teacher"};
    }

    // 4️⃣ Success
    return {
      authorized: true,
      user,
      role : user.role,
      teacher
    };
  } catch (err) {
    console.error("[Auth][requireUser]", err);
    return { authorized: false, error: "Authentication failed" };
  }
}
