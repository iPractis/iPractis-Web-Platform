import Image from "next/image";
import Link from "next/link";

// Images && icons
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";

const NavDesktop = () => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      <div>
        <Link href="/">
          <Image
            className="w-[113px] p-1.5"
            alt="Logo iPractis"
            src={logo}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-1.5">
        <Link
          href="/login"
          className="btn btn-quinary flex items-center rounded-[10px] px-4 py-2 gap-1.5 ST-SB-4 group"
        >
          Log in{" "}

          {/* Svg of log in icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            height="20"
            width="20"
          >
            <path
              d="M9.58366 10.5923C9.91316 10.2662 9.91316 9.73389 9.58366 9.40777L7.22663 7.07491C6.70043 6.55411 5.80708 6.92685 5.80708 7.6672V9.16672L2.50033 9.16671C2.04009 9.16671 1.66699 9.53981 1.66699 10C1.66699 10.4603 2.04009 10.8334 2.50033 10.8334L5.80708 10.8334V12.3329C5.80708 13.0733 6.70043 13.446 7.22663 12.9252L9.58366 10.5923Z"
              className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
            />
            <path
              d="M11.667 3.80138C11.667 3.03661 12.1875 2.36997 12.9294 2.18448L16.2628 1.35112C17.3147 1.08814 18.3337 1.88374 18.3337 2.96803V17.0321C18.3337 18.1164 17.3147 18.912 16.2628 18.649L12.9294 17.8157C12.1875 17.6302 11.667 16.9635 11.667 16.1988V3.80138Z"
              className="fill-primary-color-P12 group-hover:fill-primary-color-P1"
            />
          </svg>
        </Link>

        <Link
          href="/register"
          className="btn btn-tertiary ST-SB-4 py-2 px-4 rounded-[10px]"
        >
          Register
        </Link>

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

export default NavDesktop;
