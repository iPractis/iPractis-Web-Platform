import SocialConnectButton from "../../Shared/SocialConnectButton";
// Icons
import {
  MicrosoftMediumIcon,
  GoogleMediumIcon,
  AppleMediumIcon,
} from "../../Icons";

const ConnectYourAccount = () => {
  return (
    <div className="space-y-[16px]">
      <div className="grid grid-cols-1 gap-y-[16px]">
        <SocialConnectButton
          IconComponent={GoogleMediumIcon}
          label={"Join with Google"}
          isConnected={true}
          disabled={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ConnectYourAccount;
