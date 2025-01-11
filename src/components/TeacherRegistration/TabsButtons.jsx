import { tabsButtons } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../Globals/SectionHeader";
import { ChevronRightBiggerIcon, DocumentIcon } from "../Icons";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";

const TabsButtons = ({ activeTab, setActiveTab, setSaved, saved }) => {
  // We do this because texts changes at the beggining and at the end of form submission
  const sectionHeaderContent = [
    {
      titleText: "Complete the application form",
      descriptionText:
        "Fill the form with all the necessary information, we will review them as soon as possible.",
    },

    {
      titleText: "Form completed and send seccesfully",
      descriptionText:
        "Your form has been successfully submitted! Our team will carefully review your application within 14 days, and we’ll update you as soon as possible. Thank you for your patience!",
    },

    {
      titleText: "Last step, review your profile before appling",
      descriptionText:
        "Double-check your info, then click Send application to finalize. Good luck!",
    },
  ];

  return (
    <section>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex items-center py-2 px-4 rounded-2xl ST-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => {
              setActiveTab(TabIndex);
              setSaved(false);
            }}
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

            <span className="md:block hidden w-full text-center font-bold">
              {TabButton?.textButton}
            </span>
          </button>
        ))}
      </div>

      {saved ? (
        <>
          <SectionHeader
            wrapperSectionHeaderClassName={`flex flex-col md:flex-row sm:items-center items-start md:gap-[70px] gap-4 p-8 rounded-[22px] bg-tertiary-color-SC11 MT-1`}
            descriptionText={sectionHeaderContent[2]?.descriptionText}
            titleText={sectionHeaderContent[2]?.titleText}
            descriptionClassName={"mt-[4px]"}
            titleIcon={<DocumentIcon />}
            titleClassName="MT-SB-1"
          >
            <div className="md:w-auto w-full">
              <button
                className="btn btn-secondary flex justify-between items-center gap-2.5 p-1.5 ps-4 rounded-2xl w-full"
                onClick={() => {
                  setActiveTab(4);
                  setSaved(false);
                }}
                type="button"
              >
                <span className="px-1.5">
                  Send your applicaton for reviewing
                </span>{" "}
                <InputBGWrapperIcon>
                  <ChevronRightBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
                </InputBGWrapperIcon>
              </button>
            </div>
          </SectionHeader>
        </>
      ) : (
        <SectionHeader
          wrapperSectionHeaderClassName={`p-8 rounded-[22px] ${
            activeTab === 4
              ? "bg-quinary-color-VS10"
              : "bg-quaternary-color-A10"
          }`}
          descriptionText={
            activeTab < 4
              ? sectionHeaderContent[0]?.descriptionText
              : sectionHeaderContent[1]?.descriptionText
          }
          titleText={
            activeTab < 4
              ? sectionHeaderContent[0]?.titleText
              : sectionHeaderContent[1]?.titleText
          }
          descriptionClassName={"mt-[4px]"}
          titleIcon={<DocumentIcon />}
          titleClassName="MT-SB-1"
        />
      )}
    </section>
  );
};

export default TabsButtons;
