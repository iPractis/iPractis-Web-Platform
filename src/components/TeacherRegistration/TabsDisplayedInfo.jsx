import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

const TabsDisplayedInfo = ({ activeTab, setActiveTab }) => {
  return (
    <form className="max-w-[494px] mx-auto">
      {/* 0 */}
      <TabProfile activeTab={activeTab} />

      {/* 1 */}
      <TabSubject activeTab={activeTab} />

      {/* 2 */}
      <TabBackground activeTab={activeTab} />

      {/* 3 */}
      <TabAvailability activeTab={activeTab} />

      {/* 4 */}
      <TabStatus activeTab={activeTab} />

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </form>
  );
};

export default TabsDisplayedInfo;
