import { tabsButtons } from "@/src/data/dataAccountSettings";
import SectionHeader from "../Globals/SectionHeader";
import { SearchIcon } from "../Icons";

const TabsButtons = ({ activeTab, setActiveTab }) => {
  return (
    <section>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex gap-3 items-center md:justify-start justify-center p-1.5 rounded-2xl ST-SB-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => setActiveTab(TabIndex)}
          >
            <span className="bg-primary-color-P1 p-1 rounded-[10px]">
              <TabButton.Icon fillColor={"fill-primary-color-P12"} />
            </span>

            <span className="md:block hidden font-bold">
              {TabButton?.textButton}
            </span>
          </button>
        ))}
      </div>

      <SectionHeader
        descriptionText={"Find any feature or settings quickly."}
        titleText={"Search for a feature or an option"}
        descriptionClassName={"mt-[4px]"}
        titleIcon={<SearchIcon />}
        titleClassName="MT-SB-1"
      />
    </section>
  );
};

export default TabsButtons;
