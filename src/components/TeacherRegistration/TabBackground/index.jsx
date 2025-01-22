import Experience from "./Experience";
import Education from "./Education";

const TabBackground = ({
  setExperiences,
  setEducations,
  experiences,
  educations,
  activeTab,
}) => {
  return (
    <div className={`${activeTab !== 2 && "hidden"} space-y-16`}>
      {/* Experience Section */}
      <Experience setExperiences={setExperiences} experiences={experiences} />

      {/* Education Section */}
      <Education setEducations={setEducations} educations={educations} />
    </div>
  );
};

export default TabBackground;
