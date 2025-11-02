import { signIn, useSession } from "next-auth/react";
import SectionHeader from "../../Shared/SectionHeader";
import { CalendarIcon } from "lucide-react";
import SocialConnectButton from "./SocialConnectButton";
import { GoogleMediumIcon } from "../../Icons";

const SyncYourCalendar = () => {
  const { data: session } = useSession();

  const handleGoogleConnect = () => {
    signIn("google", {
      callbackUrl: "/dashboard?connected=google",
    });
  };

  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText="Connect your external calendar to keep your schedule up-to-date."
        titleIcon={<CalendarIcon fillcolor="fill-primary-color-P1" />}
        titleText="Sync your calendar"
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[50px] gap-y-4 lg:px-8">
        <SocialConnectButton
          IconComponent={GoogleMediumIcon}
          label={session?.accessToken ? "Connected to Google" : "Join with Google"}
          isConnected={!!session?.accessToken}
          disabled={session?.accessToken}
          onClick={handleGoogleConnect}
        />
      </div>
    </div>
  );
};

export default SyncYourCalendar