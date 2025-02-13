import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import NavDropdown from "./NavDropdown";
import Image from "next/image";
import Link from "next/link";

// Images && icons
import ipractisIcon from "@/public/icons/ipractis-icon.png";

import { NewMessageCustomIcon, NotificationCustomIcon } from "../../Icons";

const NavResponsiveTeacher = ({ userName }) => {
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

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {/* Notifications Button */}
          <div className="flex p-1.5">
            <button className="relative">
              <InputBGWrapperIcon className={"p-1 size-[26px]"}>
                <NotificationCustomIcon
                  fillColor={"fill-primary-color-P1"}
                  fillCircleColor={"fill-septenary-color-MA5"}
                />
              </InputBGWrapperIcon>
            </button>
          </div>

          {/* Message Button */}
          <div className="flex p-1.5">
            <button type="button">
              <InputBGWrapperIcon className={"p-1 size-[26px]"}>
                <NewMessageCustomIcon
                  fillColor={"fill-primary-color-P1"}
                  fillCircleColor={"fill-septenary-color-MA5"}
                />
              </InputBGWrapperIcon>
            </button>
          </div>
        </div>

        {/* Tutor Dropdown */}
        <NavDropdown isDropdownHidden={"lg:hidden block"} userName={userName} />
      </div>
    </div>
  );
};

export default NavResponsiveTeacher;
