// app/api/auth/send-otp/route.js
import { supabaseServer } from "../../../../lib/supabaseClient";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // check if user exists
    const { data: user, error: fetchError } = await supabaseServer
      .from("users")
      .select("user_id, email")
      .eq("email", email)
      .single();

    if (fetchError || !user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // update user with OTP
    const { error: updateError } = await supabaseServer
      .from("users")
      .update({ otp, otp_expires_at: otpExpiry.toISOString(), otp_attempts: 0 })
      .eq("email", email);

    if (updateError) throw updateError;

    // send OTP via email
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
      subject: "🔑 Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
          <p style="color: #555; font-size: 16px;">Use this code to proceed: </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; padding: 15px 30px; font-size: 22px; font-weight: bold; letter-spacing: 3px; color: #fff; background: #4f46e5; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          <p style="color: #555; font-size: 14px;">This code expires in 10 minutes. If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ message: "OTP sent successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
