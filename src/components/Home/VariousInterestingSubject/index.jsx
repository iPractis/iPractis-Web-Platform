import { variousInterestingSubjects } from "@/src/data/dataHome";
import SectionHeader from "../../Globals/SectionHeader";
import { BadgeStarIcon } from "../../Icons";
import Image from "next/image";

const VariousInterestingSubject = () => {
  return (
    <section className="container-page-v1 md:my-[60px] my-10">
      <SectionHeader
        titleIcon={<BadgeStarIcon />}
        titleText="Various interesting subject"
        descriptionText="Start learning today"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 gap-[30px] mt-[30px]">
        {variousInterestingSubjects?.map((interestingSubject, index) => {
          return (
            <div
              className="bg-primary-color-P11 text-center rounded-[20px] py-8 px-4"
              key={index}
            >
              <Image
                alt={interestingSubject?.subjectIconAlt}
                src={interestingSubject?.subjectIcon}
                className="w-[50px] h-[44px] object-contain mx-auto"
              />

              <h2 className="text-primary-color-P4 MT-SB-1 sm:mt-5 mt-3 sm:mb-2 mb-1.5">
                {interestingSubject?.subjectTitle}
              </h2>

              <p className="text-primary-color-P6 ST-3">
                {interestingSubject?.subjectDesc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VariousInterestingSubject;
