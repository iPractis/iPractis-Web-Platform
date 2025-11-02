// app/api/auth/register/route.js
import bcrypt from "bcrypt";
import { supabaseServer } from "@/src/lib/supabaseClient";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {email, password, firstName, lastName} = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // 🟩 Check if user already exists
    const { data: existingUser } = await supabaseServer
      .from("users")
      .select("user_id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // 🧂 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧮 Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // 🧾 Create user in unified users table
    const { data: user, error: insertError } = await supabaseServer
      .from("users")
      .insert([
        {
          email,
          first_name: firstName || null,
          last_name: lastName || null,
          password_hash: hashedPassword,
          role: "student",
          is_verified: false,
          otp,
          otp_expires_at: otpExpiry,
          otp_attempts: 0,
        },
      ])
      .select("user_id, email, otp")
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw insertError;
    }

    // 📨 Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MyApp" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔑 Verify your MyApp Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">Verify Your Account</h2>
          <p style="color: #555; font-size: 16px;">
            Hi ${firstName || "there"},<br /><br />
            Use the following One-Time Password (OTP) to verify your account:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; padding: 15px 30px; font-size: 22px; font-weight: bold; letter-spacing: 3px; color: #fff; background: #4f46e5; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          <p style="color: #555; font-size: 14px;">
            ⚠️ This code will expire in <strong>10 minutes</strong>. <br />
            If you did not request this, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            &copy; ${new Date().getFullYear()} MyApp. All rights reserved.
          </p>
        </div>
      `,
    });

    // 🛡️ Create JWT for temporary login
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        role: "student",
        firstName: firstName || email.split("@")[0],
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Set HttpOnly session cookie
    const response = NextResponse.json(
      {
        message:
          "Registration successful. Please check your email for your verification code.",
      },
      { status: 201 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Registration API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
