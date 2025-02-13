import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { ChevronRightBiggerIcon } from "../Icons";
import Link from "next/link";

const BottomColumn = () => {
  return (
    <div className="sm:px-8 mt-8">
      <Link
        href={"/login"}
        className="btn btn-primary w-full p-1.5 rounded-2xl flex justify-center items-center MT-SB-1 mt-3"
      >
        <span className="flex-1">Go to login page</span>

        <InputBGWrapperIcon>
          <ChevronRightBiggerIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>
      </Link>
    </div>
  );
};

export default BottomColumn;
