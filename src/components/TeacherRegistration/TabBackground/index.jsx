import Experience from "./Experience";
import Education from "./Education";

const TabBackground = ({ activeTab, setExperiences, experiences, draft }) => {
  return (
    <div className={`${activeTab !== 2 && "hidden"} space-y-16`}>
      {/* Experience Section */}
      <Experience
        setExperiences={setExperiences}
        experiences={experiences}
        draft={draft}
      />

      {/* Education Section */}
      <Education />
    </div>
  );
};

export default TabBackground;
