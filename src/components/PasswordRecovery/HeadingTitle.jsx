import SectionHeader from "../Shared/SectionHeader";

// Icons
import { PadLockUserIcon } from "../Icons";

const HeadingTitle = () => {
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

export default HeadingTitle;
