import WorkTimePreferences from "./WorkTimePreferences";

const TabAvailability = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      <WorkTimePreferences />
    </div>
  );
};

export default TabAvailability;
