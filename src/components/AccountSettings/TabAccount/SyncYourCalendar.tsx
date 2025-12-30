import { useEffect, useState } from "react";
import SectionHeader from "../../Shared/SectionHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import SocialConnectButton from "../../Shared/SocialConnectButton";
import {
  GoogleLargeIcon,
  CalendarMediumIcon,
} from "../../Icons";

const SyncYourCalendar = () => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGoogleStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/google/status", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("[GoogleCalendar][Status] API error", {
            status: res.status,
            response: text,
          });
          throw new Error("Failed to fetch Google calendar status");
        }

        const data = await res.json();

        if (isMounted) {
          setGoogleConnected(Boolean(data?.connected));
        }
      } catch (err) {
        console.error("[GoogleCalendar][Status] Fetch error", {
          message: err?.message,
          stack: err?.stack,
        });

        if (isMounted) {
          setGoogleConnected(false);
          setError("Unable to check Google Calendar connection");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGoogleStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Calendar-only OAuth (NOT NextAuth login)
  const handleGoogleConnect = () => {
    try {
      window.location.href = "/api/google/connect";
    } catch (err) {
      console.error("[GoogleCalendar][Connect] redirect failed", err);
    }
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
          label={
            loading
              ? "Checking Google status..."
              : googleConnected
              ? "Connected to Google"
              : "Connect Google Calendar"
          }
          isConnected={googleConnected}
          disabled={googleConnected || loading}
          onClick={handleGoogleConnect}
        />

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </SectionContent>
    </SectionWrapper>
  );
};

export default SyncYourCalendar;
