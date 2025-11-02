import AvailabilityRevision from "./AvailabilityRevision";
import { useEffect } from "react";

const TabReview = ({ activeTab , draftData}) => {
  return (
    <div className={`${activeTab !== 4 && "hidden"}`}>
      <AvailabilityRevision draftData={draftData}/>
    </div>
  );
};

export default TabReview;
