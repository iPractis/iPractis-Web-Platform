import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("teachers")
      .select(`
        teacher_id,
        user_id,
        subject,
        video_link,
        hourly_price,
        form_accepted,
        profile_image,
        users:user_id (
          first_name,
          last_name,
          nationality,
          profile_image
        ),
        teacher_languages (
          name,
          level
        )
      `)
      .eq("form_accepted", true);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formatted = data.map((t) => {
      const languages = t.teacher_languages || [];
      const mainLangs = languages.slice(0, 2);
      const extraCount = languages.length > 2 ? languages.length - 2 : 0;

      return {
        teacherId: t.teacher_id,
        name: `${t.users?.first_name || ""} ${t.users?.last_name || ""}`.trim(),
        nationality: t.users?.nationality || "",
        subject: t.subject,
        profileImage: t?.profile_image,
        videoLink: t.video_link,
        price: t.hourly_price,
        languages: mainLangs.map((l) => ({
          name: l.name,
          level: l.level,
        })),
        extraLanguages: extraCount,
        duration: "30 minutes session", // can make dynamic later
      };
    });

    return NextResponse.json({ data: formatted }, { status: 200 });
  } catch (err) {
    console.error("GET /api/teachers error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
