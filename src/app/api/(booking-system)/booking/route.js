import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";
import { notify } from "@/src/lib/notification/notify";

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
// 📅 POST: Create Booking + Chat Room + Members + Notifications
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

    // ---------------------------------------------------------
    // 1️⃣ Check teacher availability
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // 2️⃣ Check overlapping bookings
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // 3️⃣ Generate unique chat room key
    // ---------------------------------------------------------
    const roomKey = await generateUniqueRoomKey();

    // ---------------------------------------------------------
    // 4️⃣ Create Booking
    // ---------------------------------------------------------
    const { data: booking, error: bookingError } = await supabaseClient
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

    if (bookingError) throw bookingError;

    const bookingId = booking.id;

    // ---------------------------------------------------------
    // 5️⃣ Resolve teacher.user_id
    // ---------------------------------------------------------
    const { data: teacher, error: teacherError } = await supabaseClient
      .from("teachers")
      .select("user_id")
      .eq("teacher_id", teacherId)
      .single();

    if (teacherError || !teacher) {
      throw new Error("Failed to resolve teacher user");
    }

    const teacherUserId = teacher.user_id;

    // ---------------------------------------------------------
    // 6️⃣ Fetch teacher user details (for naming)
    // ---------------------------------------------------------
    const { data: teacherUser } = await supabaseClient
      .from("users")
      .select("first_name")
      .eq("user_id", teacherUserId)
      .single();

    // ---------------------------------------------------------
    // 7️⃣ Create Chat Room
    // ---------------------------------------------------------
    const { data: chatRoom, error: chatError } = await supabaseClient
      .from("chat_rooms")
      .insert([
        {
          booking_id: bookingId,
          room_name: `Lesson with ${teacherUser?.first_name ?? "Teacher"}`,
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
    // 8️⃣ Insert Chat Members
    // ---------------------------------------------------------
    await supabaseClient.from("chat_room_members").insert([
      {
        room_id: chatRoom.id,
        user_id: studentId,
        role: "student",
        unread_count: 0,
      },
      {
        room_id: chatRoom.id,
        user_id: teacherUserId,
        role: "teacher",
        unread_count: 0,
      },
    ]);

    // ---------------------------------------------------------
    // 🔔 9️⃣ Notifications (FINAL STEP)
    // ---------------------------------------------------------

    // Student notification
    await notify({
      userId: studentId,
      type: "APPOINTMENT_CONFIRMED",
      entityType: "booking",
      entityId: bookingId,
      channels: ["inapp", "email"],
      payload: {
        startTime: startTime.format("DD MMM YYYY, HH:mm"),
        teacherName: teacherUser?.first_name,
        link: `/bookings/${bookingId}`,
      },
    });

    // Teacher notification
    await notify({
      userId: teacherUserId,
      type: "APPOINTMENT_CONFIRMED",
      entityType: "booking",
      entityId: bookingId,
      channels: ["inapp"],
      payload: {
        startTime: startTime.format("DD MMM YYYY, HH:mm"),
        link: `/teacher/bookings/${bookingId}`,
      },
    });

    // ---------------------------------------------------------
    // ✅ Success response
    // ---------------------------------------------------------
    return NextResponse.json(
      {
        success: true,
        message: "Booking, chat room & notifications created successfully",
        booking,
        chatRoom,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("CREATE_BOOKING_FAILED", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
