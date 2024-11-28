import { easyStepsGetStarted } from "@/src/data/dataHome";
import SectionHeader from "../../Globals/SectionHeader";

// Icons && images
import walking from "@/public/icons/walking.png";
import Image from "next/image";

const EasyStepsGetStarted = () => {
  return (
    <section className="container-page md:my-[60px] my-10">
      <SectionHeader
        iconSrc={walking}
        iconClassName="w-[14px]"
        iconAlt={"User Walking Icon"}
        titleText="Only few easy steps to get started"
        descriptionText="In only four words, choose, schedule, pay, start."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 gap-[30px] mt-[30px]">
        {easyStepsGetStarted?.map((easyStep, index) => {
          return (
            <div
              className="bg-primary-color-P11 text-center rounded-[20px] py-7 px-5"
              key={index}
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
    </section>
  );
};

export default EasyStepsGetStarted;
