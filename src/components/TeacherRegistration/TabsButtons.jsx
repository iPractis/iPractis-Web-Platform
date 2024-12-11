import { tabsButtons } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../Globals/SectionHeader";
import { DocumentIcon } from "../Icons";

const TabsButtons = ({ activeTab, setActiveTab }) => {
  return (
    <article className="p-4 rounded-[32px] bg-primary-color-P11">
      <div
        className={`flex items-center gap-2.5 rounded-2xl py-2 px-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex items-center py-2 px-2 rounded-lg ST-SB-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => setActiveTab(TabIndex)}
          >
            <span className="md:me-auto mx-auto self-start">
              <TabButton.Icon
                fillColor={
                  activeTab === TabIndex
                    ? "fill-primary-color-P1"
                    : "fill-primary-color-P12"
                }
              />
            </span>

            <span className="md:block hidden w-full text-center">
              {TabButton?.textButton}
            </span>
          </button>
        ))}
      </div>

      <SectionHeader
        descriptionText="Fill the form with all the necessary information, we will review them as soon as possible."
        titleText="Complete the application form"
        wrapperSectionHeaderClassName={"p-4"}
        titleIcon={<DocumentIcon />}
        titleClassName="MT-SB-1"
      />
    </article>
  );
};

export default TabsButtons;
