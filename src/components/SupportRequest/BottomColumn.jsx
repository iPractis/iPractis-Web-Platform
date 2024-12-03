import SectionHeader from "../Globals/SectionHeader";
import Link from "next/link";

// Images && icons
import userAdd from "@/public/icons/user-add.png";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center items-stretch md:gap-[50px] gap-8">
        <div className="flex-1">
          <SectionHeader
            descriptionText={`Press on "Register" to create your account.`}
            titleText={`You don't have an account yet?`}
            descriptionClassName="mt-1"
            iconAlt={"User Add Icon"}
            iconClassName="w-[24px]"
            titleClassName="MT-SB-1"
            iconSrc={userAdd}
          />
        </div>

        <div className="flex-1">
          <Link
            className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4"
            href={"/register"}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomColumn;
