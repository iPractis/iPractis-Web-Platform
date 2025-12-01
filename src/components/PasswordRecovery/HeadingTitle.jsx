import SectionHeader from "../Shared/SectionHeader";

// Icons
import { SparklesIcon } from "../Icons";

const HeadingTitle = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Initiate password update"
        wrapperSectionHeaderClassName={
          "sm:bg-secondary-color-S11 rounded-[32px] sm:p-8"
        }
        titleText="Request password changes"
        titleIcon={<SparklesIcon fillColor="fill-primary-color-P1" />}
        titleClassName="MT-SB-1"
      />
    </article>
  );
};

export default HeadingTitle;
