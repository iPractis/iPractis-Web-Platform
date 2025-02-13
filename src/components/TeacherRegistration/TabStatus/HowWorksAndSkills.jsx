import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import { AnalyticIcon, ChevronRightIcon } from "../../Icons";
import SectionHeader from "../../Shared/SectionHeader";
import Link from "next/link";

const HowWorksAndSkills = () => {
  return (
    <WhiteSpaceWrapper className="grid md:grid-cols-2 grid-cols-1 gap-[50px] p-0 md:px-8">
      <div>
        <SectionHeader
          descriptionText={
            "Take a quick tour of the platform’s features and see exactly how it supports you in planning lessons, tracking progress, and showcasing achievements."
          }
          titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
          titleText="How it works"
          titleClassName="MT-SB-1"
        />

        <Link
          className="btn btn-primary w-full MT-SB-1 rounded-2xl ps-4 p-1.5 mt-[50px] flex justify-between items-center"
          href={"#"}
        >
          <span>I want to know more</span>

          <InputBGWrapperIcon>
            <ChevronRightIcon fillColor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>
        </Link>
      </div>

      <div className="flex flex-col gap-[50px]">
        <SectionHeader
          descriptionText={
            "Explore interactive lessons, proven strategies, and quick tips to help you make every class session more dynamic."
          }
          titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
          titleText="Start improving your teaching skills"
          titleClassName="MT-SB-1"
        />

        <div className="flex-1 place-content-end">
          <Link
            className="btn btn-secondary w-full MT-SB-1 rounded-2xl ps-4 p-1.5 flex items-center justify-between"
            href={"#"}
          >
            <span>Start learning</span>

            <InputBGWrapperIcon>
              <ChevronRightIcon fillColor={"fill-tertiary-color-SC5"} />
            </InputBGWrapperIcon>
          </Link>
        </div>
      </div>
    </WhiteSpaceWrapper>
  );
};

export default HowWorksAndSkills;
