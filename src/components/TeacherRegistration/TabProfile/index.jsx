import SectionHeader from "../../Globals/SectionHeader";
import ProfilePicture from "./ProfilePicture";
import IDVerification from "./IDVerification";
import PersonalInfo from "./PersonalInfo";
import { UserIcon } from "../../Icons";
import AboutYourself from "./AboutYourself";

const TabProfile = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      <SectionHeader
        descriptionText="Provide your personal details and complete your profile to start your application process."
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={"p-4 mb-[50px]"}
        titleText="Profile Section"
        titleClassName="MT-SB-1"
      />

      <div className="space-y-4">
        {/* Profile Picture */}
        <ProfilePicture />

        {/* Personal Informations */}
        <PersonalInfo />

        {/* Tell students about yourself */}
        <AboutYourself />

        {/* ID Verification */}
        <IDVerification />
      </div>
    </div>
  );
};

export default TabProfile;
