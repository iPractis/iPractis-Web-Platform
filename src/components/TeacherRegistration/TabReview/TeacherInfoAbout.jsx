const TeacherInfoAbout = ({draftData}) => {
  return (
    <article className="px-4">
      {/* FROM SM TO BOTTOM IS VISIBLE */}
      <ul className="sm:hidden flex items-center gap-2.5 mt-5">
        { draftData.languages.map((language, index) => (
          <li key={index} className="flex items-center gap-[5px]">
            <p className="ST-SB-2 text-primary-color-P1">{language.name}</p>
          

          <p className="ST-SB-1 py-[2px] px-1.5 rounded-md bg-primary-color-P1 text-primary-color-P12">
            {language.level}
          </p>
        </li>
        ))}

        
      </ul>

      <div className="py-4 mt-5">
        <h3 className="MT-SB-1 text-primary-color-P1 mb-2.5">About me</h3>
        <p className="ST-3 text-primary-color-P4 mb-[26px]">
          {draftData.introduction}
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            className="btn btn-primary MT-SB-1 px-4 py-1.5 rounded-2xl h-12"
          >
            Teaches {draftData.studentLevel} level
          </button>

          {draftData.teachToYoungPersons && <button
            type="button"
            className="btn btn-primary MT-SB-1 px-4 py-1.5 rounded-2xl h-12"
          >
            Teaches all ages
          </button>}
        </div>
      </div>

      <div className="py-4 mt-5">
        <h2 className="MT-SB-1 text-primary-color-P1 mb-5">
            {
              draftData.profileTitle
            }
        </h2>
        <p className="ST-3 text-primary-color-P4">
          {
            draftData.subjectIntroduction
          }
        </p>
      </div>
    </article>
  );
};

export default TeacherInfoAbout;
