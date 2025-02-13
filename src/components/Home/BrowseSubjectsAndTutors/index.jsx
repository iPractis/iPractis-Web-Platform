import SectionHeader from "../../Shared/SectionHeader";
import LanguagesCarousel from "./LanguagesCarousel";
import { BookOpenedIcon } from "../../Icons";
import TutorCards from "./TutorCards";

import "swiper/css/navigation";
import "swiper/css";

const BrowseSubjectsAndTutors = () => {
  return (
    <section className="bg-primary-color-P11">
      <div className="container-page-v1 md:py-[60px] py-10">
        <SectionHeader
          titleText="Browse our subjects and tutors to find the right Fit for You."
          descriptionText="Meet our top-rated tutors and learn at your own pace."
          titleIcon={<BookOpenedIcon />}
        />

        {/* Carousel of languages */}
        <LanguagesCarousel />

        {/* Cards of tutors */}
        <TutorCards />
      </div>
    </section>
  );
};

export default BrowseSubjectsAndTutors;
