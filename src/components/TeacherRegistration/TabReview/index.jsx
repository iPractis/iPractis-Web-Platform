import AvailabilityRevision from "./AvailabilityRevision";

const TabReview = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 4 && "hidden"}`}>
      <AvailabilityRevision />
    </div>
  );
};

export default TabReview;
