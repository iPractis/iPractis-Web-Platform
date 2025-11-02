import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";


export async function GET() {
  try {
    // 1️⃣ Verify auth token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Decode JWT to extract user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = (decoded).userId;

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // 3️⃣ Fetch teacher id (if the user is a teacher)
    const { data: teacherRecord, error: teacherError } = await supabaseServer
      .from("teachers")
      .select("teacher_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (teacherError) throw teacherError;

    const teacherId = teacherRecord?.teacher_id;
    // 4️⃣ Fetch logs for both user and teacher

    const [userLogsRes, teacherLogsRes] = await Promise.all([
      supabaseServer
        .from("user_change_logs")
        .select("table_name, column_name, changed_at")
        .eq("user_id", userId),
      teacherId
        ? supabaseServer
            .from("teacher_change_logs")
            .select("table_name, column_name, changed_at")
            .eq("teacher_id", teacherId)
        : Promise.resolve({ data: [], error: null })
    ]);

    if (userLogsRes.error) throw userLogsRes.error;
    if (teacherLogsRes.error) throw teacherLogsRes.error;

    // 5️⃣ Combine & sort logs (latest first)
    const logs = [...(userLogsRes.data || []), ...(teacherLogsRes.data || [])].sort(
      (a, b) => new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime()
    );

    return NextResponse.json({
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch logs", details: error.message },
      { status: 500 }
    );
  }
}
