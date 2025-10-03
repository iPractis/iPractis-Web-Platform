import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return NextResponse.json({ 
      authenticated: true,
      user: { 
        userId: decoded.userId, 
        email: decoded.email, 
        role: decoded.role || "student",
        firstName: decoded.firstName || decoded.email.split('@')[0]
      } 
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}