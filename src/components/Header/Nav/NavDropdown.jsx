// Icons && images
import hamburguer from "@/public/icons/profile-settings-icon-transparent.png";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import tutor from "@/public/images/tutor-image-preview.png";

import {
  CameraBoxMediumIcon,
  ChevronRightSmallerIcon,
  DashboardMediumIcon,
  GearSmallIcon,
  HeartSmallIcon,
  HelpSmallerIcon,
  SearchSmallerIcon,
  UserSmallerIcon,
  UserTieSmallerIcon,
  UserToolsIcon,
} from "../../Icons";

import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
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

const NavDropdown = ({ isDropdownHidden, userName }) => {
  return (
    <Dropdown
      classNames={{
        content: "bg-primary-color-P1 min-w-[300px] p-3",
      }}
      backdrop="opaque"
    >
      <DropdownTrigger>
        <button className="flex items-center gap-1 p-1.5 rounded-2xl bg-primary-color-P12">
          <Image
            className="w-[26px] rounded-[10px]"
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

      <div className={isDropdownHidden}>
        <DropdownMenu
          aria-label="Static Actions"
          variant="light"
          classNames={{
            base: "p-0",
          }}
        >
          {/* Hi, User! */}
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
                    className="size-9 object-cover rounded-[10px]"
                    src={tutorImagePreview}
                  />
                </div>

                <div>
                  <h2 className="text-primary-color-P12 ST-3">
                    Hi, {userName}
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

          {/* Dashboard */}
          <DropdownItem className="p-0 mb-1.5" key="dashboard">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <DashboardMediumIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Dashboard</h3>
            </button>
          </DropdownItem>

          {/* Classroom */}
          <DropdownItem className="p-0 mb-1.5" key="classroom">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <CameraBoxMediumIcon
                  fillColor={"fill-primary-color-P1"}
                  strokeColor={"stroke-primary-color-P1"}
                />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Classroom</h3>
            </button>
          </DropdownItem>

          {/* Find tutor */}
          <DropdownItem className="p-0 mb-1.5" key="findATutor">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <SearchSmallerIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Find a Tutor</h3>
            </button>
          </DropdownItem>

          {/* Profile */}
          <DropdownItem className="p-0 mb-1.5" key="profile">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <UserSmallerIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Profile</h3>
            </button>
          </DropdownItem>

          {/* Profile Settings */}
          <DropdownItem className="p-0 mb-1.5" key="profileSettings">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <UserToolsIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Profile&#39;s settings</h3>
            </button>
          </DropdownItem>

          {/* Account Settings */}
          <DropdownItem className="p-0 mb-1.5" key="accountSettings">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <GearSmallIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Account&#39;s settings</h3>
            </button>
          </DropdownItem>

          {/* Favorite teachers */}
          <DropdownItem className="p-0 mb-1.5" key="favoriteTeachers">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <HeartSmallIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Favorite teachers</h3>
            </button>
          </DropdownItem>

          {/* Become a teacher */}
          <DropdownItem className="p-0 my-[30px]" key="becomeATeacher">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <UserTieSmallerIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Become a teacher</h3>
            </button>
          </DropdownItem>

          {/* Assistance */}
          <DropdownItem className="p-0 mb-1.5" key="assistance">
            <button
              type="button"
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <HelpSmallerIcon fillColor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Assistance</h3>
            </button>
          </DropdownItem>

          {/* Logout */}
          <DropdownItem className="p-0 disable-hover" key="logOut">
            <button
              className="btn btn-quinary rounded-xl flex items-center gap-4 p-1 w-full hover:text-primary-color-P12 hover:bg-primary-color-P4 bg-septenary-color-MA6 "
              onClick={signOut}
              type="button"
            >
              <InputBGWrapperIcon className={"size-6 p-0 rounded-lg"}>
                <ChevronRightSmallerIcon fillColor={"fill-septenary-color-MA6"} />
              </InputBGWrapperIcon>

              <h3 className="ST-3">Log out</h3>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </div>
    </Dropdown>
  );
};

export default NavDropdown;
