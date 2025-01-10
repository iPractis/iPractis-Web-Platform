import AvailabilityRevision from "./AvailabilityRevision";
import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

const TabAvailability = ({ activeTab, saved }) => {
  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      {saved ? (
        <AvailabilityRevision />
      ) : (
        <>
          <WorkTimePreferences />

          <WorkSchedule />
        </>
      )}
    </div>
  );
};

export default TabAvailability;
