"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import {usePathname} from "next/navigation";

const Layout = ({ children }) => {
  const { authenticated, user, loading } = useAuth();
  const pathname = usePathname();
console.log(authenticated, user, loading, "LAYOUT SESSION");
  useEffect(() => {
    if (!loading && !authenticated) {
      redirect("/login");
    }

    if (authenticated && user && !loading) {
      const userRole = user.role || "student";
      
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
    
  }, [authenticated,loading,user,pathname]);

  if (!authenticated) {
    return null; // Blocking the rendering completely to avoid flashing unprotected content
  }

  return children;
};

export default Layout;
