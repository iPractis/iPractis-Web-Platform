import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import AboutYourSelfIntro from "./AboutYourSelfIntro";
import { UserIcon } from "../../Icons";

const AboutYourself = () => {
  return (
    <WhiteSpaceWrapper className={"space-y-[50px]"}>
      <SectionHeader
        descriptionText="Capture prospective students attention with compelling details about you as a teacher"
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Tell students about yourself"
        titleClassName="MT-SB-1"
      />

      <div className="flex flex-col sm:flex-row sm:gap-[50px] gap-6">
        <AboutYourselfMasteredLanguages />

        <AboutYourSelfIntro />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default AboutYourself;
