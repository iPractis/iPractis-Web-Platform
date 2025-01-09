import Experience from "./Experience";
import Education from "./Education";

const TabBackground = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 2 && "hidden"} space-y-16`}>
      {/* Experience Section */}
      <Experience />

      {/* Education Section */}
      <Education />
    </div>
  );
};

export default TabBackground;
