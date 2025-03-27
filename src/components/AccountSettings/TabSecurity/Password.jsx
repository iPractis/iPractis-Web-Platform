import SectionHeader from "../../Shared/SectionHeader";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// React imports
import Link from "next/link";

// Icons
import {
  ChevronRightIcon,
  PadLockClosedBigIcon,
  ThreeAstheristiksIcon,
} from "../../Icons";

const Password = () => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={
          "Change or reset your password to maintain the security of your account."
        }
        titleIcon={
          <PadLockClosedBigIcon
            versionIcon={2}
            fillColor={"fill-primary-color-P1"}
          />
        }
        descriptionClassName={"mt-[4px]"}
        titleText={"Password"}
        titleClassName="MT-SB-1"
      />

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8">
        <Link
          className="btn btn-secondary flex items-center justify-between w-full p-1.5 rounded-2xl"
          href={"#"}
        >
          <InputBGWrapperIcon>
            <ThreeAstheristiksIcon fillColor={"fill-tertiary-color-SC5"} />
          </InputBGWrapperIcon>
          Update password
          <InputBGWrapperIcon>
            <ChevronRightIcon fillColor={"fill-tertiary-color-SC5"} />
          </InputBGWrapperIcon>
        </Link>
      </div>
    </div>
  );
};

export default Password;
