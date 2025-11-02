import SocialConnectButton from "./SocialConnectButton";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import {
  MicrosoftMediumIcon,
  SpinnerMediumIcon,
  GoogleMediumIcon,
  AppleMediumIcon,
} from "../../Icons";

const ConnectYourAccount = () => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={
          "Easily link your account using Google, Microsoft, or Apple for a seamless login experience."
        }
        titleIcon={<SpinnerMediumIcon fillcolor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px]"}
        titleText={"Connect your account"}
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

export default ConnectYourAccount;
