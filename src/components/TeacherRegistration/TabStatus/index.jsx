import { AnalyticIcon,  DocumentIcon } from "../../Icons";
import HowWorksAndSkills from "./HowWorksAndSkills";

const TabStatus = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 5 && "hidden"}`}>
      {/* Form completed and sent successfully box */}
      <div className="bg-[#A3FFBD] rounded-[32px] p-8 mb-[50px]">
        <div className="flex items-center gap-1 mb-1">
          <div className="h-[24px] w-[24px] items-center flex">
            <DocumentIcon fillcolor={"fill-primary-color-P1"} />
          </div>
          <h2 className="ST-SB-4 text-primary-color-P1">Form completed and sent successfully</h2>
        </div>
        <p className="text-primary-color-P4 ST-3">
          Your form has been successfully submitted! Our team will carefully review your application within 14 days, and we&apos;ll update you as soon as possible. Thank you for your patience!
        </p>
      </div>

      {/* Your application is waiting for approval box */}
      <div className="bg-primary-color-P11 rounded-[32px] p-8 mb-[50px]">
        <div className="flex items-center gap-1 mb-1">
          <div className="h-[24px] w-[24px] items-center flex">
            <AnalyticIcon fillcolor={"fill-primary-color-P1"} />
          </div>
          <h2 className="ST-SB-4 text-primary-color-P1">Your application is waiting for approval</h2>
        </div>
        <p className="text-primary-color-P4 ST-3">
          Your application is currently pending approval. We appreciate your patience and will notify you as soon as your application has been reviewed. Feel free to edit your profile to improve it.
        </p>
      </div>

      <HowWorksAndSkills />
    </div>
  );
};

export default TabStatus;
