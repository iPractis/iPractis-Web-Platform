import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";
import TabReview from "./TabReview";

const TabsDisplayedInfo = ({ setActiveTab, activeTab, draft }) => {
  return (
    <main className={`max-w-[1200px] lg:px-0 px-8 sm:py-0 py-8 mx-auto`}>
      {/* 0 */}
      <TabProfile
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 1 */}
      <TabSubject
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 2 */}
      <TabBackground
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 3 */}
      <TabAvailability
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 4 */}
      <TabReview activeTab={activeTab} draftData={draft} />

      {/* 5 */}
      <TabStatus activeTab={activeTab} />
    </main>
  );
};

export default TabsDisplayedInfo;
