import TabNotification from "./TabNotification/index";
import TabDashboard from "./TabDashboard/index";
import TabSecurity from "./TabSecurity/index";
import TabAccount from "./TabAccount/index";
import TabFinance from "./TabFinance/index";
import TabAvailability from "./TabAvailablity";

const TabsDisplayedInfo = ({ activeTab }) => {
  console.log("Active Tab in TabsDisplayedInfo:", activeTab);
  return (
    <main className={`max-w-[1000px] mx-auto`}>
      {/* 0 */}
      <TabDashboard activeTab={activeTab} />

      {/* 1 */}
      <TabAccount activeTab={activeTab} />

      {/* 2 */}
      <TabSecurity activeTab={activeTab} />

      {/* 3 */}
      <TabNotification activeTab={activeTab} />

      {/* 4 */}
      <TabFinance activeTab={activeTab} />


      <TabAvailability activeTab={activeTab}/>
    </main>
  );
};

export default TabsDisplayedInfo;
