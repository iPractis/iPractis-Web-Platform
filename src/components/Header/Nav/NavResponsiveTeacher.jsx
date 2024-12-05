import Image from "next/image";
import Link from "next/link";

// Images
import messageNotification from "@/public/icons/message-notifications.png";
import tutor from "@/public/images/tutor-image-preview.png";
import ipractisIcon from "@/public/icons/ipractis-icon.png";
import notification from "@/public/icons/notification.png";
import hamburguer from "@/public/icons/hamburguer.png";

const NavResponsiveTeacher = () => {
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
      </div>
    </div>
  );
};

export default NavResponsiveTeacher;
