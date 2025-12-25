import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";


const USER_ALLOWED_FIELDS = [
  "first_name",
  "last_name",
  "country",
  "nationality",
  "timezone",
  "language",
  "profile_image",
  "birth_date",
  "introduction",
  "gender",
];

const TEACHER_ALLOWED_FIELDS = [
  "profile_title",
  "introduction",
  "subject",
  "subject_intro",
  "hourly_price",
  "timezone",
  "profile_image",
  "video_link",
];

export async function PUT(req) {
  try {
    /* ----------------------------------------
       1️⃣ Authenticate
    ---------------------------------------- */
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const userId = decoded.userId;

    const body = await req.json();

    /* ----------------------------------------
       2️⃣ USER PROFILE UPDATE
    ---------------------------------------- */
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

    /* ----------------------------------------
       3️⃣ TEACHER PROFILE UPDATE (if exists)
    ---------------------------------------- */
    if (body.teacher) {
      const { data: teacher } = await supabaseServer
        .from("teachers")
        .select("teacher_id")
        .eq("user_id", userId)
        .single();

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
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    /* --------------------------------------------------
       1️⃣ Authenticate user via cookie + JWT
    -------------------------------------------------- */
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const decoded= jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId = decoded.userId;

    /* --------------------------------------------------
       2️⃣ Fetch base user profile
    -------------------------------------------------- */
    const { data: user, error: userError } =
      await supabaseServer
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
          language,
          created_at
        `)
        .eq("user_id", userId)
        .single();

    if (userError || !user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    /* --------------------------------------------------
       3️⃣ Fetch teacher profile (if exists)
    -------------------------------------------------- */
    const { data: teacher , error : teacherError } = await supabaseServer
      .from("teachers")
      .select(`
        teacher_id,
        profile_title,
        introduction,
        subject,
        subject_intro,
        hourly_price,
        profile_image,
        video_link,
        form_accepted,
        timezone,
        teacher_languages (
          name,
          level
        )
      `)
      .eq("user_id", userId)
      .maybeSingle();


      console.log("Teacher fetch error:", teacherError);

    /* --------------------------------------------------
       4️⃣ Wallet (always exists logically)
    -------------------------------------------------- */
    const { data: wallet , error : walletError } = await supabaseServer
      .from("wallets")
      .select(`
        earned_pending,
        earned_available,
        spent_total,
        updated_at
      `)
      .eq("user_id", userId)
      .maybeSingle();

    console.log("Wallet fetch error:", walletError);
    /* --------------------------------------------------
       5️⃣ Bookings
    -------------------------------------------------- */
    const { data: studentBookings , error : studentBookingsError } =
      await supabaseServer
        .from("bookings")
        .select(`
          id,
          teacher_id,
          start_time,
          end_time,
          status,
          payment_status,
          class_price
        `)
        .eq("student_id", userId);
    console.log("Student bookings fetch error:", studentBookingsError);

    let teacherBookings = [];
    if (teacher?.teacher_id) {
      const res = await supabaseServer
        .from("bookings")
        .select(`
          id,
          student_id,
          start_time,
          end_time,
          status,
          payment_status,
          class_price
        `)
        .eq("teacher_id", teacher.teacher_id);

      teacherBookings = res.data || [];
    }

    /* --------------------------------------------------
       6️⃣ Payments
    -------------------------------------------------- */
    const { data: paymentsMade , error : paymentsMadeError } =
      await supabaseServer
        .from("payments")
        .select(`
          id,
          booking_id,
          amount_total,
          currency,
          status,
          created_at
        `)
        .eq("payer_user_id", userId);

    console.log("Payments made fetch error:", paymentsMadeError);
    let paymentsReceived = [];
    if (teacher?.teacher_id) {
      const res = await supabaseServer
        .from("payments")
        .select(`
          id,
          booking_id,
          teacher_amount,
          platform_fee,
          status,
          created_at
        `)
        .eq("teacher_id", teacher.teacher_id);

      paymentsReceived = res.data || [];
    }

    /* --------------------------------------------------
       7️⃣ Derived stats (cheap aggregation)
    -------------------------------------------------- */
    const stats = {
      lessonsAsStudent: studentBookings?.length || 0,
      lessonsAsTeacher: teacherBookings?.length || 0,
      totalSpent:
        wallet?.spent_total || 0,
      totalEarned:
        wallet?.earned_available || 0,
    };

    /* --------------------------------------------------
       8️⃣ Final response
    -------------------------------------------------- */
    return NextResponse.json({
      authenticated: true,
      user,
      role: user.role,
      teacher: teacher
        ? {
            ...teacher,
            languages: teacher.teacher_languages || [],
          }
        : null,
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
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
