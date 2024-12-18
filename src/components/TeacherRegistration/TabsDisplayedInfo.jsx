import DualButton from "../Globals/DualButton";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

const TabsDisplayedInfo = ({ activeTab, setActiveTab }) => {
  return (
    <form className="p-4 rounded-[32px] bg-primary-color-P11">
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

      {activeTab !== 4 && (
        <DualButton
          dualButtonWrapper={"gap-[50px] mt-[50px]"}
          leftButtonText={"Back"}
          rightButtonText={"Save, and continue"}
          rightButtonType={"submit"}
        />
      )}
    </form>
  );
};

export default TabsDisplayedInfo;
