import JoinCommunityTutors from "./JoinCommunityTutors";
import StepsToStartCareer from "./StepsToStartCareer";

export const ApplyAsATeacher = () => {
  return (
    <main className="container-page-v5 sm:mt-[50px] mt-10 sm:mb-[100px] mb-10">
      {/* Join our top rated community tutors */}
      <JoinCommunityTutors />

      {/* Few steps to start your career */}
      <StepsToStartCareer />
    </main>
  );
};
