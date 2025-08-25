// app/api/auth/reset-password/route.js
import bcrypt from "bcrypt";
import { supabaseServer } from "../../../../lib/supabaseClient";

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    // fetch user
    const { data: user, error: fetchError } = await supabaseServer
      .from("users")
      .select("user_id, otp, otp_expires_at, otp_attempts")
      .eq("email", email)
      .single();

    if (fetchError || !user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // check OTP attempts
    if (user.otp_attempts >= 5) {
      return new Response(JSON.stringify({ message: "Maximum OTP attempts exceeded" }), { status: 400 });
    }

    // check OTP match
    if (user.otp !== otp) {
      // increment attempts
      await supabaseServer
        .from("users")
        .update({ otp_attempts: user.otp_attempts + 1 })
        .eq("user_id", user.user_id);
      return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
    }

    // check expiry
    if (new Date() > new Date(user.otp_expires_at)) {
      return new Response(JSON.stringify({ message: "OTP expired" }), { status: 400 });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password and clear OTP
    const { error: updateError } = await supabaseServer
      .from("users")
      .update({
        password_hash: hashedPassword,
        otp: null,
        otp_expires_at: null,
        otp_attempts: 0,
        is_verified: true,
      })
      .eq("user_id", user.user_id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
