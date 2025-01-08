import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";

// Icons
import { NotebookOpenedIcon, TagIcon } from "../../Icons";
import PresentYourSelf from "./PresentYourSelf";

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
        <WhiteSpaceWrapper className="flex items-start flex-col sm:flex-row gap-[50px]">
          <div className="flex-1">
            <SectionHeader
              wrapperSectionHeaderClassName={"pb-[50px]"}
              descriptionText="Remember, students rely on this information to choose their teacher."
              titleIcon={
                <NotebookOpenedIcon fillColor={"fill-primary-color-P1"} />
              }
              titleText="Set up your teaching subject"
              titleClassName="MT-SB-1"
            />

            <SubjectsToTeach />
          </div>

          <div className="flex-1">
            <SectionHeader
              wrapperSectionHeaderClassName={"pb-[50px]"}
              descriptionText="Highlight your teaching methods and the subtopics you've mastered."
              titleIcon={<TagIcon fillColor={"fill-primary-color-P1"} />}
              titleText="Choose your specialties"
              titleClassName="MT-SB-1"
            />

            <RelatedSubTopics />
          </div>
        </WhiteSpaceWrapper>

        <PresentYourSelf />
      </div>
    </div>
  );
};

export default TabSubject;
