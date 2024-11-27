import Hero from "@/src/components/Home/Hero";
import BrowseSubjectsAndTutors from "../components/Home/BrowseSubjectsAndTutors";
import EasyStepsGetStarted from "../components/Home/EasyStepsGetStarted";

const page = () => {
  return (
    <main>
      {/* Hero and Carousel of Languagues */}
      <Hero />

      {/* Browse our subjects and tutors, cards and carousel */}
      <BrowseSubjectsAndTutors />

      {/* Only few easy steps to get started */}
      <EasyStepsGetStarted />
    </main>
  );
};

export default page;
