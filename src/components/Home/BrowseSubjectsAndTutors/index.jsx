import SectionHeader from "../../Globals/SectionHeader";
import LanguagesCarousel from "./LanguagesCarousel";

import "swiper/css/navigation";
import "swiper/css";

// Images && Icons
import bookOpened from "@/public/icons/book-opened.png";
import TutorCards from "./TutorCards";

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
        <TutorCards />
      </div>
    </section>
  );
};

export default BrowseSubjectsAndTutors;
