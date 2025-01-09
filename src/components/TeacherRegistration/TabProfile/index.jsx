// import IDVerification from "./IDVerification";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";

const TabProfile = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      {/* Profile Picture */}
      <ProfilePicture />

      {/* Personal Informations */}
      <PersonalInfo />

      {/* Tell students about yourself */}
      <AboutYourself />

      {/* ID Verification */}
      {/* <IDVerification /> */}
    </div>
  );
};

export default TabProfile;
