import Image from "next/image";
import Link from "next/link";

// Images && icons
import { ChevronRightDoorIcon, UserAddCircleSmallerIcon } from "../../Icons";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";
import NavSearchBar from "./NavSearchBar";

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

      <div className="flex items-center gap-4">
        <NavSearchBar />

        <div className="flex items-center gap-1.5">
          <Link
            href="/login"
            className="btn btn-quinary flex items-center pe-4 p-1.5 gap-4 rounded-2xl ST-4 group w-[107px] h-[38px]"
          >
            <span className="flex-1">Log in</span>{" "}
            <ChevronRightDoorIcon
              fillColor={
                "fill-primary-color-P12 group-hover:fill-primary-color-P1"
              }
            />
          </Link>

          <Link
            href="/register"
            className="btn btn-tertiary flex justify-center items-center ST-4 pe-4 p-1.5 rounded-2xl gap-4 w-[131px]"
          >
            <InputBGWrapperIcon className={"bg-primary-color-P1 p-0 w-7 h-7"}>
              <UserAddCircleSmallerIcon
                fillColor={"fill-primary-color-P1"}
                strokeColor={"stroke-primary-color-P1"}
              />
            </InputBGWrapperIcon>

            <span className="flex-1">Register</span>
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="btn btn-tertiary rounded-2xl h-[38px] w-[38px]"
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
            className="btn btn-tertiary rounded-2xl h-[38px] w-[38px]"
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
    </div>
  );
};

export default NavDesktop;
