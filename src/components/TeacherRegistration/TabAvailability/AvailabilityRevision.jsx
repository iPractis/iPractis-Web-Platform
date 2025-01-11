import WorkScheduleTable from "../../Globals/WorkScheduleTable";
import SectionHeader from "../../Globals/SectionHeader";
import TeacherInfo from "./TeacherInfo";

// Icons
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import { Clock1215Icon } from "../../Icons";

const AvailabilityRevision = () => {
  return (
    <section>
      <TeacherInfo />

      <SectionHeader
        titleIcon={<Clock1215Icon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleClassName="gap-5 MT-SB-2"
        titleText={"Availability"}
      />

      <WorkScheduleTable />
    </section>
  );
};

export default AvailabilityRevision;
