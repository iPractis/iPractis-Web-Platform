import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import DualButton from "../Globals/DualButton";
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
          leftButtonText={
            <div className="flex justify-center items-center">
              <div className="flex-1">
                <ChevronLeftIcon fillColor={"fill-primary-color-P12"} />
              </div>

              <span className="flex-[100%]">Back</span>
            </div>
          }
          rightButtonText={
            <div className="flex justify-center items-center">
              <span className="flex-[100%]">Save, and continue</span>

              <div className="flex-1">
                <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
              </div>
            </div>
          }
          rightButtonType={"submit"}
        />
      )}
    </form>
  );
};

export default TabsDisplayedInfo;
