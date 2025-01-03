import SectionHeader from "@/src/components/Globals/SectionHeader";
import { PadLockOpenedIcon } from "../Icons";
import Link from "next/link";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Your password change request has been sent successfully. Please check your email for instructions on how to complete the process.`}
        titleText={`Password change request sent successfully`}
        titleIcon={<PadLockOpenedIcon />}
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
      />

      <div className="mt-[50px]">
        <Link
          href={"/login"}
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1 mt-3"
        >
          Go to login page
        </Link>
      </div>
    </div>
  );
};

export default BottomColumn;
