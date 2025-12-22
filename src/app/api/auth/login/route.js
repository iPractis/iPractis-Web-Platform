import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function POST(req) {
  const requestId = crypto.randomUUID();

  try {
    console.log("🔐 LOGIN START", {
      requestId,
      nodeEnv: process.env.NODE_ENV,
      hasJwtSecret: !!process.env.JWT_SECRET,
      timestamp: new Date().toISOString(),
    });

    /* ---------------------------------------------------------
       1️⃣ Parse request
    --------------------------------------------------------- */
    const body = await req.json();
    console.log("📦 REQUEST BODY", {
      requestId,
      hasEmail: !!body?.email,
      hasPassword: !!body?.password,
    });

    const { email, password } = body;

    if (!email || !password) {
      console.warn("❌ Missing credentials", { requestId });
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log("📧 NORMALIZED EMAIL", { requestId, normalizedEmail });

    /* ---------------------------------------------------------
       2️⃣ Supabase query
    --------------------------------------------------------- */
    console.log("🗄️ QUERYING SUPABASE", {
      requestId,
      usingServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    const { data: user, error } = await supabaseServer
      .from("users")
      .select("user_id, email, password_hash, first_name, last_name, role")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error("❌ SUPABASE ERROR", {
        requestId,
        errorCode: error.code,
        errorMessage: error.message,
      });
    }

    if (!user) {
      console.warn("❌ USER NOT FOUND", {
        requestId,
        normalizedEmail,
      });
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("✅ USER FOUND", {
      requestId,
      userId: user.user_id,
      role: user.role,
      hasPasswordHash: !!user.password_hash,
    });

    /* ---------------------------------------------------------
       3️⃣ Password check
    --------------------------------------------------------- */
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log("🔑 PASSWORD CHECK", {
      requestId,
      isPasswordValid,
    });

    if (!isPasswordValid) {
      console.warn("❌ PASSWORD MISMATCH", { requestId });
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* ---------------------------------------------------------
       4️⃣ JWT generation
    --------------------------------------------------------- */
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET MISSING", { requestId });
      return NextResponse.json(
        { message: "Auth misconfiguration" },
        { status: 500 }
      );
    }

    const displayName =
      user.first_name || user.last_name
        ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
        : user.email.split("@")[0];

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

    console.log("🪙 JWT GENERATED", {
      requestId,
      tokenLength: token.length,
    });

    /* ---------------------------------------------------------
       5️⃣ Cookie + response
    --------------------------------------------------------- */
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
      sameSite: "strict", // ⚠️ may change later
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    console.log("🍪 COOKIE SET", {
      requestId,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("✅ LOGIN SUCCESS", { requestId });
    return response;
  } catch (err) {
    console.error("🔥 LOGIN API CRASH", {
      requestId,
      message: err?.message,
      stack: err?.stack,
    });

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
