import SectionHeader from "../../Globals/SectionHeader";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import { TagIcon } from "../../Icons";

const TeacherInfoSpecialties = () => {
  return (
    <article className="my-5">
      <SectionHeader
        titleIcon={<TagIcon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleText={"Specialties"}
      />

      <WhiteSpaceWrapper className={"bg-primary-color-P11"}>
        <h3 className="MT-SB-1 text-primary-color-P1 mb-5">Conversational</h3>
        <p className="ST-4 text-primary-color-P4">
          I use English in my daily life and work. I only read books and watch
          movies in English. I have been teaching conversational English for 12
          years.
        </p>
      </WhiteSpaceWrapper>

      <WhiteSpaceWrapper className={"bg-primary-color-P11 mt-5"}>
        <h3 className="MT-SB-1 text-primary-color-P1 mb-5">
          English job interview
        </h3>
        <p className="ST-4 text-primary-color-P4">
          I can help you look confident and professional during your interview.
          I will tell you what to expect so you will be prepared for any trick
          questions that may come up.
        </p>
      </WhiteSpaceWrapper>
    </article>
  );
};

export default TeacherInfoSpecialties;
