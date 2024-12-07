import Image from "next/image";
import Link from "next/link";

// Images && icons
import hamburguer from "@/public/icons/profile-settings-icon-transparent.png";
import messageNotification from "@/public/icons/message-notifications.png";
import tutor from "@/public/images/tutor-image-preview.png";
import notification from "@/public/icons/notification.png";
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import wallet from "@/public/icons/wallet.png";
import world from "@/public/icons/world.png";
import add from "@/public/icons/add.png";

const NavDesktopTeacher = () => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      {/* Left Column */}
      <div className="flex items-center lg:gap-[50px]">
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
            className="btn btn-quinary flex items-center lg:px-4 rounded-[10px] lg:py-2 gap-3 ST-SB-4 group"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect
                x="15.7627"
                y="0.5"
                width="6.5625"
                height="6.5625"
                rx="2"
                transform="rotate(90 15.7627 0.5)"
                className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
              />
              <rect
                x="7.3252"
                y="0.5"
                width="6.5625"
                height="6.5625"
                rx="2"
                transform="rotate(90 7.3252 0.5)"
                className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
              />
              <rect
                x="15.7627"
                y="8.9375"
                width="6.5625"
                height="15"
                rx="2"
                transform="rotate(90 15.7627 8.9375)"
                className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
              />
            </svg>
            Dashboard
          </Link>

          <Link
            className="btn btn-quinary flex items-center lg:px-4 rounded-[10px] lg:py-2 gap-1 ST-SB-4 group"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M1.92839 0C1.00791 0 0.261719 0.746192 0.261719 1.66667V11.6667C0.261719 12.5871 1.00791 13.3333 1.92839 13.3333H3.10263C3.85123 11.058 5.76623 9.27286 8.18174 8.61118C6.93447 7.89122 6.09505 6.54364 6.09505 5C6.09505 2.69881 7.96053 0.833333 10.2617 0.833333C12.5629 0.833333 14.4284 2.69881 14.4284 5C14.4284 6.54364 13.589 7.89122 12.3417 8.61118C14.7572 9.27286 16.6722 11.058 17.4208 13.3333H18.5951C19.5155 13.3333 20.2617 12.5871 20.2617 11.6667V1.66667C20.2617 0.746192 19.5155 0 18.5951 0H1.92839Z"
                className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
              />
              <path
                d="M13.595 5C13.595 6.84095 12.1027 8.33333 10.2617 8.33333C8.42077 8.33333 6.92838 6.84095 6.92838 5C6.92838 3.15905 8.42077 1.66667 10.2617 1.66667C12.1027 1.66667 13.595 3.15905 13.595 5Z"
                className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
              />
              <path
                d="M16.9284 15.2017C16.9284 18.5347 13.8448 18.3309 10.163 18.3309C6.48105 18.3309 3.59505 18.5347 3.59505 15.2017C3.59505 11.8686 6.57982 9.16667 10.2617 9.16667C13.9436 9.16667 16.9284 11.8686 16.9284 15.2017Z"
                className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
              />
            </svg>
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
