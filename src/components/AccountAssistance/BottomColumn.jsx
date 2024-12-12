import SectionHeader from "../Globals/SectionHeader";
import { HelpIcon, PadLockClosedIcon } from "../Icons";
import Link from "next/link";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`We're here to help! Please let us know how we can assist in resolving your issue promptly.`}
        titleIcon={<HelpIcon fillColor={"fill-primary-color-P1"} />}
        titleText={`Account Assistance`}
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
      />

      <div className="mt-[50px]">
        <Link
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1"
          href={"/password-recovery"}
        >
          <div className="flex-1">
            <PadLockClosedIcon fillColor={"fill-primary-color-P12"} />
          </div>

          <span className="sm:flex-[85%] flex-[80%]">Password Recovery</span>
        </Link>

        <button
          type="button"
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1 mt-3"
        >
          <div className="flex-1">
            <HelpIcon fillColor={"fill-primary-color-P12"} />
          </div>

          <span className="sm:flex-[85%] flex-[80%]">Contact Support</span>
        </button>
      </div>
    </div>
  );
};

export default BottomColumn;
