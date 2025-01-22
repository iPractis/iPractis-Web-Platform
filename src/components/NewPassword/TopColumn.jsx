import SectionHeader from "@/src/components/Globals/SectionHeader";
import { PadLockClosedIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText={`Please enter your new password to access your account.`}
        titleIcon={
          <PadLockClosedIcon
            fillColor={"fill-primary-color-P1"}
            versionIcon={2}
          />
        }
        titleText={`Make a new password`}
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName={
          "sm:bg-primary-color-P11 rounded-[32px] sm:p-8"
        }
      />
    </article>
  );
};

export default TopColumn;
