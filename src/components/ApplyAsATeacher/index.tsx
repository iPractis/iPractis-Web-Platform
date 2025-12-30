import JoinCommunityTutors from "./JoinCommunityTutors";
import StepsToStartCareer from "./StepsToStartCareer";

export const ApplyAsATeacher = () => {
  return (
    <main className="container-page-v7 mt-[22px] sm:pt-[50px] p-10">
      {/* Join our top rated community tutors */}
      <JoinCommunityTutors />

      {/* Few steps to start your career */}
      <StepsToStartCareer />
    </main>
  );
};
