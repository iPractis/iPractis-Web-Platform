import {
  AddIcon,
  CameraBoxIcon,
  ChevronRightDoorBoldestIcon,
  DashboardIcon,
  DialogMarkIcon,
  NewMessageIcon,
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
  UserHatIcon,
  UserIcon,
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
  RadioGroup,
  Radio,
} from "@nextui-org/react";

// Images && icons
import hamburguer from "@/public/icons/profile-settings-icon-transparent.png";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import tutor from "@/public/images/tutor-image-preview.png";
import { logOutUser } from "@/src/lib/actions/authAction";
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";

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
            variant="light"
            classNames={{
              base: "p-0",
            }}
          >
            <DropdownItem
              className="bg-primary-color-P2 p-1.5 mb-[30px]"
              key="topBox"
              isReadOnly
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div>
                    <Image
                      alt={"Tutor Image"}
                      className="w-[30px] rounded-[10px]"
                      src={tutorImagePreview}
                    />
                  </div>

                  <div>
                    <h2 className="text-primary-color-P12 ST-3">
                      Hi, Alexandra
                    </h2>
                  </div>
                </div>

                <RadioGroup
                  classNames={{
                    wrapper: "gap-0",
                  }}
                  orientation="horizontal"
                  defaultValue="connected"
                >
                  <Radio
                    className="connected"
                    classNames={{
                      wrapper: "w-2.5 h-2.5",
                      control:
                        "w-1 h-1 bg-quinary-color-VS5 checked:bg-quinary-color-VS5",
                    }}
                    color="connected"
                    value="connected"
                  ></Radio>

                  <Radio
                    className="busy"
                    classNames={{
                      wrapper: "w-2.5 h-2.5",
                      control:
                        "w-1 h-1 bg-septenary-color-MA5 checked:bg-septenary-color-MA5",
                    }}
                    color="busy"
                    value="busy"
                  ></Radio>

                  <Radio
                    className="absent"
                    classNames={{
                      wrapper: "w-2.5 h-2.5",
                      control:
                        "w-1 h-1 bg-quaternary-color-A5 checked:bg-quaternary-color-A5",
                    }}
                    color="absent"
                    value="absent"
                  ></Radio>
                </RadioGroup>
              </div>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="profile">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex items-center gap-4 px-4 py-1.5 w-full group"
              >
                <UserIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Profile</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="dashboard">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <DashboardIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Dashboard</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="classroom">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <CameraBoxIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                  strokeColor={
                    "stroke-primary-color-P12 group-hover:stroke-primary-color-P1"
                  }
                />

                <h3>Classroom</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="findTutor">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <SearchIcon
                  className={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Find a Tutor</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="favoriteTeachers">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <UserHatIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Favorite teachers</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="settings">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <SettingsIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Settings</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 my-[30px]" key="becomeTeacher">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <UserHatIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Become a teacher</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0 mb-1.5" key="assistence">
              <button
                type="button"
                className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
              >
                <DialogMarkIcon
                  fillColor={
                    "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                  }
                />

                <h3>Assistence</h3>
              </button>
            </DropdownItem>

            <DropdownItem className="p-0" key="logout">
              <form action={logOutUser}>
                <button
                  type="submit"
                  className="btn btn-quinary text-septenary-color-MA6 hover:text-septenary-color-MA6 rounded-lg flex gap-4 px-4 py-1.5 w-full group"
                >
                  <ChevronRightDoorBoldestIcon
                    fillColor={"fill-septenary-color-MA6"}
                    strokeColor={"stroke-septenary-color-MA6"}
                  />

                  <h3>Log out</h3>
                </button>
              </form>
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
