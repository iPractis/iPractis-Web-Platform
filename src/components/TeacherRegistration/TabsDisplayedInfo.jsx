import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

const TabsDisplayedInfo = ({ setActiveTab, activeTab, saved, setSaved }) => {
  return (
    <form className={`${saved ? "max-w-[1000px] sm:px-16 px-8 sm:py-0 py-8": "max-w-[494px]"} mx-auto`}>
      {/* 0 */}
      <TabProfile activeTab={activeTab} />

      {/* 1 */}
      <TabSubject activeTab={activeTab} />

      {/* 2 */}
      <TabBackground activeTab={activeTab} />

      {/* 3 */}
      <TabAvailability activeTab={activeTab} saved={saved} />

      {/* 4 */}
      <TabStatus activeTab={activeTab} />

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />
    </form>
  );
};

export default TabsDisplayedInfo;
