// app/api/auth/register/route.js
import bcrypt from "bcrypt";
import { supabaseServer } from "../../../../lib/supabaseClient";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, username, password } = await req.json();

    // check if exists
    const { data: existing } = await supabaseServer
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ message: "Email already registered" }), { status: 400 });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // generate OTP (6 digit numeric)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins

    // create user (unverified, with OTP)
    const { data: user, error } = await supabaseServer
      .from("users")
      .insert({
        email,
        username,
        password_hash: hashed,
        is_verified: false,
        otp,
        otp_expires_at: otpExpiry.toISOString(),
        otp_attempts: 0,
      })
      .select("user_id, email, otp")
      .single();

    if (error) throw error;

    // create default profile (student)
    await supabaseServer.from("profiles").insert({ user_id: user.user_id, role: "student" });

    // send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   await transporter.sendMail({
  from: `"MyApp" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🔑 Verify your MyApp Account",
  text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,

  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Verify Your Account</h2>
      <p style="color: #555; font-size: 16px;">
        Hi there, <br /><br />
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

    // Create JWT token for auto-login after registration
    const token = jwt.sign(
    { 
      userId: user.user_id, 
      email: user.email,
      role: "student", // Default role 
      firstName: user.email.split('@')[0]
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Create response with HTTP-only cookie
    const response = NextResponse.json({ 
      message: "Registration successful.Please check your email for verification code." 
    }, { status: 201 });

    // Set HTTP-only cookie for immediate session
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });

    return response;
  } 
  catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
