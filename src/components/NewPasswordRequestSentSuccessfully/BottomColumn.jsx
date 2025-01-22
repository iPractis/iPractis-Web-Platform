import { ChevronRightBiggerIcon, PadLockClosedIcon } from "../Icons";
import SectionHeader from "@/src/components/Globals/SectionHeader";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import Link from "next/link";

const BottomColumn = () => {
  return (
    <>
      <SectionHeader
        descriptionText={`Your password change request has been sent successfully. Please check your email for instructions on how to complete the process.`}
        titleText={`Password change request sent successfully`}
        titleIcon={<PadLockClosedIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "sm:bg-primary-color-P11 rounded-[32px] sm:p-8"
        }
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
      />

      <div className="sm:px-8 mt-[50px]">
        <Link
          href={"/login"}
          className="btn btn-primary w-full p-1.5 rounded-2xl MT-SB-1 mt-8 flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none"
        >
          <span className="flex-1">Go to login page</span>

          <InputBGWrapperIcon>
            <ChevronRightBiggerIcon fillColor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>
        </Link>
      </div>
    </>
  );
};

export default BottomColumn;
