import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";

const TabProfile = ({
  setMasteredLanguages,
  setSelectedGender,
  masteredLanguages,
  selectedGender,
  setBirthDate,
  birthDate,
  activeTab,
  draft,
}) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      {/* Profile Picture */}
      <ProfilePicture />

      {/* Personal Informations */}
      <PersonalInfo
        setSelectedGender={setSelectedGender}
        selectedGender={selectedGender}
        setBirthDate={setBirthDate}
        birthDate={birthDate}
        draft={draft}
      />

      {/* Tell students about yourself */}
      <AboutYourself>
        <AboutYourselfMasteredLanguages
          setMasteredLanguages={setMasteredLanguages}
          masteredLanguages={masteredLanguages}
        />
      </AboutYourself>
    </div>
  );
};

export default TabProfile;
