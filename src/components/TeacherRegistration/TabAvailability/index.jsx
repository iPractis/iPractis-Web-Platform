import AvailabilityRevision from "./AvailabilityRevision";
import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

const TabAvailability = ({ activeTab, saved }) => {
  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      <div className={`${!saved ? "block" : "hidden"}`}>
        <WorkTimePreferences />

        <WorkSchedule />
      </div>

      {/* If user HITS Save button we dissapear top info and make visible bottom one */}
      <div className={`${saved ? "block" : "hidden"}`}>
        <AvailabilityRevision />
      </div>
    </div>
  );
};

export default TabAvailability;
