import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";

const TabProfile = ({
  setSelectedNationality,
  setMasteredLanguages,
  selectedNationality,
  setSelectedCountry,
  setSelectedGender,
  masteredLanguages,
  selectedCountry,
  selectedGender,
  setBirthDate,
  setIntroText,
  introText,
  birthDate,
  activeTab,
  errors,
  draft,
}) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      {/* Profile Picture */}
      <ProfilePicture errors={errors} draft={draft} />

      {/* Personal Informations */}
      <PersonalInfo
        setSelectedNationality={setSelectedNationality}
        selectedNationality={selectedNationality}
        setSelectedCountry={setSelectedCountry}
        setSelectedGender={setSelectedGender}
        selectedCountry={selectedCountry}
        selectedGender={selectedGender}
        setBirthDate={setBirthDate}
        setIntroText={setIntroText}
        introText={introText}
        birthDate={birthDate}
        errors={errors}
        draft={draft}
      />

      {/* Tell students about yourself */}
      <AboutYourself>
        <AboutYourselfMasteredLanguages
          setMasteredLanguages={setMasteredLanguages}
          masteredLanguages={masteredLanguages}
          errors={errors}
        />
      </AboutYourself>
    </div>
  );
};

export default TabProfile;
