import WorkScheduleTable from "../../Shared/WorkScheduleTable";
import TeacherInfoSpecialties from "./TeacherInfoSpecialties";
import TeacherInfoExperience from "./TeacherInfoExperience";
import TeacherInfoEducation from "./TeacherInfoEducation";
import TeacherInfo from "./TeacherInfo";

const AvailabilityRevision = ({ selectedSlots, setSelectedSlots }) => {
  return (
    <section>
      <TeacherInfo />

      {/* <SectionHeader
        titleIcon={<Clock1215Icon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleClassName="gap-5"
        titleText={"Availability"}
      /> */}

      <WorkScheduleTable
        setSelectedSlots={setSelectedSlots}
        selectedSlots={selectedSlots}
        wrapperClassName={"mt-5"}
        bookedLessonSpot
        showCurrentDate
        timeZoneFilter
        fromToFilter
      />

      <TeacherInfoSpecialties />

      {/* <TeacherInfoReviews /> */}

      <TeacherInfoExperience />

      <TeacherInfoEducation />
    </section>
  );
};

export default AvailabilityRevision;
