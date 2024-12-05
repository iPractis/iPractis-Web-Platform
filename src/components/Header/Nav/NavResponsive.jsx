import Image from "next/image";
import Link from "next/link";

// Images
import profileSettingsIcon from "@/public/icons/profile-settings-icon.png";
import ipractisIcon from "@/public/icons/ipractis-icon.png";

const NavResponsive = () => {
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

      <div>
        <Image
          className="w-8 cursor-pointer"
          alt="Profile Settings Icon"
          src={profileSettingsIcon}
          priority
        />
      </div>
    </div>
  );
};

export default NavResponsive;
