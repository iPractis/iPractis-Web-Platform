// app/api/teachers/logs/route.ts
import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get("teacher_id");

  if (!teacherId) {
    return NextResponse.json(
      { error: "Missing teacher_id query parameter" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("teacher_change_logs")
    .select(
      `
      id,
      table_name,
      column_name,
      old_value,
      new_value,
      changed_at
    `
    )
    .eq("teacher_id", teacherId)
    .order("changed_at", { ascending: false })
    .neq("column_name", "last_updated") // ✅ exclude "last_updated"
    .limit(50);

  if (error) {
    console.error("Error fetching logs:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

 return NextResponse.json({
  count: data?.length ?? 0,
  logs: data?.map((item) => ({
    table_name: item.table_name,
    column_name: item.column_name,
    changed_at: item.changed_at,
  })),
});

}
