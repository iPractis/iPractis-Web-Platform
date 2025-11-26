import SectionHeader from "../Shared/SectionHeader";

// Icons
import { CheckedShieldIcon } from "../Icons";

const HeadingTitle = () => {
  return (
    <SectionHeader
      wrapperSectionHeaderClassName={"bg-secondary-color-S11 rounded-[32px] p-8"}
      descriptionText="Enter your account details to access to your account."
      titleIcon={<CheckedShieldIcon fillcolor={"fill-primary-color-P1"} />}
      titleText={"Authenticator"}
      titleClassName={"MT-SB-1"}
    />
  );
};

export default HeadingTitle;
