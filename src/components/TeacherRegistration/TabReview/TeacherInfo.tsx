import TeacherInfoProfile from "./TeacherInfoProfile";
import TeacherInfoVideo from "./TeacherInfoVideo";
import TeacherInfoAbout from "./TeacherInfoAbout";

const TeacherInfo = ({draftData}) => {
  return (
    <>
      <TeacherInfoProfile draftData={draftData}/>
      <TeacherInfoAbout draftData={draftData}/>
    </>
  );
};

export default TeacherInfo;
