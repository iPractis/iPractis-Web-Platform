import { auth } from "./src/auth"
import jwt from "jsonwebtoken";

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth?.user?.token
  
  // Skip middleware for the public paths
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || 
      pathname.includes('.') || pathname === '/') {
    return;
  }

  
  // Public routes- no authentication needed
  const publicRoutes = ['/login', '/register', '/authenticator', '/dashboard', 
                       '/apply-as-teacher', '/support-request', '/password-recovery'];
  
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  if (isPublicRoute) {
    return; // Allow access to public routes
  }
  
  // All other routes require authentication
  if (!isAuthenticated) {
    return Response.redirect(new URL('/login', req.url));
  }
  
  // ROLE-BASED ACCESS CONTROL for the LOGGED-IN users
  let userRole = "student"; // default
  
  if (req.auth?.user?.token) {
    try {
      const decoded = jwt.verify(req.auth.user.token, process.env.JWT_SECRET);
      userRole = decoded.role || "student";
    } catch (error) {
      return Response.redirect(new URL('/login', req.url));
    }
  }
  
  // Teacher only routes
  if (pathname.startsWith('/teacher-registration')) {
    // Only allow students to apply as teachers or existing teachers to edit
    if (userRole !== "student" && userRole !== "teacher") {
      return Response.redirect(new URL('/dashboard', req.url));
    }
  }
  
  // Future: Admin-only routes
  if (pathname.startsWith('/admin')) {
    if (userRole !== "admin") {
      return Response.redirect(new URL('/dashboard', req.url));
    }
  }
  
  // Account settings accessible to all authenticated users
  if (pathname.startsWith('/account-settings')) {
    // All authenticated users can access - no additional role check needed
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
