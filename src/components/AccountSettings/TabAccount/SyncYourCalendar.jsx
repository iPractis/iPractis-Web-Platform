import SocialConnectButton from "./SocialConnectButton";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import {
  AppleMediumIcon,
  CalendarIcon,
  GoogleMediumIcon,
  MicrosoftMediumIcon,
} from "../../Icons";

const SyncYourCalendar = () => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={
          "Connect your external calendar to keep your schedule up-to-date."
        }
        titleIcon={<CalendarIcon fillColor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px]"}
        titleText={"Sync your calendar"}
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[50px] gap-y-4 lg:px-8">
        <SocialConnectButton
          IconComponent={GoogleMediumIcon}
          label={"Join with Google"}
          isConnected={true}
        />

        <SocialConnectButton
          IconComponent={MicrosoftMediumIcon}
          label={"Join with Microsoft"}
          isConnected={false}
        />

        <SocialConnectButton
          IconComponent={AppleMediumIcon}
          label={"Join with Apple"}
          isConnected={false}
        />
      </div>
    </div>
  );
};

export default SyncYourCalendar;
