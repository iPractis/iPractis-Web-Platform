import SectionHeader from "../Shared/SectionHeader";
import { HelpIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="We're here to help! Please let us know how we can assist in resolving your issue promptly."
        titleText="Account Assistance"
        titleIcon={<HelpIcon fillcolor={"fill-primary-color-P1"} />}
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName={
          "sm:bg-secondary-color-S11 rounded-[32px] sm:p-8"
        }
      />
    </article>
  );
};

export default TopColumn;
