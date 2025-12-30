import Hero from "@/src/components/Home/Hero";
import BrowseSubjectsAndTutors from "../components/Home/BrowseSubjectsAndTutors";
import EasyStepsGetStarted from "../components/Home/EasyStepsGetStarted";
import MeetOurServices from "../components/Home/MeetOurServices";
import VariousInterestingSubject from "../components/Home/VariousInterestingSubject";
import LessonsSupport from "../components/Home/LessonsSupport";
import PlatformExperience from "../components/Home/PlatformExperience";
import Footer from "../components/Home/Footer";

const page = () => {
  return (
    <main className="flex flex-col space-y-[64px]">
      {/* Hero and Carousel of Languagues top */}
      <Hero />

      {/* Browse our subjects and tutors, cards and carousel */}
      <BrowseSubjectsAndTutors />

      {/* Only few easy steps to get started */}
      <EasyStepsGetStarted />

      {/* Meet Our Services */}
      <MeetOurServices />

      {/* Various Interesting Subject */}
      <VariousInterestingSubject />

      {/* Discover how online lessons can suport you */}
      <LessonsSupport />

      {/* Safe learning environment */}
      {/* <SafeLearning /> */}

      {/* Cross platform experience */}
      <PlatformExperience />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default page;
