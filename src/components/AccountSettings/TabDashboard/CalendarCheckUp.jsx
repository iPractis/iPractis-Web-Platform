import SectionHeader from "../../Shared/SectionHeader";
import InfoCard from "./InfoCard";

// Images && icons
import {
  CalendarBiggerIcon,
  CalendarBiggestIcon,
  Clock5Icon,
} from "../../Icons";

const CalendarCheckUp = () => {
  return (
    <div className="space-y-6">
      <SectionHeader
        descriptionText={
          "Ensure your calendar is synced and up-to-date for seamless lesson scheduling and time management."
        }
        wrapperSectionHeaderClassName="px-4"
        titleIcon={<CalendarBiggerIcon fillcolor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px] mb-4"}
        titleText={"Calender Check-Up"}
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard
          title="External calendar sync"
          description="Synchronization"
          icon={CalendarBiggestIcon}
          togglePosition="right"
          isActive={true}
          status="On"
        />

        <InfoCard
          title="Time zone change alert"
          togglePosition="right"
          description="Alert"
          icon={Clock5Icon}
          isActive={true}
        />
      </div>
    </div>
  );
};

export default CalendarCheckUp;
