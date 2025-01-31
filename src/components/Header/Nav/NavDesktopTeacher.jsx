import {
  AddBGIcon,
  NewMessageIcon,
  NotificationIcon,
  WalletBgIcon,
} from "../../Icons";
import Image from "next/image";
import Link from "next/link";

import NavDropdown from "./NavDropdown";
import NavSearchBar from "./NavSearchBar";

// Images && icons
import logo from "@/public/logos/ipractis-logo-1.png";

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

      {/* Right Column */}
      <div className="flex items-center gap-4">
        <NavSearchBar />

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
              <NewMessageIcon fillColor={"fill-primary-color-P12"} />

              <div className="bg-septenary-color-MA5 rounded-full h-[5px] w-[5px] absolute right-0 top-0"></div>
            </button>
          </div>
        </div>

        {/* Tutor Dropdown */}
        <NavDropdown isDropdownHidden={"lg:block hidden"} userName={userName} />
      </div>
    </div>
  );
};

export default NavDesktopTeacher;
