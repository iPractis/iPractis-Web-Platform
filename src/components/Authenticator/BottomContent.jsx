import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";

// React imports
import Link from "next/link";

// Icons
import { HelpIcon } from "../Icons";

const BottomContent = () => {
  return (
    <div className="space-y-8 sm:px-8 sm:mt-[50px] mt-8">
      <p className="text-primary-color-P4 ST-4">
        Haven’t receive the code? 3:00 Minutes
      </p>

      {/* Contact Support Details */}
      <p className={`ST-3 text-primary-color-P1`}>
        Recover your account easily using your registered phone number. Receive
        a secure SMS verification code to regain access and reset your
        authentication settings.
      </p>

      <Link
        className="btn btn-primary w-full p-1.5 rounded-2xl flex gap-5 items-center MT-SB-1"
        href={"/support-request"}
      >
        <InputBGWrapperIcon>
          <HelpIcon fillcolor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <span>Contact support</span>
      </Link>
    </div>
  );
};

export default BottomContent;
