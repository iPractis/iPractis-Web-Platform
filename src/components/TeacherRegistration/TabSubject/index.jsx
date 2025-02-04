import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import StudentPreference from "./StudentPreferences";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";
import PresentYourSelf from "./PresentYourSelf";
import AveragePrice from "./AveragePrice";
import Withdrawal from "./Withdrawal";
import StudentAge from "./StudentAge";

const TabSubject = ({
  setTeachToAmateurPersons,
  setTeachToYoungPersons,
  setSelectedSubSubjects,
  teachToAmateurPersons,
  selectedSubSubjects,
  teachToYoungPersons,
  setSubjectToTeach,
  setSelectedLevel,
  subjectToTeach,
  selectedLevel,
  setWithdrawal,
  withdrawal,
  activeTab,
  errors,
  draft,
}) => {
  return (
    <div className={`${activeTab !== 1 && "hidden"}`}>
      <WhiteSpaceWrapper className={"p-0"}>
        <SubjectsToTeach
          setSubjectToTeach={setSubjectToTeach}
          subjectToTeach={subjectToTeach}
          errors={errors}
          draft={draft}
        />

        <RelatedSubTopics
          setSelectedSubSubjects={setSelectedSubSubjects}
          selectedSubSubjects={selectedSubSubjects}
          errors={errors}
        />

        <PresentYourSelf draft={draft} errors={errors} />

        <StudentPreference
          setSelectedLevel={setSelectedLevel}
          selectedLevel={selectedLevel}
          errors={errors}
        />

        <StudentAge
          setTeachToAmateurPersons={setTeachToAmateurPersons}
          setTeachToYoungPersons={setTeachToYoungPersons}
          teachToAmateurPersons={teachToAmateurPersons}
          teachToYoungPersons={teachToYoungPersons}
          errors={errors}
        />

        <AveragePrice draft={draft} />

        <Withdrawal
          setWithdrawal={setWithdrawal}
          withdrawal={withdrawal}
          errors={errors}
          draft={draft}
        />
      </WhiteSpaceWrapper>
    </div>
  );
};

export default TabSubject;
