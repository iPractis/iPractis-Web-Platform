// Images && icons
import womanComputer from "@/public/images/woman-computer.jpg";
import bee from "@/public/icons/bee.png";
import sun from "@/public/icons/sun.png";

import Image from "next/image";

const BottomSection = () => {
  return (
    <article className="flex flex-col md:flex-row sm:gap-4 gap-[30px]">
      <div className="flex-[30%]">
        <Image
          alt="Woman Taking Classes"
          className="w-full sm:h-[428px] h-full object-cover rounded-[20px]"
          src={womanComputer}
        />{" "}
      </div>

      <div className="flex-1">
        <div className="flex flex-col h-full sm:gap-4 gap-[30px] justify-between">
          <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
            <Image alt={"Icon Sun"} className="w-[46px] mx-auto" src={sun} />

            <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
              Initiation lessons
            </h2>

            <p className="text-primary-color-P6 ST-3">
              Start from the basics and build a strong foundation in any
              subject.
            </p>
          </div>

          <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
            <Image alt={"Icon Bee"} className="w-[42px] mx-auto" src={bee} />

            <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
              Professional skills improvement
            </h2>
            <p className="text-primary-color-P6 ST-3">
              Enhance your career by developing essential skills for the
              workplace.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BottomSection;
