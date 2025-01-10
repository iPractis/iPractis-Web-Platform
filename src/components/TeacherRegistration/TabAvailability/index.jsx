import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

const TabAvailability = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      <WorkTimePreferences />

      <WorkSchedule />
    </div>
  );
};

export default TabAvailability;
