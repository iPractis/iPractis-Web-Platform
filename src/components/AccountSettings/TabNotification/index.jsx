"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import BrowserNotifications from "./BrowserNotifications";
import AudioNotification from "./AudioNotification";
import Notifications from "./Notifications";

import { notificationTypes } from "@/src/data/dataAccountSettings";

export const generateDefaultNotificationValues = () => {
  const defaults = {
    receiveiPractisNotifications: false,
    playSoundOnReceivedNotification: true,
    playSoundOnReceivedMessage: true,
    notifications: {},
  };

  notificationTypes.forEach((type) => {
    type.items.forEach((item) => {
      const key = item.replace(/\s+/g, "");
      defaults.notifications[`${key}_web`] = false;
      defaults.notifications[`${key}_mail`] = false;
    });
  });

  return defaults;
};

const TabNotification = ({ activeTab }) => {
  const defaultValues = generateDefaultNotificationValues();

  const {
    control,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  // ✅ Load saved preferences from Supabase / API
  useEffect(() => {
    async function loadPreferences() {
      try {
        const res = await fetch("/api/notifications/preferences");
        if (!res.ok) return;
        const data = await res.json();
        reset({ ...defaultValues, ...data }); // merge and reset cleanly
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
    loadPreferences();
  }, [reset]);

  const onSubmit = async (data) => {
    console.log("Saving preferences:", data);

    await fetch("/api/notifications/preferences/save-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset(data); // reset to the newly saved state
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 3 && "hidden"} space-y-16 mb-24`}
    >
      <BrowserNotifications control={control} />
      <Notifications control={control} />
      <AudioNotification control={control} />

      {isDirty && (
        <div className="flex justify-end pt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-color-P1 text-white px-6 py-2 rounded-xl transition hover:opacity-90"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      )}
    </form>
  );
};

export default TabNotification;