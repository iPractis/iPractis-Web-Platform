import {
  CameraBoxIcon,
  ChevronRightDoorBoldestIcon,
  DashboardIcon,
  DialogMarkIcon,
  SearchIcon,
  SettingsIcon,
  UserHatIcon,
  UserIcon,
} from "../../Icons";

import hamburguer from "@/public/icons/profile-settings-icon-transparent.png";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import tutor from "@/public/images/tutor-image-preview.png";
import { signOut } from "next-auth/react";
import Image from "next/image";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

const NavDropdown = () => {
  return (
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
                <h2 className="text-primary-color-P12 ST-3">Hi, Alexandra</h2>
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
            <div className="me-0">
              <UserIcon
                fillColor={
                  "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                }
              />
            </div>

            <h3>Profile</h3>
          </button>
        </DropdownItem>

        <DropdownItem className="p-0 mb-1.5" key="dashboard">
          <button
            type="button"
            className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
          >
            <div className="me-1">
              <DashboardIcon
                fillColor={
                  "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                }
              />
            </div>

            <h3>Dashboard</h3>
          </button>
        </DropdownItem>

        <DropdownItem className="p-0 mb-1.5" key="classroom">
          <button
            type="button"
            className="btn btn-quinary rounded-lg flex gap-4 px-4 py-1.5 w-full group"
          >
            <div className="me-0.5">
              <CameraBoxIcon
                fillColor={
                  "fill-primary-color-P12 group-hover:fill-primary-color-P1"
                }
                strokeColor={
                  "stroke-primary-color-P12 group-hover:stroke-primary-color-P1"
                }
              />
            </div>

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

        <DropdownItem className="p-0 disable-hover" key="logOut">
          <button
            type="submit"
            onClick={() => signOut()}
            className="btn btn-quinary text-septenary-color-MA6 hover:text-septenary-color-MA6 rounded-lg flex gap-4 px-4 py-1.5 w-full group"
          >
            <ChevronRightDoorBoldestIcon
              fillColor={"fill-septenary-color-MA6"}
              strokeColor={"stroke-septenary-color-MA6"}
            />

            <h3>Log out</h3>
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropdown;
