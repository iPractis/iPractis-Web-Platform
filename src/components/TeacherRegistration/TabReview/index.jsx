import AvailabilityRevision from "./AvailabilityRevision";

const TabReview = ({ activeTab , draftData}) => {
  return (
    <div className={`${activeTab !== 4 && "hidden"}`}>
      <AvailabilityRevision draftData={draftData}/>
    </div>
  );
};

export default TabReview;
