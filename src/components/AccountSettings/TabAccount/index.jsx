"use client";

import SyncYourCalendar from "./SyncYourCalendar";
import ActivityLog from "./ActivityLog";
import Preferences from "./Preferences";
import DeleteAccount from "./DeleteAccount";
import { Button, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

const TabAccount = ({ activeTab }) => {
  const {
    formState: { errors, isDirty },
    control,
    watch,
    getValues,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      language: "0",
      timeZone: "Etc/GMT+12",
      currency: "",
      timeFormat: "12h",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingPrefs, setIsLoadingPrefs] = useState(true);

  // ✅ 1. Fetch Saved Preferences on Load
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch("/api/account-update");
        const result = await res.json();

        if (res.ok && result.preferences) {
          // Reset form with fetched data (clears isDirty until user types)
          reset(result.preferences);
        }
      } catch (err) {
        console.error("Error fetching preferences:", err);
        // Optional: toast.error("Could not load saved settings.");
      } finally {
        setIsLoadingPrefs(false);
      }
    };

    // Only fetch if this tab is active (optimization)
    if (activeTab === 1) {
      fetchPreferences();
    }
  }, [activeTab, reset]);

  // ✅ 2. Handle Save
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const toastId = toast.loading("Saving changes...");

      const formData = getValues();

      const res = await fetch("/api/account-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Settings saved successfully!", {
          id: toastId,
        });

        // Reset form baseline to new values (clears isDirty)
        reset(formData);
      } else {
        toast.error(result.error || "Failed to save settings.", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      toast.error("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={`${activeTab !== 1 && "hidden"} space-y-[64px]`}>
      <Toaster position="top-right" richColors />

      {/* Show Spinner while fetching initial data, or show form */}
      {isLoadingPrefs ? (
        <div className="flex justify-center py-10">
          <Spinner label="Loading settings..." color="primary" />
        </div>
      ) : (
        <>
          {/* Preferences Section */}
          <Preferences watch={watch} control={control} errors={errors} />

          {/* ✅ Show Save Button only if form is dirty */}
          {isDirty && (
            <div className="flex justify-end px-8">
              <Button
                color="primary"
                size="lg"
                className="rounded-xl bg-primary-color-P1 text-white"
                onPress={handleSave}
                isLoading={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </>
      )}

      <SyncYourCalendar />
      <ActivityLog />
      <DeleteAccount />
    </form>
  );
};

export default TabAccount;