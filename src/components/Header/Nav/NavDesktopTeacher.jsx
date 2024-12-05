import Image from "next/image";
import Link from "next/link";

// Images && icons
import messageNotification from "@/public/icons/message-notifications.png";
import tutor from "@/public/images/tutor-image-preview.png";
import notification from "@/public/icons/notification.png";
import themeLight from "@/public/icons/theme-light.png";
import hamburguer from "@/public/icons/hamburguer.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import dashboard from "@/public/icons/dashboard.png";
import teacher from "@/public/icons/teacher.png";
import wallet from "@/public/icons/wallet.png";
import world from "@/public/icons/world.png";
import add from "@/public/icons/add.png";

const NavDesktopTeacher = () => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      {/* Left Column */}
      <div className="flex items-center gap-[50px]">
        <Link href="/">
          <Image
            className="w-[113px] p-1.5"
            alt="Logo iPractis"
            src={logo}
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            className="flex items-center px-4 py-2 gap-3 text-primary-color-P12 ST-SB-4"
            href="#"
          >
            <Image
              alt="Logo iPractis"
              src={dashboard}
              className="w-5"
              priority
            />{" "}
            Dashboard
          </Link>

          <Link
            className="flex items-center px-4 py-2 gap-1 text-primary-color-P12 ST-SB-4"
            href="#"
          >
            <Image alt="Teacher icon" src={teacher} className="w-5" priority />{" "}
            Find a teacher
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-3 text-primary-color-P12">
          <Image className="w-[26px]" alt="Wallet icon" src={wallet} priority />

          <p className="ST-SB-4">0</p>

          <p className="ST-3">USD</p>

          <button className="flex justify-center items-center rounded-[10px] w-[26px] h-[26px] bg-primary-color-P12">
            <Image className="w-3 h-3" alt="Add icon" src={add} priority />
          </button>
        </div>

        <div className="flex items-center">
          {/* Notifications Button */}
          <div className="flex px-4 py-2">
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
          <div className="flex px-4 py-2">
            <button className="relative">
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
