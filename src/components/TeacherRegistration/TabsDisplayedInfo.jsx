import DualButton from "../Globals/DualButton";
import TabProfile from "./TabProfile";

const TabsDisplayedInfo = ({ activeTab, setActiveTab }) => {
  return (
    <form className="p-4 rounded-[32px] bg-primary-color-P11">
      <TabProfile activeTab={activeTab} />

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
