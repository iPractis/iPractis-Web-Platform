import SectionHeader from "../../Globals/SectionHeader";
import SecurityCheckUp from "./SecurityCheckUp";

// Images && icons
import { DocumentIcon } from "../../Icons";

const TabDashboard = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"} space-y-8`}>
      <SectionHeader
        titleIcon={<DocumentIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName="bg-quaternary-color-A10 rounded-[32px] p-8"
        descriptionText={"Do an important thing"}
        descriptionClassName={"mt-[4px]"}
        titleClassName="MT-SB-1"
        titleText={"Important"}
      />

      <SecurityCheckUp />
    </div>
  );
};

export default TabDashboard;
