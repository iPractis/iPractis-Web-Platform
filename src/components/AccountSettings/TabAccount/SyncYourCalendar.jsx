import { signIn, useSession } from "next-auth/react";
import SectionHeader from "../../Shared/SectionHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import SocialConnectButton from "../../Shared/SocialConnectButton";
import { GoogleLargeIcon, CalendarIcon, MicrosoftMediumIcon, AppleMediumIcon, CalendarMediumIcon } from "../../Icons";

const SyncYourCalendar = () => {
  const { data: session } = useSession();

  const handleGoogleConnect = () => {
    signIn("google", {
      callbackUrl: "/dashboard?connected=google",
    });
  };

  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<CalendarMediumIcon fillcolor="fill-primary-color-P1" />}
        titleText="External Calendar"
        descriptionText="Connect your external calendar to keep your schedule up-to-date."
      />

      <SectionContent>
        <SocialConnectButton
          IconComponent={GoogleLargeIcon}
          label={session?.accessToken ? "Connected to Google" : "Join with Google"}
          isConnected={!!session?.accessToken}
          disabled={session?.accessToken}
          onClick={handleGoogleConnect}
        />
        <SocialConnectButton
          IconComponent={MicrosoftMediumIcon}
          label={"Join with Microsoft"}
          isConnected={false}
          disabled={false}
          onClick={() => {}}
        />
        <SocialConnectButton
          IconComponent={AppleMediumIcon}
          label={"Join with Apple"}
          isConnected={false}
          disabled={false}
          onClick={() => {}}
        />
      </SectionContent>
    </SectionWrapper>
  );
};

export default SyncYourCalendar