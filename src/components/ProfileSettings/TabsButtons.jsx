import { tabsButtons } from "@/src/data/dataProfileSettings";
import { useState } from "react";

// Images && icons

const TabsButtons = ({ activeTab, setActiveTab }) => {

  return (
    <section>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabButton?.id ?? TabButton?.textButton}
            className={`w-full flex gap-3 items-center justify-center p-1.5 rounded-2xl ST-SB-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => setActiveTab(TabIndex)}
            type="button"
          >
            <span
              className={`${
                activeTab === TabIndex
                  ? "bg-tertiary-color-SC5"
                  : "bg-primary-color-P12"
              } p-1 rounded-[10px]`}
            >
              <TabButton.Icon
                fillcolor={
                  activeTab === TabIndex
                    ? "fill-primary-color-P12"
                    : "fill-primary-color-P1"
                }
              />
            </span>

            <span className="md:block hidden font-bold">
              {TabButton?.textButton}
            </span>
          </button>
        ))}
      </div>

      
    </section>
  );
};

export default TabsButtons;
