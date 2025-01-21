import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import StudentPreference from "./StudentPreferences";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";
import PresentYourSelf from "./PresentYourSelf";
import AveragePrice from "./AveragePrice";
import Withdrawal from "./Withdrawal";
import StudentAge from "./StudentAge";

const TabSubject = ({
  setSubjectToTeach,
  subjectToTeach,
  activeTab,
  draft,
}) => {
  return (
    <div className={`${activeTab !== 1 && "hidden"}`}>
      <WhiteSpaceWrapper className={"p-0"}>
        <SubjectsToTeach
          setSubjectToTeach={setSubjectToTeach}
          subjectToTeach={subjectToTeach}
          draft={draft}
        />

        <RelatedSubTopics />

        <PresentYourSelf draft={draft} />

        <StudentPreference />

        <StudentAge />

        <AveragePrice />

        <Withdrawal draft={draft} />
      </WhiteSpaceWrapper>
    </div>
  );
};

export default TabSubject;
