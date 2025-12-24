//
import { getUserFromJWT } from "@/src/lib/getUserFromJWT";
// We import supabaseServer from supabaseClient.js to get the Service Role client (Admin access)
import { supabaseServer } from "@/src/lib/supabaseClient"; 
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request) {
  try {
    // 1. Verify Authentication
    const user = await getUserFromJWT();
    if (!user?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.userId;

    // 2. Parse and Validate Input
    const { email } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 3. Check if email is already in use by another user
    const { data: existingUser, error: checkError } = await supabaseServer
      .from("users")
      .select("user_id")
      .eq("email", email)
      .neq("user_id", userId) // Exclude the current user
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({ error: "This email is already associated with another account." }, { status: 409 });
    }

    // 4. Update the Email in the Database
    const { data, error } = await supabaseServer
      .from("users")
      .update({ email: email })
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error("Error updating email:", error);
      return NextResponse.json(
        { error: "Failed to update email" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = data[0];

    // 5. Generate a New JWT (Crucial: Update token payload with new email)
    const displayName =
      updatedUser.first_name || updatedUser.last_name
        ? `${updatedUser.first_name || ""} ${updatedUser.last_name || ""}`.trim()
        : updatedUser.email.split("@")[0];

    const token = jwt.sign(
      {
        userId: updatedUser.user_id,
        email: updatedUser.email,
        role: updatedUser.role || "student",
        name: displayName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Return Response & Set New Cookie
    const response = NextResponse.json(updatedUser);

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Error in PUT /api/account-settings/email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}