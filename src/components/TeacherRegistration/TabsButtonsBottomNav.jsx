import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import DualButton from "../Globals/DualButton";
import { redirect } from "next/navigation";

const TabsButtonsBottomNav = ({ activeTab, setActiveTab }) => {
  return (
    activeTab !== 4 && (
      <DualButton
        dualButtonWrapper={"gap-4 mt-16"}
        rightButtonClassName={'md:flex-[40%] flex-1'}
        leftButtonClassName={'flex-1'}
        onClickLeftButton={() =>
          setActiveTab((prev) =>
            prev < 1 ? redirect("/apply-as-teacher") : prev - 1
          )
        }
        leftButtonText={
          <div className="flex justify-center items-center">
            <div className="flex-1">
              <ChevronLeftIcon fillColor={"fill-primary-color-P12"} />
            </div>

            <span className="flex-[100%]">Back</span>
          </div>
      }
        onClickRightButton={() => setActiveTab((prev) => prev + 1)}
        rightButtonText={
          <div className="flex justify-center items-center">
            <span className="md:hidden block flex-[100%]">Continue</span>

            <span className="md:block hidden flex-[100%]">Save, and continue</span>


            <div className="flex-1">
              <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
            </div>
          </div>
        }
        rightButtonType={"button"}
      />
    )
  );
};

export default TabsButtonsBottomNav;
