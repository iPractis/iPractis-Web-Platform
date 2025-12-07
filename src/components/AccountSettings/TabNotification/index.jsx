"use client";

import { useForm } from "react-hook-form";

// Components
import BrowserNotifications from "./BrowserNotifications";
import Notifications from "./Notifications";
import AudioNotification from "./AudioNotification";
import SectionWrapper from "../../Shared/SectionWrapper";

const TabNotification = ({ activeTab }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      // Browser notifications
      receiveiPractisNotifications: false,
      
      // Audio notifications
      playSoundOnReceivedNotification: true,
      playSoundOnReceivedMessage: true,
      
      // Notification preferences (will be populated dynamically)
      notifications: {},
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Notification settings:", data);
      // API call to save notification settings
    } catch (err) {
      console.error("Error saving notification settings:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 3 && "hidden"} space-y-[64px]`}
    >
      <SectionWrapper>
        <BrowserNotifications control={control} />
      </SectionWrapper>

      <SectionWrapper>
        <Notifications control={control} />
      </SectionWrapper>

      <SectionWrapper>
        <AudioNotification control={control} />
      </SectionWrapper>
    </form>
  );
};

export default TabNotification;
