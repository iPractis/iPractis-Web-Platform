import {
  AddBGIcon,
  AddIcon,
  DashboardIcon,
  NewMessageIcon,
  NotificationIcon,
  UserScreenIcon,
  WalletBgIcon,
  WalletIcon,
} from "../../Icons";
import Image from "next/image";
import Link from "next/link";

// Images && icons
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";
import NavDropdown from "./NavDropdown";

const NavDesktopTeacher = ({ userName }) => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      {/* Left Column */}
      <Link href="/">
        <Image
          className="w-[113px] p-1.5"
          alt="Logo iPractis"
          src={logo}
          priority
        />
      </Link>

      {/* Center Column */}
      <div className="flex items-center gap-4">
        <Link
          className="btn btn-quinary flex items-center px-4 rounded-[10px] py-2 gap-3 ST-SB-4 group"
          href="#"
        >
          <DashboardIcon />
          Dashboard
        </Link>

        <Link
          className="btn btn-quinary flex items-center px-4 rounded-[10px] py-2 gap-1 ST-SB-4 group"
          href="#"
        >
          <UserScreenIcon />
          Find a teacher
        </Link>
      </div>

      {/* Right Column */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-3 rounded-2xl h-[38px] p-1.5 text-primary-color-P1 bg-primary-color-P12">
          <div className="rounded-[10px] bg-primary-color-P1">
            <WalletBgIcon fillColor={"fill-primary-color-P1"} />
          </div>

          <p className="ST-SB-4">0</p>

          <p className="ST-3">USD</p>

          <button className="rounded-[10px] bg-primary-color-P1">
            <AddBGIcon strokeColor={"fill-primary-color-P12"} />
          </button>
        </div>

        <div className="flex items-center">
          {/* Notifications Button */}
          <div className="flex px-4 py-2">
            <button className="relative">
              <NotificationIcon />

              <div className="bg-septenary-color-MA5 rounded-full h-[5px] w-[5px] absolute right-0 top-0"></div>
            </button>
          </div>

          {/* Message Button */}
          <div className="flex px-4 py-2">
            <button className="relative">
              <NewMessageIcon />

              <div className="bg-septenary-color-MA5 rounded-full h-[5px] w-[5px] absolute right-0 top-0"></div>
            </button>
          </div>
        </div>

        {/* Tutor Dropdown */}
        <NavDropdown isDropdownHidden={"md:block hidden"} userName={userName} />

        {/* Theme and language buttons */}
        <button
          className="btn btn-tertiary rounded-[10px] h-[38px] w-[38px]"
          button="button"
        >
          <Image
            alt="Theme Light"
            src={world}
            className="w-5 mx-auto"
            priority
          />
        </button>

        <button
          className="btn btn-tertiary rounded-[10px] h-[38px] w-[38px]"
          button="button"
        >
          <Image
            alt="Theme Light"
            src={themeLight}
            className="w-5 mx-auto"
            priority
          />
        </button>
      </div>
    </div>
  );
};

export default NavDesktopTeacher;
