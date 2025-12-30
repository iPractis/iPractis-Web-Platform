import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get("teacher_id");

    if (!teacherId) {
      return NextResponse.json(
        { error: "Missing teacher_id query parameter" },
        { status: 400 }
      );
    }

    /* --------------------------------------------------
       Extract client IP (proxy-safe)
    -------------------------------------------------- */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    /* --------------------------------------------------
       Fetch change logs
    -------------------------------------------------- */
    const { data, error } = await supabaseServer
      .from("teacher_change_logs")
      .select(`
        id,
        table_name,
        column_name,
        old_value,
        new_value,
        changed_at,
        ip_address
      `)
      .eq("teacher_id", teacherId)
      .neq("column_name", "last_updated")
      .order("changed_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching logs:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      count: data?.length ?? 0,
      logs: (data || []).map((item) => ({
        table_name: item.table_name,
        column_name: item.column_name,
        changed_at: item.changed_at,
        ip: item.ip_address || ip, // fallback for old rows
      })),
    });

  } catch (err) {
    console.error("GET /api/teachers/logs error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
