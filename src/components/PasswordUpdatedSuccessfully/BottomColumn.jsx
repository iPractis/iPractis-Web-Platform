import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { ChevronRightBiggerIcon, PlayIcon } from "../Icons";
import Link from "next/link";
import SectionWrapper from "../Shared/SectionWrapper";

const BottomColumn = () => {
  return (
      <Link
        href={"/login"}
        className="bg-tertiary-color-SC6 hover:bg-tertiary-color-SC5 transition-colors w-full flex justify-between items-center ST-3 mt-[32px] p-[6px] rounded-[16px]"
      >
        <span className="text-primary-color-P12 px-[16px]">Go to login page</span>

        <div className="bg-primary-color-P12 p-[8px] rounded-[10px]">
          <PlayIcon fillColor={"fill-tertiary-color-SC5"} />
        </div>
      </Link>
  );
};

export default BottomColumn;
