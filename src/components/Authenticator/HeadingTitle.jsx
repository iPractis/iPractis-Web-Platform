import SectionHeader from "../Shared/SectionHeader";

// Icons
import { CheckedShieldIcon } from "../Icons";

const HeadingTitle = () => {
  return (
    <SectionHeader
      wrapperSectionHeaderClassName={"bg-primary-color-P11 rounded-[32px] p-8"}
      descriptionText="Enter your account details to access to your account."
      titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P1"} />}
      titleText={"Authenticator"}
      titleClassName={"MT-SB-1"}
    />
  );
};

export default HeadingTitle;
