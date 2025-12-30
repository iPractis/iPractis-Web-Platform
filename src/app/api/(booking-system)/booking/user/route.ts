import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";
import { requireUser } from "@/src/lib/requireUser";

dayjs.extend(utc);

export const GET = async () => {
  try {
    // 1️⃣ Auth
    const { user, role } = await requireUser();
    console.log("Authenticated user role:", role);
    const userId = user.user_id;

    const now = dayjs.utc().toISOString();

    // 2️⃣ Base query (schema-correct joins)
    let query = supabaseClient
      .from("bookings")
      .select(`
        id,
        start_time,
        end_time,
        status,

        student:users!bookings_student_id_fkey(
          first_name,
          last_name
        ),

        teacher:teachers!bookings_teacher_id_fkey(
          user:users(
            first_name,
            last_name
          )
        )
      `)
      .in("status", ["booked", "rescheduled"])
      .gte("start_time", now)
      .order("start_time", { ascending: true });

      console.log("User role:", role);
    // 3️⃣ Ownership filter
    if (role === "teacher") {
      query = query.eq("teacher_id", userId);
    } else if (role === "student") {
      query = query.eq("student_id", userId);
    } else {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    // 4️⃣ Normalize response
    const formatted = data.map((b) => ({
      id: b.id,
      start_time: b.start_time,
      end_time: b.end_time,
      status: b.status,

      teacher_name: b.teacher?.user
        ? `${b.teacher.user.first_name ?? ""} ${b.teacher.user.last_name ?? ""}`.trim()
        : null,

      student_name: b.student
        ? `${b.student.first_name ?? ""} ${b.student.last_name ?? ""}`.trim()
        : null,
    }));

    return NextResponse.json(
      {
        role,
        total_upcoming: formatted.length,
        upcoming_meetings: formatted,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching upcoming bookings:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
