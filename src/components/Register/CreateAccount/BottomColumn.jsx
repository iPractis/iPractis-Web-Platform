import Link from "next/link";
import SectionHeader from "../../Globals/SectionHeader";

// Images && icons
import lockedUser from "@/public/icons/locked-user.png";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Press on "Log in" to access to your account.`}
        titleText={`You already have an account?`}
        descriptionClassName="mt-1"
        iconAlt={"Locked User Icon"}
        iconClassName="w-[24px]"
        titleClassName="MT-SB-1"
        iconSrc={lockedUser}
      />

      <Link
        className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4 sm:mt-[50px] mt-8"
        href={"/login"}
      >
        Log in
      </Link>
    </div>
  );
};

export default BottomColumn;
