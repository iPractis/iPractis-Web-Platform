import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Normalize email (case-insensitive login)
    const normalizedEmail = email.trim().toLowerCase();

    // 🔍 Fetch user
    const { data: user, error } = await supabaseServer
      .from("users")
      .select("user_id, email, password_hash, first_name, last_name, role")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔐 Verify password (case-sensitive, untouched)
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🧩 Display name
    const displayName =
      user.first_name || user.last_name
        ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
        : user.email.split("@")[0];

    // 🛡️ Create JWT
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        role: user.role || "student",
        name: displayName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Response + cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          userId: user.user_id,
          email: user.email,
          name: displayName,
          role: user.role || "student",
        },
      },
      { status: 200 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
