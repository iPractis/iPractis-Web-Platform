// Images
import profileSettingsIcon from "@/public/icons/profile-settings-icon.png";
import ipractisIcon from "@/public/icons/ipractis-icon.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import whiteDoor from "@/public/icons/white-door.png";

import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-primary-color-P1 m-2 p-1.5 rounded-2xl">
      <div className="md:block hidden">
        <NavDesktop />
      </div>

      <div className="md:hidden block">
        <NavResponsive />
      </div>
    </nav>
  );
};

export default Nav;

const NavDesktop = () => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      <div>
        <Link href="/">
          <Image
            className="w-[148px] p-1.5"
            alt="Logo iPractis"
            src={logo}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-7">
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-primary-color-P12 ST-SB-4"
        >
          Log in{" "}
          <Image alt="Logo iPractis" src={whiteDoor} className="w-5" priority />
        </Link>

        <Link
          href="/register"
          className="btn btn-tertiary ST-SB-4 py-2 px-4 rounded-[10px]"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

const NavResponsive = () => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      <div>
        <Link href="/">
          <Image
            className="w-8"
            alt="Logo iPractis"
            src={ipractisIcon}
            priority
          />
        </Link>
      </div>

      <div>
        <Image
          className="w-8 cursor-pointer"
          alt="Profile Settings Icon"
          src={profileSettingsIcon}
          priority
        />
      </div>
    </div>
  );
};
