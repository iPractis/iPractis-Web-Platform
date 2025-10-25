import AvailabilityRevision from "./AvailabilityRevision";
import { useEffect } from "react";

const TabReview = ({ activeTab , draftData}) => {
  useEffect(() => {
    console.log("TabReview - draftData updated:", draftData);
  }, [draftData]);
  
  return (
    <div className={`${activeTab !== 4 && "hidden"}`}>
      <AvailabilityRevision draftData={draftData}/>
    </div>
  );
};

export default TabReview;
