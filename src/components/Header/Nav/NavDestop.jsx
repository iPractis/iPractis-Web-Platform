import Image from "next/image";
import Link from "next/link";

// Images && icons
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";
import { ChevronRightDoorIcon } from "../../Icons";

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

          <ChevronRightDoorIcon />
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
