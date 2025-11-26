import SectionHeader from "../../Shared/SectionHeader";
import WorkScheduleTable from "../../Shared/WorkScheduleTable";

// Icons
import { LuggageClockIcon } from "../../Icons";

const WorkSchedule = ({ control, setDailyWorkTimeLimit }) => {
  return (
    <>
      <SectionHeader
        titleIcon={<LuggageClockIcon fillcolor="fill-primary-color-P1" />}
        titleText="Set up your working availability"
        descriptionText="Minimum working time is set to 8 hours per week"
        titleClassName="MT-SB-1"
      />

      <div>
        <WorkScheduleTable
          setDailyWorkTimeLimit={setDailyWorkTimeLimit}
          showCurrentActiveDay={false}
          control={control}
        />
      </div>
    </>
  );
};

export default WorkSchedule;
