import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import { UserIcon, ChevronDownBigIcon } from "../../Icons";

const AboutYourself = ({ children }) => {
  return (
    <WhiteSpaceWrapper className={"p-0 mt-16"}>
      <SectionHeader
        descriptionText="Select only the languages you can use to teach."
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] p-4 rounded-xl max-w-[1000px] h-[112px] flex items-center justify-between"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <UserIcon fillColor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Language proficiency level"
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
      >
        <div className="absolute top-[32px] bottom-[32px] right-[32px] w-[190px] h-[48px] bg-white rounded-[16px] p-[6px] flex items-center justify-between gap-[2px]">
          <span className="text-primary-color-P1 ST-3 ml-[16px]">Edit Information</span>
          <div className="mr-[6px] w-[36px] h-[36px] bg-[#F8F7F5] rounded-[10px] flex items-center justify-center gap-[10px] p-[8px]">
            <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>
      </SectionHeader>

      {children}
    </WhiteSpaceWrapper>
  );
};

export default AboutYourself;
