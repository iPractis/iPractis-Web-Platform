import SectionHeader from "../../Shared/SectionHeader";
import WorkScheduleTable from "../../Shared/WorkScheduleTable";

// Icons
import { LuggageClockIcon } from "../../Icons";

const WorkSchedule = ({ control, setDailyWorkTimeLimit }) => {
  return (
    <>
      <SectionHeader
        descriptionText="Minimum working time is set to 8 hours per week"
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between mb-8 mt-[60px]"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <LuggageClockIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Set up your working availability"
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
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
