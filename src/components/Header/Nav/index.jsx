import { auth } from "@/src/auth";

import NavResponsiveTeacher from "./NavResponsiveTeacher";
import NavDesktopTeacher from "./NavDesktopTeacher";
import NavResponsive from "./NavResponsive";
import NavDesktop from "./NavDestop";

const Nav = async () => {
  // const session = await auth();
  // console.log(session);
  // if (!session?.user) return null;

  const userInfo = {
    name: "Josh",
    email: "joshuadeveloper25@gmail.com",
    access_token: true,
  };

  return (
    <nav className="bg-primary-color-P1 m-2 p-1.5 rounded-2xl">
      {userInfo?.access_token ? (
        <>
          <div className="md:block hidden">
            <NavDesktopTeacher />
          </div>

          <div className="md:hidden block">
            <NavResponsiveTeacher />
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
