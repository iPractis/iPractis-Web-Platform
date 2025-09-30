"use client";
import NavResponsiveTeacher from "./NavResponsiveTeacher";
import NavDesktopTeacher from "./NavDesktopTeacher";
import { useAuth } from "@/src/hooks/useAuth";
import NavResponsive from "./NavResponsive";
import NavDesktop from "./NavDestop";

const Nav = () => {
  // const { data: session } = useSession();
  const { authenticated, user, loading } = useAuth();


  return (
    <nav className="bg-primary-color-P1 m-2 p-1.5 rounded-[22px]">
      {authenticated && user? (
        <>
          <div className="lg:block hidden">
            <NavDesktopTeacher userName={user?.firstName || user?.email} />
          </div>

          <div className="lg:hidden block">
            <NavResponsiveTeacher userName={user?.firstName || user?.email} />
          </div>
        </>
      ) : (
        <>
          <div className="lg:block hidden">
            <NavDesktop />
          </div>

          <div className="lg:hidden block">
            <NavResponsive />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
