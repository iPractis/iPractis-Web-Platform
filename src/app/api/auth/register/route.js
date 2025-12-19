import bcrypt from "bcryptjs";
import { supabaseServer } from "@/src/lib/supabaseClient";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    /* -------------------- NORMALIZE INPUT -------------------- */
    const normalizedEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName?.trim() || null;
    const cleanLastName = lastName?.trim() || null;

    /* -------------------- CHECK EXISTING USER -------------------- */
    const { data: existingUser, error: lookupError } = await supabaseServer
      .from("users")
      .select("user_id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error("User lookup error:", lookupError);
      return NextResponse.json(
        { message: "Unable to process request" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    /* -------------------- HASH PASSWORD -------------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* -------------------- OTP GENERATION -------------------- */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    /* -------------------- CREATE USER -------------------- */
    const { data: user, error: insertError } = await supabaseServer
      .from("users")
      .insert([
        {
          email: normalizedEmail,
          first_name: cleanFirstName,
          last_name: cleanLastName,
          password_hash: hashedPassword,
          role: "student",
          is_verified: false,
          otp,
          otp_expires_at: otpExpiry,
          otp_attempts: 0,
        },
      ])
      .select("user_id, email")
      .single();

    if (insertError) {
      console.error("User insert error:", insertError);
      return NextResponse.json(
        { message: "Registration failed" },
        { status: 500 }
      );
    }

    /* -------------------- SEND OTP EMAIL -------------------- */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const displayName =
      cleanFirstName || cleanLastName
        ? `${cleanFirstName || ""} ${cleanLastName || ""}`.trim()
        : "there";

    await transporter.sendMail({
      from: `"MyApp Support" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Verify your email address",
      html: buildOtpEmailTemplate({
        name: displayName,
        otp,
      }),
    });

    /* -------------------- TEMP SESSION (PRE-VERIFICATION) -------------------- */
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        role: "student",
        name: displayName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        message:
          "Registration successful. Please check your email for the verification code.",
      },
      { status: 201 }
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
    console.error("Registration API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ---------------------------------------------------------
   EMAIL TEMPLATE
--------------------------------------------------------- */
function buildOtpEmailTemplate({ name, otp }) {
  return `
  <div style="font-family: Inter, Arial, sans-serif; background:#f6f7fb; padding:40px 0;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
      
      <div style="padding:24px 32px; background:#4f46e5; color:#ffffff;">
        <h1 style="margin:0; font-size:22px;">MyApp</h1>
      </div>

      <div style="padding:32px;">
        <p style="font-size:16px; color:#111827;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#374151; line-height:1.6;">
          Thanks for signing up! Please use the one-time verification code below
          to complete your registration.
        </p>

        <div style="margin:32px 0; text-align:center;">
          <span style="
            display:inline-block;
            padding:16px 32px;
            font-size:28px;
            letter-spacing:6px;
            font-weight:700;
            color:#4f46e5;
            background:#eef2ff;
            border-radius:10px;
          ">
            ${otp}
          </span>
        </div>

        <p style="font-size:14px; color:#6b7280;">
          ⏱ This code will expire in <strong>10 minutes</strong>.
        </p>

        <p style="font-size:14px; color:#6b7280;">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <hr style="margin:32px 0; border:none; border-top:1px solid #e5e7eb;" />

        <p style="font-size:12px; color:#9ca3af; text-align:center;">
          © ${new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </div>
  </div>
  `;
}
