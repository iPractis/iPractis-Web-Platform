import AvailabilityRevision from "./AvailabilityRevision";

const TabReview = ({ setSelectedSlots, selectedSlots, activeTab }) => {
  return (
    <div className={`${activeTab !== 4 && "hidden"}`}>
      <AvailabilityRevision
        setSelectedSlots={setSelectedSlots}
        selectedSlots={selectedSlots}
      />
    </div>
  );
};

export default TabReview;
