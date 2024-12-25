import Image from "next/image";
import Link from "next/link";

// Images
import messageNotification from "@/public/icons/message-notifications.png";
import ipractisIcon from "@/public/icons/ipractis-icon.png";
import notification from "@/public/icons/notification.png";
import NavDropdown from "./NavDropdown";

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

      <div className="flex items-center gap-1.5">
        <div className="flex items-center">
          {/* Notifications Button */}
          <div className="flex px-2.5 py-2">
            <button className="relative">
              <Image
                className="w-5 rounded"
                alt="Notification icon"
                src={notification}
                priority
              />

              <div className="bg-septenary-color-MA5 rounded-full h-[5px] w-[5px] absolute right-0 top-0"></div>
            </button>
          </div>

          {/* Message Button */}
          <div className="flex px-2.5 py-2">
            <button type="button" className="relative">
              <Image
                className="w-5 rounded"
                alt="Message icon"
                src={messageNotification}
                priority
              />

              <div className="bg-septenary-color-MA5 rounded-full h-[5px] w-[5px] absolute right-0 top-0"></div>
            </button>
          </div>
        </div>

        {/* Tutor Dropdown */}
        <NavDropdown isDropdownHidden={"md:hidden block"} userName={userName} />
      </div>
    </div>
  );
};

export default NavResponsiveTeacher;
