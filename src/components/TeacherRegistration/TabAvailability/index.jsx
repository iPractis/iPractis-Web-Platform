import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

const TabAvailability = ({
  setSelectedSlots,
  selectedSlots,
  activeTab,
  errors,
  draft,
}) => {
  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      <WorkTimePreferences
        selectedSlots={selectedSlots}
        errors={errors}
        draft={draft}
      />

      <WorkSchedule
        setSelectedSlots={setSelectedSlots}
        selectedSlots={selectedSlots}
      />
    </div>
  );
};

export default TabAvailability;
