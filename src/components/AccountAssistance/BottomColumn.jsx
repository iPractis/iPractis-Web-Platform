import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import Link from "next/link";

// Images && icons
import { HelpIcon, ThreeAstheristiksIcon } from "../Icons";

const BottomColumn = () => {
  return (
    <div className="sm:px-8 px-0 mt-[50px]">
      <Link
        className="btn btn-primary w-full p-1.5 rounded-2xl flex items-center gap-4 MT-1"
        href={"/password-recovery"}
      >
        <InputBGWrapperIcon>
          <ThreeAstheristiksIcon fillcolor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <span>Password Recovery</span>
      </Link>

      <Link
        href={"/support-request"}
        className="btn btn-primary w-full p-1.5 rounded-2xl flex items-center gap-4 MT-1 mt-3"
      >
        <InputBGWrapperIcon>
          <HelpIcon fillcolor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <span>Contact Support</span>
      </Link>
    </div>
  );
};

export default BottomColumn;
