import SectionHeader from "../Globals/SectionHeader";
import { PadLockUserIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Please enter your email address to receive a password recovery link."
        wrapperSectionHeaderClassName={
          "sm:bg-primary-color-P11 rounded-[32px] sm:p-8"
        }
        titleText="Request password changes"
        titleIcon={<PadLockUserIcon />}
        titleClassName="MT-SB-1"
      />
    </article>
  );
};

export default TopColumn;
