import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import DualButton from "../Globals/DualButton";
import { redirect } from "next/navigation";

const TabsButtonsBottomNav = ({
  isTabAvailabilityPending,
  isTabBackgroundPending,
  isTabSubjectPending,
  isTabProfilePending,
  setActiveTab,
  activeTab,
}) => {
  const pendingConditions =
    isTabBackgroundPending ||
    isTabSubjectPending ||
    isTabAvailabilityPending ||
    isTabProfilePending;

  return (
    activeTab !== 4 && (
      <DualButton
        dualButtonWrapper={"gap-4 mt-16 md:px-8"}
        rightButtonClassName={
          "flex-1 disabled:opacity-20 disabled:pointer-events-none"
        }
        leftButtonClassName={
          "flex-1 disabled:opacity-20 disabled:pointer-events-none"
        }
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
        leftButtonDisabled={pendingConditions}
        rightButtonDisabled={pendingConditions}
        rightButtonText={
          <div className="flex justify-center items-center">
            {pendingConditions ? (
              "Loading..."
            ) : (
              <>
                <span className="md:hidden block flex-[100%]">Continue</span>

                <span className="md:block hidden flex-[100%]">
                  Save, and continue
                </span>

                <div className="flex-1">
                  <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
                </div>
              </>
            )}
          </div>
        }
        rightButtonType={"submit"}
      />
    )
  );
};

export default TabsButtonsBottomNav;
