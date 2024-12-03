import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Images && icons
import circleHelpBlack from "@/public/icons/circle-help-black.png";
import circleHelp from "@/public/icons/circle-help.png";
import whiteLock from "@/public/icons/white-lock.png";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`We're here to help! Please let us know how we can assist in resolving your issue promptly.`}
        titleText={`Account Assistance`}
        descriptionClassName="mt-1"
        iconAlt={"White Lock Icon"}
        iconClassName="w-[24px]"
        titleClassName="MT-SB-1"
        iconSrc={circleHelpBlack}
      />

      <div className="mt-[50px]">
        <button
          type="button"
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1"
        >
          <div className="flex-1">
            <Image
              alt="Locked White Icon"
              className="w-[22px]"
              src={whiteLock}
            />
          </div>

          <span className="sm:flex-[85%] flex-[80%]">Password Recovery</span>
        </button>

        <button
          type="button"
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1 mt-3"
        >
          <div className="flex-1">
            <Image
              alt="Circle Help Icon"
              className="w-[22px]"
              src={circleHelp}
            />
          </div>

          <span className="sm:flex-[85%] flex-[80%]">Contact Support</span>
        </button>
      </div>
    </div>
  );
};

export default BottomColumn;
