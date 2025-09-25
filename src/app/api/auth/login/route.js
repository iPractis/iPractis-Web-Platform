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

    // Fetch user
    const { data: user, error } = await supabaseServer
      .from("users")
      .select(" *")
      .eq("email", email)
      .single();

    // Fetch user profile with role info  
    const { data: profile, error: profileError } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("user_id", user.user_id)
      .single();
      

    if (error || !user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }


    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: profile.role || "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { token, user: { userId: user.user_id, email: user.email , role: profile.role || "student" } },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
