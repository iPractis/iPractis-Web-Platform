import { hasIncompleteFields } from "@/src/lib/utils/hasIncompleteFields";
import {
  tabAvailabilityFields,
  sectionHeaderContent,
  tabBackgroundFields,
  tabProfileFields,
  tabSubjectFields,
  tabsButtons,
} from "@/src/data/dataTeacherRegistration";

import { ChevronRightBiggerIcon, DocumentIcon } from "../Icons";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import SectionHeader from "../Shared/SectionHeader";
import { useState } from "react";
const TabsButtons = ({ activeTab, setActiveTab, draft }) => {
  const [submitError, setSubmitError] = useState(null); // 👈 error state

  const completedTabProfile = hasIncompleteFields(tabProfileFields, draft);
  const completedTabSubject = hasIncompleteFields(tabSubjectFields, draft);
  const completedTabBackground = hasIncompleteFields(tabBackgroundFields, draft);
  const completedTabAvailability = hasIncompleteFields(tabAvailabilityFields, draft);

  const allTabsCompleted =
    !completedTabProfile &&
    !completedTabSubject &&
    !completedTabBackground &&
    !completedTabAvailability;

  const handleApplyNowClick = async () => {
    const userId = localStorage.getItem("userId");
    setSubmitError(null); // reset on new try

    try {
      const draftWithUserId = { ...draft, userId };

      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftWithUserId),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Insert failed:", errorData);

        if (errorData?.code === "23505") {
          setSubmitError("Form already in review, cannot submit new application.");
        } else {
          setSubmitError(errorData?.message || "Failed to submit application.");
        }
        return;
      }

      const result = await response.json();
      console.log("Application submitted:", result);
      setActiveTab(5);
    } catch (error) {
      console.error("Error submitting draft:", error);
      setSubmitError(error.message || "Unexpected error occurred.");
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1">
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex gap-3 items-center md:justify-start justify-center p-1.5 rounded-2xl ST-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => setActiveTab(TabIndex)}
          >
            <span
              className={`p-1 rounded-[10px] ${
                activeTab === TabIndex
                  ? "bg-tertiary-color-SC5"
                  : completedTabProfile && TabIndex === 0
                  ? "bg-quaternary-color-A6"
                  : completedTabSubject && TabIndex === 1
                  ? "bg-quaternary-color-A6"
                  : completedTabBackground && TabIndex === 2
                  ? "bg-quaternary-color-A6"
                  : completedTabAvailability && TabIndex === 3
                  ? "bg-quaternary-color-A6"
                  : !allTabsCompleted && TabIndex === 4
                  ? "bg-quaternary-color-A6"
                  : !allTabsCompleted && TabIndex === 5
                  ? "bg-quaternary-color-A6"
                  : "bg-quinary-color-VS6"
              }`}
            >
              <TabButton.Icon
                fillColor={
                  activeTab === TabIndex
                    ? "fill-primary-color-P12"
                    : "fill-primary-color-P1"
                }
              />
            </span>
            <span className="md:block hidden">{TabButton?.textButton}</span>
          </button>
        ))}
      </div>

    </section>
  );
};

export default TabsButtons;
