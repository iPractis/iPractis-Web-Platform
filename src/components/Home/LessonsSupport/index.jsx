import SectionHeader from "../../Globals/SectionHeader";
import BottomSection from "./BottomSection";

// Images && icons
import teacherOnline from "@/public/images/teacher-online.jpg";
import twoUsersSpeaking from "@/public/icons/2-users-speaking.png";
import userParachute from "@/public/icons/user-parachute.png";
import starBadge from "@/public/icons/star-badge.png";
import { SparkleIcon } from "../../Icons";
import Image from "next/image";

const LessonsSupport = () => {
  return (
    <section className="bg-primary-color-P11">
      <div className="container-page-v1 md:py-[60px] py-10">
        <SectionHeader
          titleIcon={<SparkleIcon />}
          titleText="Discover how online lessons can support You"
          descriptionText="From school support to professional skill improvement, find lessons that fit your needs and learning style."
        />

        <article className="flex flex-col-reverse md:flex-row sm:gap-4 gap-[30px] mt-4 md:mb-4 mb-[30px]">
          <div className="flex-1">
            <div className="flex flex-col h-full sm:gap-4 gap-[30px] justify-between">
              <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
                <Image
                  alt={"2 Users Icon"}
                  className="w-[42px] mx-auto"
                  src={twoUsersSpeaking}
                />

                <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
                  Conversational lessons
                </h2>

                <p className="text-primary-color-P6 ST-3">
                  Practice real-life conversations to improve fluency and
                  confidence.
                </p>
              </div>

              <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
                <Image
                  alt={"Icon User Parachute"}
                  className="w-[46px] mx-auto"
                  src={userParachute}
                />

                <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
                  School Support
                </h2>
                <p className="text-primary-color-P6 ST-3">
                  Get personalized help to reinforce what you’re learning in
                  class.
                </p>
              </div>

              <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
                <Image
                  alt={"Icon Start Badge"}
                  className="w-[21px] mx-auto"
                  src={starBadge}
                />

                <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
                  Exam preparation
                </h2>
                <p className="text-primary-color-P6 ST-3">
                  Focused guidance to help you excel in your upcoming exams.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-[30%]">
            <Image
              alt="Woman Working"
              className="w-full sm:h-[650px] h-full object-cover rounded-[20px]"
              src={teacherOnline}
            />{" "}
          </div>
        </article>

        <BottomSection />
      </div>
    </section>
  );
};

export default LessonsSupport;
