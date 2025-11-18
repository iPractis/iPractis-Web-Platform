import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import { UserSpeakingRightIcon } from "../../Icons";

const AboutYourself = ({ children }) => {
  return (
    <WhiteSpaceWrapper className={"p-0 mt-16"}>
      <SectionHeader
        descriptionText="Select only the languages you can use to teach."
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[20px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <UserSpeakingRightIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Language proficiency level"
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
      />

      {children}
    </WhiteSpaceWrapper>
  );
};

export default AboutYourself;
