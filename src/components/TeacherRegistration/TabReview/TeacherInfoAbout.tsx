const TeacherInfoAbout = ({draftData}) => {
  // Function to get color based on language level
  const getLevelColor = (level) => {
    const levelColors = {
      'C2': 'bg-[#4CAF50]', // Green
      'C1': 'bg-[#2196F3]', // Blue
      'B2': 'bg-[#9C27B0]', // Purple
      'B1': 'bg-[#FF9800]', // Orange
      'A2': 'bg-[#E91E63]', // Pink
      'A1': 'bg-[#FFC107]', // Yellow
      'Native': 'bg-[#000000]', // Black
      'Fluent': 'bg-[#4CAF50]', // Green
      'Basic': 'bg-[#FF9800]', // Orange
    };
    
    // Check for exact match first
    if (levelColors[level]) {
      return levelColors[level];
    }
    
    // Check if level contains any of the keys
    for (const [key, color] of Object.entries(levelColors)) {
      if (level && level.includes(key)) {
        return color;
      }
    }
    
    // Default color
    return 'bg-primary-color-P1';
  };

  return (
    <article className="px-4">
      {/* FROM SM TO BOTTOM IS VISIBLE */}
      {draftData.languages && draftData.languages.length > 0 && (
        <ul className="sm:hidden flex items-center gap-2.5 mt-5">
          {draftData.languages.map((language, index) => (
            <li key={index} className="flex items-center gap-[5px]">
              <p className="ST-SB-2 text-primary-color-P1">{language.name}</p>
            
              <p className={`ST-SB-1 py-[2px] px-1.5 rounded-md text-white ${getLevelColor(language.level)}`}>
                {language.level}
              </p>
            </li>
          ))}
        </ul>
      )}

      {draftData.introduction && (
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
              Teaches {draftData.studentLevel ? (Array.isArray(draftData.studentLevel) ? draftData.studentLevel.join(', ') : draftData.studentLevel) : 'all'} level{draftData.studentLevel && Array.isArray(draftData.studentLevel) && draftData.studentLevel.length > 1 ? 's' : ''}
            </button>

            {draftData.teachToYoungPersons && <button
              type="button"
              className="btn btn-primary MT-SB-1 px-4 py-1.5 rounded-2xl h-12"
            >
              Teaches all ages
            </button>}
          </div>
        </div>
      )}

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
