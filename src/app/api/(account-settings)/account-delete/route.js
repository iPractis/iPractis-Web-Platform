import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function DELETE(request) {
  try {
    // 1️⃣ Verify Auth Token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Decode Token to get User ID
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // 3️⃣ Delete User from Supabase
    // Note: Ensure your DB has "ON DELETE CASCADE" set up if you want to delete related data automatically.
    const { error } = await supabaseServer
      .from("users")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }

    // 4️⃣ Clear Auth Cookie (Logout the user)
    cookieStore.delete("auth-token");

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account", details: error.message },
      { status: 500 }
    );
  }
}