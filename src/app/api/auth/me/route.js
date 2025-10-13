import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/src/lib/supabaseClient';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { data: user, error } = await supabaseServer
          .from("teachers")
          .select(" *")
          .eq("user_id", decoded.userId)
          .single();

          console.log(user, error);

    if (error || !user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: { 
        userId: decoded.userId, 
        teacherId: user.teacher_id,
        email: decoded.email, 
        role: decoded.role || "student",
        firstName: decoded.firstName || decoded.email.split('@')[0]
      } 
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}