"use client";
import NavResponsiveTeacher from "./NavResponsiveTeacher";
import NavDesktopTeacher from "./NavDesktopTeacher";
import { useSession } from "next-auth/react";
import NavResponsive from "./NavResponsive";
import NavDesktop from "./NavDestop";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-primary-color-P1 m-2 p-1.5 rounded-[22px]">
      {session?.user?.token ? (
        <>
          <div className="md:block hidden">
            <NavDesktopTeacher userName={session?.user?.firstName} />
          </div>

          <div className="md:hidden block">
            <NavResponsiveTeacher userName={session?.user?.firstName} />
          </div>
        </>
      ) : (
        <>
          <div className="md:block hidden">
            <NavDesktop />
          </div>

          <div className="md:hidden block">
            <NavResponsive />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
