import CustomNextUiInput from "../Shared/CustomNextUiInput";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import SectionHeader from "../Shared/SectionHeader";
import { tabsButtons } from "@/src/data/dataProfileSettings";
import { useState } from "react";

// Images && icons
import { CircleLocationIcon, CloseIcon, SearchBigIcon } from "../Icons";

const TabsButtons = ({ activeTab, setActiveTab }) => {
  const [featureSearch, setFeatureSearch] = useState("");

  return (
    <section>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabButton?.id ?? TabButton?.textButton}
            className={`w-full flex gap-3 items-center md:justify-start justify-center p-1.5 rounded-2xl ST-SB-4 ${
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

      <SectionHeader
        titleIcon={<CircleLocationIcon fillcolor={"fill-primary-color-P1"} />}
        titleText={"Search for a feature or an option"}
        titleClassName={"MT-SB-1"}
        descriptionText={"Find any feature or settings quickly."}
        rightElement={
          <CustomNextUiInput
            bgColor="white"
            nameInput={"featureSearch"}
            value={featureSearch}
            onChange={(e) => setFeatureSearch(e.target.value)}
            placeholder={"Search for a feature"}
            startContent={
              <InputBGWrapperIcon className="bg-secondary-color-S11">
                <SearchBigIcon fillcolor={"fill-primary-color-P1"} />
              </InputBGWrapperIcon>
            }
            endContent={
              featureSearch && (
                <InputBGWrapperIcon
                  className={"bg-secondary-color-S11 cursor-pointer"}
                  onClick={() => setFeatureSearch("")}
                >
                  <CloseIcon strokeColor={"stroke-primary-color-P1"} />
                </InputBGWrapperIcon>
              )
            }
          />
        }
        rightElementClassName={"w-1/2"}
      />
    </section>
  );
};

export default TabsButtons;
