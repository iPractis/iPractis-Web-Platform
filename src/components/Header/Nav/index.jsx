"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

import NavResponsiveTeacher from "./NavResponsiveTeacher";
import NavDesktopTeacher from "./NavDesktopTeacher";
import NavResponsive from "./NavResponsive";
import NavDesktop from "./NavDestop";
import NavDesktopLogin from "./NavDesktopLogin";

const Nav = () => {
  const { authenticated, user, loading } = useAuth();
  const pathname = usePathname();

  // Avoid flicker
  if (loading) return null;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav
      className={`m-2 p-1.5 rounded-[22px] ${
        isAuthPage ? "bg-transparent" : "bg-primary-color-P1"
      }`}
    >
      {authenticated && user ? (
        <>
          {/* Authenticated */}
          <div className="hidden lg:block">
            <NavDesktopTeacher userName={user?.firstName || user?.email} />
          </div>

          <div className="block lg:hidden">
            <NavResponsiveTeacher userName={user?.firstName || user?.email} />
          </div>
        </>
      ) : isAuthPage ? (
        <>
          {/* Login & Register */}
          <div className="hidden lg:block">
            <NavDesktopLogin />
          </div>

          <div className="block lg:hidden">
            <NavResponsive />
          </div>
        </>
      ) : (
        <>
          {/* Public (Before Login) */}
          <div className="hidden lg:block">
            <NavDesktop />
          </div>

          <div className="block lg:hidden">
            <NavResponsive />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
