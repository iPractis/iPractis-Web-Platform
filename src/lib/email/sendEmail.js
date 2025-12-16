import nodemailer from "nodemailer";
import { supabaseServer } from "../supabaseServer";
import { supabaseClient } from "../supabaseClient";

export async function sendEmail({
  toUserId,
  to, // optional direct email
  subject,
  html,
  text,
}) {
  try {
    // Create transporter (same pattern as OTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let recipientEmail = to;

    // Resolve email via userId if provided
    if (!recipientEmail && toUserId) {
      const { data: user, error } = await supabaseClient
        .from("users")
        .select("email")
        .eq("user_id", toUserId)
        .single();

      if (error || !user?.email) {
        throw new Error("Failed to resolve recipient email");
      }

      recipientEmail = user.email;
    }

    if (!recipientEmail) {
      throw new Error("Recipient email missing");
    }

    const mailOptions = {
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject,
      text: text || undefined,
      html,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.error("SEND_EMAIL_FAILED", err);
    return false;
  }
}
