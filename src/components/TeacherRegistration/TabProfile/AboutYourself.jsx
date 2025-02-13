import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import { UserIcon } from "../../Icons";

const AboutYourself = ({ children }) => {
  return (
    <WhiteSpaceWrapper className={"p-0 mt-16"}>
      <SectionHeader
        descriptionText="Capture prospective students attention with compelling details about you as a teacher"
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px]"
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Tell students about yourself"
        titleClassName="MT-SB-1"
      />

      {children}
    </WhiteSpaceWrapper>
  );
};

export default AboutYourself;
