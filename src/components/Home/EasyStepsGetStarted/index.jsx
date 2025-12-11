import { easyStepsGetStarted } from "@/src/data/dataHome";
import { UserWalkingIcon } from "../../Icons";
import Image from "next/image";
import IconHeader from "../../Shared/IconHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";

const EasyStepsGetStarted = () => {
  return (
      <SectionWrapper className={"w-[1000px] mx-auto"}>
        <IconHeader
          icon={<UserWalkingIcon />}
          title={"Only few easy steps to get started"}
          description={"In only four words, choose, schedule, pay, start."}
          className="w-[calc(100%+160px)] md:ml-[-65px]"
        />

        <SectionContent className="w-full !mx-0 !space-y-0">
          <div className="flex gap-[32px]">
            {easyStepsGetStarted?.map((easyStep, index) => {
              return (
                <div
                  className="bg-secondary-color-S11 text-center rounded-[32px] p-[32px] w-[226px]"
                  key={easyStep?.stepTitle ?? `easy-step-${index}`}
                >
                  <Image
                    alt={easyStep?.stepIconAlt}
                    src={easyStep?.stepIcon}
                    className="w-[50px] h-[44px] object-contain mx-auto"
                  />

                  <h2 className="text-primary-color-P4 MT-SB-1 sm:mt-5 mt-3 sm:mb-2 mb-1.5">
                    {easyStep?.stepTitle}
                  </h2>

                  <p className="text-primary-color-P6 ST-3">{easyStep?.stepDesc}</p>
                </div>
              );
            })}
          </div>
        </SectionContent>
      </SectionWrapper>
  );
};

export default EasyStepsGetStarted;
