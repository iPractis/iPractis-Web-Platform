import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import { UserSpeakingRightIcon } from "../../Icons";

const AboutYourself = ({ children }) => {
  return (
    <WhiteSpaceWrapper className={"p-0 mt-16"}>
      <SectionHeader
        titleIcon={<UserSpeakingRightIcon fillcolor="fill-primary-color-P1" />}
        titleText="Language proficiency level"
        descriptionText="Select only the languages you can use to teach."
        titleClassName="MT-SB-1"
      />

      {children}
    </WhiteSpaceWrapper>
  );
};

export default AboutYourself;
