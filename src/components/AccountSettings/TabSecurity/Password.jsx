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
        titleIcon={
          <PadLockClosedBigIcon
            versionIcon={2}
            fillcolor={"fill-primary-color-P1"}
          />
        }
        titleText={"Multi-Steps authentication"}
        descriptionText={
          "Enable multi-step authentication to add layer of security."
        }
      />

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8">
        <Link
          className="btn btn-secondary flex items-center justify-between w-full p-1.5 rounded-2xl"
          href={"#"}
        >
          <InputBGWrapperIcon>
            <ThreeAstheristiksIcon fillcolor={"fill-tertiary-color-SC5"} />
          </InputBGWrapperIcon>
          Update password
          <InputBGWrapperIcon>
            <ChevronRightIcon fillcolor={"fill-tertiary-color-SC5"} />
          </InputBGWrapperIcon>
        </Link>
      </div>
    </div>
  );
};

export default Password;
