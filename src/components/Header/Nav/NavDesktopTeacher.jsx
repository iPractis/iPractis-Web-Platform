import {
  AddIcon,
  ChevronRightDoorBoldIcon,
  DashboardIcon,
  NewMessageIcon,
  NotificationIcon,
  SearchIcon,
  UserScreenIcon,
  WalletIcon,
} from "../../Icons";
import Image from "next/image";
import Link from "next/link";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

// Images && icons
import hamburguer from "@/public/icons/profile-settings-icon-transparent.png";
import tutor from "@/public/images/tutor-image-preview.png";
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";
import { signOut } from "next-auth/react";

const NavDesktopTeacher = () => {
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
          className="btn btn-quinary flex items-center lg:px-4 rounded-[10px] lg:py-2 gap-3 ST-SB-4 group"
          href="#"
        >
          <DashboardIcon />
          Dashboard
        </Link>

        <Link
          className="btn btn-quinary flex items-center lg:px-4 rounded-[10px] lg:py-2 gap-1 ST-SB-4 group"
          href="#"
        >
          <UserScreenIcon />
          Find a teacher
        </Link>

        {/* <button className="text-white" onClick={() => signOut( )}>Sign Out</button> */}
      </div>

      {/* Right Column */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-3 text-primary-color-P12">
          <WalletIcon />

          <p className="ST-SB-4">0</p>

          <p className="ST-3">USD</p>

          <button className="flex justify-center items-center rounded-[10px] w-[26px] h-[26px] bg-primary-color-P12">
            <AddIcon />
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
        <Dropdown
          classNames={{
            content: "bg-primary-color-P1 min-w-[300px] p-3",
          }}
          backdrop="blur"
        >
          <DropdownTrigger>
            <button className="flex items-center gap-1 p-1.5 rounded-[10px] bg-primary-color-P12">
              <Image
                className="w-[26px] rounded"
                alt="Tutor Profile Image"
                src={tutor}
                priority
              />

              <Image
                className="w-[26px]"
                alt="Hamburguer Icon"
                src={hamburguer}
                priority
              />
            </button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Static Actions"
            variant="faded"
            classNames={{
              base: "p-0",
            }}
          >
            <DropdownItem className="disable-hover" key="logOut">
              <Link
                href="/login"
                className="btn btn-senary group w-full px-4 py-2 rounded-lg flex justify-center items-center"
              >
                <div className="flex-1">
                  <ChevronRightDoorBoldIcon
                    fillColor={"fill-primary-color-P12"}
                  />
                </div>

                <span className="sm:flex-[85%] flex-[80%]">Log out</span>
              </Link>
            </DropdownItem>

            <DropdownItem
              className="disable-hover mt-[5px] mb-[30px]"
              key="register"
            >
              <Link
                href="/register"
                className="btn btn-primary w-full px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </DropdownItem>

            <DropdownItem className="disable-hover" key="findTutor">
              <Link
                className="btn btn-senary group w-full px-4 py-2 rounded-lg flex justify-center items-center"
                href="#"
              >
                <span className="sm:flex-[85%] flex-[80%]">Find a Tutor</span>

                <div className="flex-1">
                  <SearchIcon fillColor={"fill-primary-color-P12"} />
                </div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

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
