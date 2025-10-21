import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabaseClient, supabaseServer } from "@/src/lib/supabaseClient";

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

      if (error || !user) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

    // Fetch user profile with role info  
    const { data: profile, error: profileError } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("user_id", user.user_id)
      .single();
      


    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Get role from profile or default to "student"
    const userRole = profile?.role || "student";

    // Create JWT
    const token = jwt.sign(
      { 
        userId: user.user_id, 
        email: user.email, 
        role: userRole,
        firstName: user.first_name || user.email.split('@')[0] // Added firstName
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { success: true, user: { userId: user.user_id, email: user.email, role: userRole } },
      { status: 200 }
    );
    
    // Set httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 , // 7 days
      path: '/'
    });
    
    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
