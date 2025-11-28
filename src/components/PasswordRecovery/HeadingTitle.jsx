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
          "sm:bg-secondary-color-S11 rounded-[32px] sm:p-8"
        }
        titleText="Request password changes"
        titleIcon={<PadLockUserIcon fillcolor="fill-primary-color-P1" />}
        titleClassName="MT-SB-1"
      />
    </article>
  );
};

export default HeadingTitle;
