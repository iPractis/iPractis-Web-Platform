import WorkScheduleTable from "../../Shared/WorkScheduleTable";
import TeacherInfoSpecialties from "./TeacherInfoSpecialties";
import TeacherInfoExperience from "./TeacherInfoExperience";
import TeacherInfoEducation from "./TeacherInfoEducation";
import TeacherInfo from "./TeacherInfo";

const AvailabilityRevision = ({draftData}) => {
  return (
    <section>
      <TeacherInfo draftData={draftData}/>

      {/* <SectionHeader
        titleIcon={<Clock1215Icon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleClassName="gap-5"
        titleText={"Availability"}
      /> */}

      {/* <WorkScheduleTable
        wrapperClassName={"mt-5"}
        bookedLessonSpot
        showCurrentDate
        timeZoneFilter
        fromToFilter
      /> */}

      <TeacherInfoSpecialties draftData={draftData}/>

      {/* <TeacherInfoReviews /> */}

      <TeacherInfoExperience draftData={draftData}/>

      <TeacherInfoEducation draftData={draftData}/>
    </section>
  );
};

export default AvailabilityRevision;
