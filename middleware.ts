import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
// src/middleware.ts



export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for the public paths
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') ||
    pathname.includes('.') || pathname === '/') {
    return;
  }

  // Public routes
  const publicRoutes = ['/login', '/register', '/authenticator', '/dashboard',
    '/apply-as-teacher', '/support-request', '/password-recovery'];

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return;
  }

  // Get token from httpOnly cookie now
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    // Role-based access control
    const userRole = decoded.role || "student";

    // Teacher routes
    if (pathname.startsWith('/teacher-registration')) {
      if (userRole !== "student" && userRole !== "teacher") {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Admin routes
    if (pathname.startsWith('/admin')) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};