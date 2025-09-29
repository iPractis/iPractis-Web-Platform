// app/api/auth/verify-otp/route.js
import { supabaseServer } from "../../../../lib/supabaseClient";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ message: "Email and OTP are required" }), { status: 400 });
    }

    // fetch user
    const { data: user, error } = await supabaseServer
      .from("users")
      .select("user_id, otp, otp_expires_at, otp_attempts, is_verified")
      .eq("email", email)
      .single();


    if (error || !user) {
        console.log("error" , error)
        console.log("user" ,user)
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // already verified
    if (user.is_verified) {
      return new Response(JSON.stringify({ message: "User already verified" }), { status: 200 });
    }

    // check attempts
    if (user.otp_attempts >= 3) {
        console.log("reached here")
      return new Response(JSON.stringify({ message: "Too many attempts. Please request a new OTP." }), { status: 403 });
    }

    // check expiry
    const now = new Date();
    if (!user.otp_expires_at || new Date(user.otp_expires_at) < now) {
        console.log("reached here expired")
      return new Response(JSON.stringify({ message: "OTP expired. Please request a new one." }), { status: 400 });
    }

    // check otp
    if (user.otp !== otp) {
      // increment attempts
      await supabaseServer
        .from("users")
        .update({ otp_attempts: user.otp_attempts + 1 })
        .eq("user_id", user.user_id);

        console.log("reached till here")
      return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
    }

    // ✅ OTP correct → verify user
    await supabaseServer
      .from("users")
      .update({
        is_verified: true,
        otp: null,
        otp_expires_at: null,
        otp_attempts: 0
      })
      .eq("user_id", user.user_id);

    // Create JWT token for auto-login after verification
  const token = jwt.sign(
    { 
    userId: user.user_id, 
    email: email,
    role: "student", // Default role for new users
    firstName: email.split('@')[0]
    },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
  );

  // Create response with HTTP-only cookie
  const response = new Response(JSON.stringify({ message: "Verification successful" }), { 
  status: 200 
  });

// Set HTTP-only cookie
  response.cookies.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  path: '/'
  });



  return response;
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
