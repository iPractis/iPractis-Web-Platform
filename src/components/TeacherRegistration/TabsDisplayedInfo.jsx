import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

const TabsDisplayedInfo = ({ activeTab, setActiveTab }) => {
  return (
    <form>
      {/* 0 */}
      <TabProfile activeTab={activeTab} />

      {/* 1 */}
      <TabSubject activeTab={activeTab} />

      {/* 2 */}
      <div className="max-w-[494px] mx-auto">
        <TabBackground activeTab={activeTab} />
      </div>

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
