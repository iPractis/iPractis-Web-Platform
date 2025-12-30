"use client";

import SyncYourCalendar from "./SyncYourCalendar";
import ActivityLog from "./ActivityLog";
import Preferences from "./Preferences";
import DeleteAccount from "./DeleteAccount";
import { Button, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// 1. Import React-Toastify and its CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          reset(result.preferences);
        }
      } catch (err) {
        console.error("Error fetching preferences:", err);
      } finally {
        setIsLoadingPrefs(false);
      }
    };

    if (activeTab === 1) {
      fetchPreferences();
    }
  }, [activeTab, reset]);

  // ✅ 2. Handle Save with React-Toastify
  const handleSave = async () => {
    // Start the loading toast and capture its ID
    const toastId = toast.loading("Saving changes...");
    setIsSaving(true);

    try {
      const formData = getValues();

      const res = await fetch("/api/account-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ Success: Update the existing toast
        toast.update(toastId, {
          render: "Settings saved successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });

        // Reset form baseline to new values (clears isDirty)
        reset(formData);
      } else {
        // ❌ API Error: Update toast to error
        toast.update(toastId, {
          render: result.error || "Failed to save settings.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      // ❌ Catch Error
      toast.update(toastId, {
        render: "Something went wrong while saving.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={`${activeTab !== 1 && "hidden"} space-y-[64px]`}>
      
      {/* 3. Add ToastContainer (Required for toasts to show) */}
      <ToastContainer position="top-right" theme="light" />

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