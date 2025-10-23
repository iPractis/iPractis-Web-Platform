"use client";

import SyncYourCalendar from "./SyncYourCalendar";
import ActivityLog from "./ActivityLog";
import Preferences from "./Preferences";
import DeleteAccount from "./DeleteAccount";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

  // ✅ Handle Save
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const formData = getValues();

      console.log("Saving account settings:", formData);

      const res = await fetch("/api/account-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("✅ API Response:", result);

      if (res.ok) {
        alert("Settings saved successfully!");
        // ✅ reset the form baseline to new values (clears isDirty)
        reset(formData);
      } else {
        alert(result.error || "Failed to save settings.");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={`${activeTab !== 1 && "hidden"} space-y-16 mb-24`}>
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

      <SyncYourCalendar />
      <ActivityLog />
      <DeleteAccount />
    </form>
  );
};

export default TabAccount;
