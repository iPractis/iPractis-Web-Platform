import WorkScheduleTable from "../../Globals/WorkScheduleTable";
import TeacherInfoSpecialties from "./TeacherInfoSpecialties";
import TeacherInfoExperience from "./TeacherInfoExperience";
import TeacherInfoEducation from "./TeacherInfoEducation";
import SectionHeader from "../../Globals/SectionHeader";
import TeacherInfoReviews from "./TeacherInfoReviews";
import TeacherInfo from "./TeacherInfo";

// Icons
import { Clock1215Icon } from "../../Icons";

const AvailabilityRevision = () => {
  return (
    <section>
      <TeacherInfo />

      <SectionHeader
        titleIcon={<Clock1215Icon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleClassName="gap-5"
        titleText={"Availability"}
      />

      <WorkScheduleTable bookedLessonSpot timeZoneFilter />

      <TeacherInfoSpecialties />

      <TeacherInfoReviews />

      <TeacherInfoExperience />

      <TeacherInfoEducation />
    </section>
  );
};

export default AvailabilityRevision;
