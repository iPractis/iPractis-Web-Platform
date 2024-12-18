import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import { AnalyticIcon, ChevronRightIcon } from "../../Icons";
import SectionHeader from "../../Globals/SectionHeader";
import DualLink from "../../Globals/DualLink";

const HowWorksAndSkills = () => {
  return (
    <WhiteSpaceWrapper className="space-y-[50px]">
      <div className="flex flex-col sm:flex-row md:gap-[50px] gap-4">
        <SectionHeader
          descriptionText={
            <>
              Your application is currently pending approval. We appreciate your
              patience and will notify you as soon as your application has been
              reviewed.
              <span className="block">
                Feel free to edit your profile to improve it.
              </span>
            </>
          }
          titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
          titleText="How it works"
          titleClassName="MT-SB-1"
        />

        <SectionHeader
          descriptionText={
            <>
              Your application is currently pending approval. We appreciate your
              patience and will notify you as soon as your application has been
              reviewed.
              <span className="block">
                Feel free to edit your profile to improve it.
              </span>
            </>
          }
          titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
          titleText="Start improving your teaching skills"
          titleClassName="MT-SB-1"
        />
      </div>

      <DualLink
        dualLinkWrapper={"flex-col sm:flex-row sm:gap-[50px] gap-4"}
        leftLinkText={
          <div className="flex justify-center items-center">
            <span className="flex-[90%]">Preview my profile</span>

            <div className="flex-1">
              <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
            </div>
          </div>
        }
        leftLinkHref={"#"}
        rightLinkText={
          <div className="flex justify-center items-center">
            <span className="flex-[90%]">Start learning</span>

            <div className="flex-1">
              <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
            </div>
          </div>
        }
        rightLinkHref={"#"}
      />
    </WhiteSpaceWrapper>
  );
};

export default HowWorksAndSkills;
