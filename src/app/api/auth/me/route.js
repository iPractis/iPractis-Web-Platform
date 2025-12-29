import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

/* --------------------------------------------------
   Allowed fields (STRICT)
-------------------------------------------------- */
const USER_ALLOWED_FIELDS = [
  "first_name",
  "middle_name",
  "last_name",
  "country",
  "nationality",
  "timezone",
  "profile_image",
  "birth_date",
  "introduction",
  "languages",
  "gender",
];

const TEACHER_ALLOWED_FIELDS = [
  "profile_title",
  "subject",
  "subject_intro",
  "hourly_price",
  "video_link",
  "student_level",
  "teach_amateurs",
  "teach_young",
  "daily_work_time",
];

/* ==================================================
   PUT /api/me  → Update profile
================================================== */
export async function PUT(req) {
  try {
    /* ---------------- AUTH ---------------- */
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = (decoded).userId;

    const body = await req.json();

    /* ---------------- USER UPDATE ---------------- */
    if (body.user) {
      const safeUserUpdate = Object.fromEntries(
        Object.entries(body.user).filter(([key]) =>
          USER_ALLOWED_FIELDS.includes(key)
        )
      );

      if (Object.keys(safeUserUpdate).length > 0) {
        await supabaseServer
          .from("users")
          .update(safeUserUpdate)
          .eq("user_id", userId);
      }
    }

    /* ---------------- TEACHER UPDATE ---------------- */
    if (body.teacher) {
      const { data: teacher } = await supabaseServer
        .from("teachers")
        .select("teacher_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (!teacher) {
        return NextResponse.json(
          { error: "Teacher profile not found" },
          { status: 400 }
        );
      }

      const safeTeacherUpdate = Object.fromEntries(
        Object.entries(body.teacher).filter(([key]) =>
          TEACHER_ALLOWED_FIELDS.includes(key)
        )
      );

      if (Object.keys(safeTeacherUpdate).length > 0) {
        await supabaseServer
          .from("teachers")
          .update(safeTeacherUpdate)
          .eq("teacher_id", teacher.teacher_id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/me error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

/* ==================================================
   GET /api/me  → Fetch full dashboard context
================================================== */
export async function GET() {
  try {
    /* ---------------- AUTH ---------------- */
    const token = await cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = (decoded).userId;

    /* ---------------- USER ---------------- */
    let { data: user } = await supabaseServer
      .from("users")
      .select(`
        user_id,
        email,
        first_name,
        middle_name,
        last_name,
        birth_date,
        introduction,
        role,
        profile_image,
        country,
        nationality,
        gender,
        timezone,
        currency,
        created_at
      `)
      .eq("user_id", userId)
      .single();

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    /* ---------------- USER LANGUAGES ---------------- */
    const { data: languages } = await supabaseServer
      .from("user_languages")
      .select("name, level")
      .eq("user_id", userId);

    /* ---------------- TEACHER ---------------- */
    const { data: teacher } = await supabaseServer
      .from("teachers")
      .select(`
        teacher_id,
        profile_title,
        subject,
        subject_intro,
        hourly_price,
        video_link,
        form_accepted
      `)
      .eq("user_id", userId)
      .maybeSingle();

    /* ---------------- WALLET ---------------- */
    const { data: wallet } = await supabaseServer
      .from("wallets")
      .select("earned_pending, earned_available, spent_total")
      .eq("user_id", userId)
      .maybeSingle();

    /* ---------------- BOOKINGS ---------------- */
    const { data: studentBookings } = await supabaseServer
      .from("bookings")
      .select("id, start_time, end_time, status, payment_status, class_price")
      .eq("student_id", userId);

    let teacherBookings = [];
    if (teacher?.teacher_id) {
      const res = await supabaseServer
        .from("bookings")
        .select("id, start_time, end_time, status, payment_status, class_price")
        .eq("teacher_id", teacher.teacher_id);

      teacherBookings = res.data || [];
    }

    /* ---------------- PAYMENTS ---------------- */
    const { data: paymentsMade } = await supabaseServer
      .from("payments")
      .select("id, booking_id, amount_total, currency, status, created_at")
      .eq("payer_user_id", userId);

    let paymentsReceived = [];
    if (teacher?.teacher_id) {
      const res = await supabaseServer
        .from("payments")
        .select(
          "id, booking_id, teacher_amount, platform_fee, status, created_at"
        )
        .eq("teacher_id", teacher.teacher_id);

      paymentsReceived = res.data || [];
    }

    user = {
      ...user,
      teacherId: teacher?.teacher_id || null,
    }

    /* ---------------- STATS ---------------- */
    const stats = {
      lessonsAsStudent: studentBookings?.length || 0,
      lessonsAsTeacher: teacherBookings?.length || 0,
      totalSpent: wallet?.spent_total || 0,
      totalEarned: wallet?.earned_available || 0,
    };

    /* ---------------- RESPONSE ---------------- */
    return NextResponse.json({
      authenticated: true,
      user,
      teacher,
      languages: languages || [],
      wallet: wallet || {
        earned_pending: 0,
        earned_available: 0,
        spent_total: 0,
      },
      stats,
      bookings: {
        asStudent: studentBookings || [],
        asTeacher: teacherBookings || [],
      },
      payments: {
        made: paymentsMade || [],
        received: paymentsReceived || [],
      },
    });
  } catch (err) {
    console.error("GET /api/me error:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
