import Image from "next/image";
import Link from "next/link";

// Images && icons
import {
    ChevronRightDoorSmallIcon,
    UserAddCircleSmallerIcon,
} from "../../Icons";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import themeLight from "@/public/icons/theme-light.png";
import logo from "@/public/logos/ipractis-logo-1.png";
import world from "@/public/icons/world.png";

const NavDesktopLogin = () => {
    return (
        <div className="bg-white rounded-[22px] shadow-sm">
            <div className="flex justify-between items-center gap-1.5 p-2">
                {/* Logo */}
                <div>
                    <Link href="/">
                        <Image
                            className="w-[113px] p-1.5 bg-black rounded-2xl overflow-hidden"
                            alt="Logo iPractis"
                            src={logo}
                            priority
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Login / Register */}
                    <div className="flex items-center gap-1.5 ms-8">
                        {/* Login */}
                        <Link
                            href="/login"
                            className="
    flex items-center justify-between
    w-[124px] h-[38px] px-4 rounded-2xl
    bg-black text-white
  "
                        >
                            <span className="ST-SB-4">Log in</span>

                            <ChevronRightDoorSmallIcon fillcolor="fill-white" />
                        </Link>


                        <Link
                            href="/register"
                            className="
    flex items-center justify-between
    w-[124px] h-[38px] px-4 rounded-2xl
    bg-black text-white
  "
                        >
                            <span className="ST-3">Register</span>

                            <UserAddCircleSmallerIcon
                                fillcolor="fill-white"
                                strokeColor="stroke-white"
                            />
                        </Link>

                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-1.5">
                        <button className="rounded-2xl h-[38px] w-[38px] bg-black">
                            <Image
                                alt="World"
                                src={world}
                                className="w-5 mx-auto invert"
                                priority
                            />
                        </button>

                        <button className="rounded-2xl h-[38px] w-[38px] bg-black">
                            <Image
                                alt="Theme Light"
                                src={themeLight}
                                className="w-5 mx-auto invert"
                                priority
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavDesktopLogin;
