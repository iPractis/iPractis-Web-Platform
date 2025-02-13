import SectionHeader from "../../Shared/SectionHeader";
import WorkScheduleTable from "../../Shared/WorkScheduleTable";

// Icons
import { LuggageClockIcon } from "../../Icons";

const WorkSchedule = ({ selectedSlots, setSelectedSlots }) => {
  return (
    <>
      <SectionHeader
        descriptionText="Minimum working time is set to 8 hours par week, please consider your weekly tasks and commitment to define your work time."
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8 mb-[50px] mt-[60px]"
        }
        titleIcon={<LuggageClockIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Set your work schedule"
        titleClassName="MT-SB-1"
      />

      <div className="md:px-8">
        <WorkScheduleTable
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
        />
      </div>
    </>
  );
};

export default WorkSchedule;
