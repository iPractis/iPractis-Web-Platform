"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import {usePathname} from "next/navigation";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
console.log(session, status, "LAYOUT SESSION");
  useEffect(() => {
    if (!session?.user?.token && status !== "loading") {
      redirect("/login");
    }

    if (session?.user && status !== "loading") {
      const userRole = session.user.role || "student";
      
      // Teacher registration - only students can apply or teachers can edit
      if (pathname.startsWith('/teacher-registration')) {
        if (userRole !== "student" && userRole !== "teacher") {
          redirect("/dashboard");
        }
      }
      
      // Future admin routes(if applicable)
      if (pathname.startsWith('/admin')) {
        if (userRole !== "admin") {
          redirect("/dashboard");
        }
      }
    }
    
  }, [session,status,pathname]);

  if (!session?.user?.token) {
    return null; // Blocking the rendering completely to avoid flashing unprotected content
  }

  return children;
};

export default Layout;
