import SectionHeader from "../../Shared/SectionHeader";
import HowWorksAndSkills from "./HowWorksAndSkills";
import { AnalyticIcon, CheckedDocumentIcon } from "../../Icons";

const TabStatus = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 5 && "hidden"}`}>
      {/* Form completed and sent successfully box */}
      <SectionHeader
        descriptionText={"Your form has been successfully submitted! Our team will carefully review your application within 14 days, and we'll update you as soon as possible. Thank you for your patience!"}
        titleIcon={<CheckedDocumentIcon fillcolor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "bg-[#A3FFBD] rounded-[32px] p-8 mb-[50px]"
        }
        titleText="Form completed and sent successfully"
        titleClassName="MT-SB-1"
      />

      {/* Your application is waiting for approval box */}
      <SectionHeader
        descriptionText={"Your application is currently pending approval. We appreciate your patience and will notify you as soon as your application has been reviewed. Feel free to edit your profile to improve it."}
        titleIcon={<AnalyticIcon fillcolor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8 mb-[50px]"
        }
        titleText="Your application is waiting for approval"
        titleClassName="MT-SB-1"
      />

      <HowWorksAndSkills />
    </div>
  );
};

export default TabStatus;
