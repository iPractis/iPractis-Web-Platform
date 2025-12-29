import { requireUser } from "@/src/lib/requireUser";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    /* -------------------------------------------------
       1️⃣ Require logged-in user
    ------------------------------------------------- */
    const { user } = await requireUser();

    if (!user) {
      return NextResponse.json(
        { message: "User not authorized" },
        { status: 401 }
      );
    }

    /* -------------------------------------------------
       2️⃣ Fetch accepted teachers (exclude self)
    ------------------------------------------------- */
    const { data: teachers, error: teacherError } =
      await supabaseServer
        .from("teachers")
        .select(`
          teacher_id,
          user_id,
          subject,
          subject_intro,
          profile_title,
          video_link,
          hourly_price,
          form_accepted,
          users:user_id (
            first_name,
            last_name,
            nationality,
            profile_image,
            introduction,
            user_languages (
              name,
              level
            )
          )
        `)
        .eq("form_accepted", true)
        .neq("user_id", user.user_id);

    if (teacherError) {
      console.error("Teachers fetch error:", teacherError);
      return NextResponse.json(
        { error: teacherError.message },
        { status: 500 }
      );
    }

    if (!teachers || teachers.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    /* -------------------------------------------------
       3️⃣ Fetch DISTINCT students per teacher
       (confirmed + completed only)
    ------------------------------------------------- */
    const teacherIds = teachers.map((t) => t.teacher_id);

    const { data: bookings, error: bookingError } =
      await supabaseServer
        .from("bookings")
        .select("teacher_id, student_id")
        .in("teacher_id", teacherIds)
        .in("status", ["confirmed", "completed"]);

    if (bookingError) {
      console.error("Bookings fetch error:", bookingError);
      return NextResponse.json(
        { error: bookingError.message },
        { status: 500 }
      );
    }

    /* -------------------------------------------------
       4️⃣ Build teacher → unique student count map
    ------------------------------------------------- */
    const studentCountMap = {};

    for (const row of bookings || []) {
      if (!studentCountMap[row.teacher_id]) {
        studentCountMap[row.teacher_id] = new Set();
      }
      studentCountMap[row.teacher_id].add(row.student_id);
    }

    /* -------------------------------------------------
       5️⃣ Format final response
    ------------------------------------------------- */
    const formatted = teachers.map((t) => {
      const languages = t.users?.user_languages || [];
      const mainLangs = languages.slice(0, 2);
      const extraCount =
        languages.length > 2 ? languages.length - 2 : 0;

      return {
        teacherId: t.teacher_id,
        name: `${t.users?.first_name || ""} ${
          t.users?.last_name || ""
        }`.trim(),
        nationality: t.users?.nationality || "",
        subject: t.subject,
        subjectIntro: t.subject_intro,
        introduction: t.users?.introduction || "",
        profileTitle: t.profile_title,
        profileImage: t.users?.profile_image || null,
        videoLink: t.video_link,
        price: t.hourly_price,

        studentCount:
          studentCountMap[t.teacher_id]?.size || 0,

        languages: mainLangs.map((l) => ({
          name: l.name,
          level: l.level,
        })),
        extraLanguages: extraCount,
        duration: "30 minutes session",
      };
    });

    /* -------------------------------------------------
       6️⃣ Return response
    ------------------------------------------------- */
    return NextResponse.json(
      { data: formatted },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/fetch-teachers error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
