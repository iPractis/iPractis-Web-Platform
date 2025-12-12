import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

// ---------------------------------------------------------
// 🔑 STEP 1 — Generate a unique room key (Supabase-verified)
// ---------------------------------------------------------
async function generateUniqueRoomKey() {
  let key;
  let exists = true;

  while (exists) {
    key = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    const { data } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("room_key", key)
      .maybeSingle();

    exists = !!data;
  }

  return key;
}

// ---------------------------------------------------------
// 📅 POST: Create Booking + Chat Room + Members
// ---------------------------------------------------------
export const POST = async (req) => {
  try {
    const { teacherId, studentId, date, time } = await req.json();

    if (!teacherId || !studentId || !date || !time) {
      return NextResponse.json(
        { error: "Missing teacherId, studentId, date, or time" },
        { status: 400 }
      );
    }

    const startTime = dayjs.utc(`${date}T${time}`);
    const endTime = startTime.add(30, "minute");
    const now = dayjs.utc();

    if (startTime.isBefore(now)) {
      return NextResponse.json(
        { error: "Cannot book a past time slot." },
        { status: 400 }
      );
    }

    const dayOfWeek = startTime.format("ddd");

    // 1️⃣ Check availability
    const { data: availability } = await supabaseClient
      .from("teacher_availability")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("day_of_week", dayOfWeek)
      .eq("hour", time)
      .eq("is_available", true)
      .maybeSingle();

    if (!availability) {
      return NextResponse.json(
        { error: "Teacher not available at that time." },
        { status: 400 }
      );
    }

    // 2️⃣ Check overlapping bookings
    const { data: conflicts } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .filter("start_time", "lt", endTime.toISOString())
      .filter("end_time", "gt", startTime.toISOString());

    if (conflicts?.length > 0) {
      return NextResponse.json(
        { error: "This time slot is already booked." },
        { status: 400 }
      );
    }

    // 3️⃣ Generate unique chat room key
    const roomKey = await generateUniqueRoomKey();

    // 4️⃣ Create the Booking
    const { data: booking, error: insertError } = await supabaseClient
      .from("bookings")
      .insert([
        {
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: "booked",
          room_key: roomKey,
        },
      ])
      .select()
      .maybeSingle();

    if (insertError) throw insertError;

    const bookingId = booking.id;

    const { data: teacher, error: teacherError } = await supabaseClient
    .from("teachers")
    .select("user_id")
    .eq("teacher_id", teacherId)
    .single();

    console.log("Teacher data:", teacher.user_id, "Error:", teacherError);

    const { data: userData , setUserDataError } = await supabaseClient
    .from("users")
    .select("*")
    .eq("user_id", teacher.user_id)
    .single();

    console.log("User data:", userData, "Error:", setUserDataError);

    // ---------------------------------------------------------
    // 🔥 STEP 5 — Create Chat Room
    // ---------------------------------------------------------
    const { data: chatRoom, error: chatError } = await supabaseClient
      .from("chat_rooms")
      .insert([
        {
          booking_id: bookingId,
          room_name: `Lesson Chat with ${userData.first_name} `,
          student_id: studentId,
          teacher_id: teacherId,
          type: "lesson",
          expires_at: endTime.toISOString(),
        },
      ])
      .select()
      .maybeSingle();

    if (chatError) throw chatError;

    // ---------------------------------------------------------
    // 🔥 STEP 6 — Insert Student + Teacher into chat_room_members
    // ---------------------------------------------------------
    const { data: teacherUser, error: teacherUserError } = await supabaseClient
  .from("teachers")
  .select("user_id")
  .eq("teacher_id", teacherId)
  .maybeSingle();

if (teacherUserError || !teacherUser) {
  throw new Error("Failed to resolve teacher.user_id");
}

const teacherUserId = teacherUser.user_id;

// STEP 7 — Insert Chat Members
await supabaseClient.from("chat_room_members").insert([
  { room_id: chatRoom.id, user_id: studentId, role: "student", unread_count: 0 },
  { room_id: chatRoom.id, user_id: teacherUserId, role: "teacher", unread_count: 0 },
]);
    // ---------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Booking & Chat Room created successfully",
        booking,
        chatRoom,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error creating booking:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
};
