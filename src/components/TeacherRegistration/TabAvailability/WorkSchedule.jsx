import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import WorkScheduleTable from "../../Shared/WorkScheduleTable";

// Icons
import { LuggageClockIcon } from "../../Icons";

const WorkSchedule = ({ control, setDailyWorkTimeLimit }) => {
  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<LuggageClockIcon fillcolor="fill-primary-color-P1" />}
        titleText="Set up your working availability"
        descriptionText="Minimum working time is set to 8 hours per week"
        titleClassName="MT-SB-1"
      />
      <SectionContent className="w-full">
        <WorkScheduleTable
          setDailyWorkTimeLimit={setDailyWorkTimeLimit}
          showCurrentActiveDay={false}
          control={control}
        />
      </SectionContent>
    </SectionWrapper>
  );
};

export default WorkSchedule;
