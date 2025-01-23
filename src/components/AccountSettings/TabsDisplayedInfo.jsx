import TabNotification from "./TabNotification/index";
import TabDashboard from "./TabDashboard/index";
import TabSecurity from "./TabSecurity/index";
import TabAccount from "./TabAccount/index";
import TabFinance from "./TabFinance/index";

const TabsDisplayedInfo = ({ activeTab }) => {
  return (
    <form className={`max-w-[1000px] sm:px-16 px-8 sm:py-0 py-8 mx-auto`}>
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
    </form>
  );
};

export default TabsDisplayedInfo;
