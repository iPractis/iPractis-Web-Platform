import TabPersonal from "./TabPersonal/index";
import TabDashboard from "./TabDashboard/index";
import TabProfile from "./TabProfile/index";
import TabBackground from "./TabBackground/index";

const TabsDisplayedInfo = ({ activeTab , userData }) => {
  return (
    <main className={`max-w-[1000px] mx-auto`}>
      {/* 0 - Personal */}
      <TabPersonal activeTab={activeTab}  userData= {userData.user}/>

      {/* 1 - Dashboard */}
      <TabDashboard activeTab={activeTab} />

      {/* 2 - Profile (main content from image) */}
      <TabProfile activeTab={activeTab}  userData= {userData.user} language = {userData?.teacher?.teacher_languages || []}/>
      {/* 3 - Background */}
      {/* <TabBackground activeTab={activeTab} /> */}
    </main>
  );
};

export default TabsDisplayedInfo;
