import AvailabilityRevision from "./AvailabilityRevision";
import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";
import { useState } from "react";

const TabAvailability = ({ activeTab, saved, draft, errors }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);

  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      <div className={`${!saved ? "block" : "hidden"}`}>
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

      {/* If user HITS Save button we dissapear top info and make visible bottom one */}
      <div className={`${saved ? "block" : "hidden"}`}>
        <AvailabilityRevision
          setSelectedSlots={setSelectedSlots}
          selectedSlots={selectedSlots}
        />
      </div>
    </div>
  );
};

export default TabAvailability;
