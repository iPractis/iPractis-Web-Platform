import { UserTieIcon } from "../../Icons";
import TeacherInfoCard from "./TeacherInfoCard";

const TeacherInfoExperience = ({ draftData }) => {
  return (
    <TeacherInfoCard
      draftData={draftData}
      icon={UserTieIcon}
      title="Teacher's professional experience"
      description="Professional background and career milestones that shape the teacher's instructional expertise."
      dataKey="careerExperience"
      fallbackText="Untitled Experience"
    />
  );
};

export default TeacherInfoExperience;
