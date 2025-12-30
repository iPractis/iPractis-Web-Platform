import { GraduationCapIcon } from "../../Icons";
import TeacherInfoCard from "./TeacherInfoCard";

const TeacherInfoEducation = ({ draftData }) => {
  return (
    <TeacherInfoCard
      draftData={draftData}
      icon={GraduationCapIcon}
      title="Teacher's education"
      description="Academic qualifications and educational background that inform the teacher's instructional approach."
      dataKey="education"
      fallbackText="Unnamed Institution"
    />
  );
};

export default TeacherInfoEducation;
