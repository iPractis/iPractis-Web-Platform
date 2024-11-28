import { subjectsAndTutors } from "@/src/data/dataHome";
import SectionHeader from "../../Globals/SectionHeader";
import LanguagesCarousel from "./LanguagesCarousel";

// import required modules
import Image from "next/image";
import Link from "next/link";

import "swiper/css/navigation";
import "swiper/css";

// Images && Icons
import bookOpened from "@/public/icons/book-opened.png";

const BrowseSubjectsAndTutors = () => {
  return (
    <section className="bg-primary-color-P11">
      <div className="container-page md:py-[60px] py-10">
        <SectionHeader
          iconSrc={bookOpened}
          iconAlt={"Opened Book Icon"}
          titleText="Browse our subjects and tutors to find the right Fit for You."
          descriptionText="Meet our top-rated tutors and learn at your own pace."
        />

        {/* Carousel of languages */}
        <LanguagesCarousel />

        {/* Cards of tutors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 gap-[30px]">
          {subjectsAndTutors?.map((subjectAndTutor, index) => (
            <div key={index} className="bg-primary-color-P12 rounded-2xl group">
              <Image
                alt={"Tutor Video Image"}
                className="w-full rounded-t-2xl"
                src={subjectAndTutor?.imageSrc}
              />

              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      alt={"Tutor Image"}
                      className="w-[46px] rounded-[10px]"
                      src={subjectAndTutor?.tutorImagePreview}
                    />
                    <div className="absolute right-1 bottom-1 rounded-full w-2 h-2 bg-quinary-color-VS5"></div>
                  </div>

                  <div>
                    <h3 className="ST-SB-4 text-primary-color-P4">
                      {subjectAndTutor?.tutorName}
                    </h3>

                    <div className="flex gap-2 items-center">
                      <Image
                        alt={"Country Image"}
                        className="w-[15px] h-[13px]"
                        src={subjectAndTutor?.tutorFlag}
                      />
                      <h4 className="text-primary-color-P6 ST-2">
                        {subjectAndTutor?.tutorProfession}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center justify-between my-[15px]">
                  <ul className="flex items-center gap-[10px]">
                    <li className="ST-SB-2 text-primary-color-P1">English</li>

                    <li className="ST-SB-1 py-[2px] px-1.5 rounded-md bg-primary-color-P1 text-primary-color-P12">
                      Native
                    </li>

                    <li className="ST-SB-2 text-primary-color-P1">French</li>

                    <li className="ST-1 py-[2px] px-1.5 rounded-md bg-quinary-color-VS10 text-primary-color-P1">
                      Fluent C2
                    </li>
                  </ul>

                  <div className="flex items-center justify-center bg-primary-color-P11 px-[4px] py-[2px] w-6 h-6 rounded-full">
                    <h4 className="ST-SB-1 text-center text-primary-color-P4 flex h-full items-center justify-center">
                      {subjectAndTutor?.tutorExtraLanguages}
                    </h4>
                  </div>
                </div>

                <div className="flex justify-between">
                  {/* Lesson Rate which disappears on hover */}
                  <div>
                    <h4 className="text-primary-color-P6 ST-1">Lesson rate</h4>
                    <h3 className="sm:text-primary-color-P1 text-primary-color-P4">
                      <span className="MT-SB-1">8 USD/</span>
                      <span className="ST-3">30 mins</span>
                    </h3>
                  </div>

                  {/* Buttons that appear on hover */}
                  <div className="sm:hidden sm:group-hover:flex gap-4 transition-all duration-300 ease-in-out">
                    <button
                      className="btn btn-primary px-4 py-2 rounded-lg sm:w-auto w-[155px] ST-SB-4"
                      type="button"
                    >
                      Book a trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-primary-color-P12 h-[357px] p-5 rounded-2xl">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="MT-SB-3 text-primary-color-P1">
                  Discovers more{" "}
                  <span className="sm:block inline">teachers</span>
                </h3>

                <p className="ST-4 text-primary-color-P4 mt-5">
                  Search through 1000+ qualified teachers and select the perfect
                  fit based on your target subject, goals and budget.
                </p>
              </div>

              <div>
                <Link
                  href={"#"}
                  className="btn btn-secondary MT-SB-1 rounded-2xl w-full px-4 py-3"
                >
                  Discover more teachers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseSubjectsAndTutors;
