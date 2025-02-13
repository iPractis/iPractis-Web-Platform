import SectionHeader from "../Shared/SectionHeader";
import { HelpIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="We're here to help! Please let us know how we can assist in resolving your issue promptly."
        titleText="Account Assistance"
        titleIcon={<HelpIcon fillColor={"fill-primary-color-P1"} />}
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName={
          "sm:bg-primary-color-P11 rounded-[32px] sm:p-8"
        }
      />
    </article>
  );
};

export default TopColumn;
