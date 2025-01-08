import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import StudentPreference from "./StudentPreferences";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";
import PresentYourSelf from "./PresentYourSelf";
import AveragePrice from "./AveragePrice";
import StudentAge from "./StudentAge";

// Icons
import { NotebookOpenedIcon } from "../../Icons";

const TabSubject = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 1 && "hidden"}`}>
      <SectionHeader
        descriptionText="Select the subjects you wish to teach and provide detailed information about your expertise."
        titleIcon={<NotebookOpenedIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={"p-4 mb-[50px]"}
        titleText="Subject section"
        titleClassName="MT-SB-1"
      />

      <div className="space-y-4">
        {/* Set up your teaching subject AND choose your specialties */}
        <WhiteSpaceWrapper className="flex items-start flex-col sm:flex-row gap-[50px]">
          <SubjectsToTeach />

          <RelatedSubTopics />
        </WhiteSpaceWrapper>

        {/* Present yourself */}
        <WhiteSpaceWrapper className="space-y-[50px]">
          <PresentYourSelf />
        </WhiteSpaceWrapper>

        {/* Student preferenes and student's age */}
        <WhiteSpaceWrapper className="flex items-start flex-col sm:flex-row gap-[50px]">
          <StudentPreference />

          <StudentAge />
        </WhiteSpaceWrapper>

        {/* Average price and withdrawal */}
        <WhiteSpaceWrapper className="flex items-start flex-col sm:flex-row gap-[50px]">
          <AveragePrice />

          <StudentAge />
        </WhiteSpaceWrapper>
      </div>
    </div>
  );
};

export default TabSubject;
