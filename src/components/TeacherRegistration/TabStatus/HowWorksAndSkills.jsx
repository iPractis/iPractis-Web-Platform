import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import { AnalyticIcon, ChevronRightIcon } from "../../Icons";
import SectionHeader from "../../Globals/SectionHeader";
import DualLink from "../../Globals/DualLink";
import Link from "next/link";

const HowWorksAndSkills = () => {
  return (
    <WhiteSpaceWrapper className="space-y-[50px] sm:p-8 p-0">
      <div>
        <SectionHeader
          descriptionText={"Text"}
          titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
          titleText="Start improving your teaching skills"
          titleClassName="MT-SB-1"
        />

        <Link
          className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4 mt-[50px]"
          href={"#"}
        >
          <div className="flex justify-center items-center">
            <span className="flex-[90%]">Start learning</span>

            <div className="flex-1">
              <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
            </div>
          </div>
        </Link>
      </div>

      <div>
        <SectionHeader
          descriptionText={"Text"}
          titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
          titleText="How it works"
          titleClassName="MT-SB-1"
        />

        <Link
          className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4 mt-[50px]"
          href={"#"}
        >
          <div className="flex justify-center items-center">
            <span className="flex-[90%]">Preview my profile</span>

            <div className="flex-1">
              <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
            </div>
          </div>
        </Link>
      </div>
    </WhiteSpaceWrapper>
  );
};

export default HowWorksAndSkills;
