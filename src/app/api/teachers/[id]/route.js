import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id: teacherId } = params;

    if (!teacherId) {
      return NextResponse.json({ message: "teacherId is required" }, { status: 400 });
    }

    console.log("Fetching data for teacherId:", teacherId);

    // 🟩 Fetch teacher info + relations
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .select(`
        *,
        teacher_languages(*),
        teacher_sub_subjects(*),
        teacher_experiences(*),
        teacher_education(*),
        teacher_availability(day_of_week, hour, is_available)
      `)
      .eq("teacher_id", teacherId)
      .single();

    if (teacherError) {
      console.error("Supabase teacher fetch error:", teacherError);
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    // 🟦 Fetch user profile
    const { data: user, error: userError } = await supabaseServer
      .from("users")
      .select(`
        user_id,
        first_name,
        last_name,
        email,
        country,
        nationality,
        timezone,
        profile_image,
        role
      `)
      .eq("user_id", teacher.user_id)
      .single();

    if (userError) {
      console.error("User fetch error:", userError);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 🧩 Build availability as ARRAY of { day, hour: [...] }
    const availabilityMap = {};

    if (teacher.teacher_availability?.length) {
      teacher.teacher_availability.forEach((slot) => {
        if (!slot.is_available) return;

        const day = slot.day_of_week;
        const hour = slot.hour.slice(0, 5).replace(/^0/, ""); // "09:00" -> "9:00"
        if (!availabilityMap[day]) availabilityMap[day] = [];
        availabilityMap[day].push(hour);
      });
    }

    // Sort hours for each day
    Object.keys(availabilityMap).forEach((day) => {
      availabilityMap[day].sort((a, b) => (a > b ? 1 : -1));
    });

    // Convert to array format
    const formattedAvailability = Object.entries(availabilityMap).map(([day, hours]) => ({
      day,
      hour: hours,
    }));

    // 🧠 Merge user + teacher info
    const combined = {
      ...user,
      ...teacher,
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      availability: formattedAvailability, // ✅ desired array format
    };

    delete combined.teacher_availability;

    return NextResponse.json(combined, { status: 200 });
  } catch (err) {
    console.error("GET /api/teachers/:id error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
