import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";

const TabProfile = ({
  setMasteredLanguages,
  setSelectedCountry,
  setSelectedGender,
  masteredLanguages,
  setLanguageLevel,
  selectedCountry,
  selectedGender,
  languageLevel,
  setBirthDate,
  setIntroText,
  introText,
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
        setSelectedCountry={setSelectedCountry}
        setSelectedGender={setSelectedGender}
        selectedCountry={selectedCountry}
        selectedGender={selectedGender}
        setBirthDate={setBirthDate}
        setIntroText={setIntroText}
        introText={introText}
        birthDate={birthDate}
        draft={draft}
      />

      {/* Tell students about yourself */}
      <AboutYourself>
        <AboutYourselfMasteredLanguages
          setMasteredLanguages={setMasteredLanguages}
          masteredLanguages={masteredLanguages}
          setLanguageLevel={setLanguageLevel}
          languageLevel={languageLevel}
        />
      </AboutYourself>
    </div>
  );
};

export default TabProfile;
