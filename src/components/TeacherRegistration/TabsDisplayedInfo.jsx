import DualButton from "../Globals/DualButton";
import TabAvailability from "./TabAvailability";
import TabBackground from "./TabBackground";
import TabSubject from "./TabSubject";
import TabProfile from "./TabProfile";
import TabStatus from "./TabStatus";

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

      <DualButton
        dualButtonWrapper={"gap-[50px] mt-[50px]"}
        leftButtonText={"Back"}
        rightButtonText={"Save, and continue"}
        rightButtonType={"submit"}
      />
    </form>
  );
};

export default TabsDisplayedInfo;
