import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import { AnalyticIcon, BookOpenedIcon, ChevronDownBigIcon, ChevronRightIcon, WrenchIcon } from "../../Icons";
import Link from "next/link";

const HowWorksAndSkills = () => {
  return (
    <WhiteSpaceWrapper className="grid lg:grid-cols-2 grid-cols-1 gap-[50px] p-0 lg:px-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <div className="h-[24px] w-[24px] items-center flex ">
            <AnalyticIcon fillcolor={"fill-primary-color-P1"} />
          </div>
          <h2 className="ST-SB-4 text-primary-color-P1">How it works</h2>
        </div>
        <p className="text-primary-color-P4 mb-[50px] ST-3">
          Take a quick tour of the platform's features and see exactly how it supports you in planning lessons, tracking progress, and showcasing achievements.
        </p>

        <div className="mt-[10px]">
          <Link
            className="bg-primary-color-P1 w-full MT-SB-1 rounded-[16px] p-[6px] flex items-center justify-between hover:bg-opacity-90 transition-all duration-200"
            href={"#"}
          >
            <div className="flex items-center gap-4">
              <div className="bg-secondary-color-S11 p-2 rounded-[10px] flex items-center justify-center">
                <WrenchIcon fillcolor={"fill-primary-color-P1"} />
              </div>
              <span className="text-primary-color-P12 ST-SB-4">Learn more</span>
            </div>


            <div className="bg-secondary-color-S11 p-2 rounded-[10px] flex items-center justify-center">
              <ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <div className="h-[24px] w-[24px] items-center flex ">
            <AnalyticIcon fillcolor={"fill-primary-color-P1"} />
          </div>
          <h2 className="ST-SB-4 text-primary-color-P1">Start improving your teaching skills</h2>
        </div>
        <p className="text-primary-color-P4 flex-1 ST-3">
          Explore interactive lessons, proven strategies, and quick tips to help you make every class session more dynamic.
        </p>

        <div className="flex-1 place-content-end">
          <Link
            className="bg-tertiary-color-SC6 w-full MT-SB-1 rounded-[16px] p-[6px] flex items-center justify-between hover:bg-opacity-90 transition-all duration-200"
            href={"#"}
          >
            <div className="flex items-center gap-4">
              <div className="bg-secondary-color-S11 p-2 rounded-[10px] flex items-center justify-center">
                <BookOpenedIcon fillcolor={"fill-tertiary-color-SC6"} />
              </div>
              <span className="text-primary-color-P12 ST-SB-4">Start learning</span>
            </div>

            <div className="bg-secondary-color-S11 p-2 rounded-[10px] flex items-center justify-center">
              <ChevronRightIcon fillcolor={"fill-tertiary-color-SC6"} />
            </div>
          </Link>
        </div>
      </div>
    </WhiteSpaceWrapper>
  );
};

export default HowWorksAndSkills;
