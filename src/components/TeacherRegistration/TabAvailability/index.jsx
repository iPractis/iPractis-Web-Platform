import SaveAndContinueBox from "../TabSubject/SaveAndContinueBox";
import { tabAvailabilitySchema } from "@/src/validations";
import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { mapDbAvailability } from "@/src/utils/mapDbAvailability";
import { useAuth } from "@/src/hooks/useAuth";

const TabAvailability = ({ setActiveTab, activeTab, draft, setDraft }) => {
  const [dailyWorkTimeLimit, setDailyWorkTimeLimit] = useState([]);

  // Transform DB draft data into UI format
  const mappedSchedule = draft?.availability || [];

  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabAvailabilitySchema),
    defaultValues: {
      dailyWorkTime: draft?.dailyWorkTime || mappedSchedule.length || 0,
      workSchedule: mappedSchedule,
      timeZone: draft?.timeZone || "America/Chicago",
    },
  });

  // ✅ Re-apply draft data if it changes (like after save)
  useEffect(() => {
    if (draft) {
      reset({
        dailyWorkTime: draft?.dailyWorkTime || mappedSchedule.length || 0,
        workSchedule: draft?.availability ,
        timeZone: draft?.timeZone || "America/Chicago",
      });
    }
  }, [draft, reset]);

  const buttonRef = useRef(null);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      buttonRef.current?.loading();

      if (activeTab === 3) {
        // Convert UI format to DB-ready format
        const availabilityForDb = data?.workSchedule;

        const payload = {
          userId: user?.userId,
          dailyWorkTime: data?.dailyWorkTime,
          availability: availabilityForDb, // DB-ready format
          timeZone: data?.timeZone,
        };

        console.log("AVAILABILITY PAYLOAD TO DRAFT API:", payload);

        // 🔥 Save/merge into teacher_drafts
        const res = await fetch("/api/teacher-draft", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to save availability");
        }

        const { draft: updatedDraft } = await res.json();

        // ✅ update parent draft state
        if (setDraft) setDraft(updatedDraft);

        // ✅ move to next tab
        setActiveTab((prev) => prev + 1);
      }
    } catch (err) {
      setError("general", {
        message: err.message || "Something went wrong",
      });
    } finally {
      buttonRef.current?.notIsLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 3 && "hidden"}`}
    >
      <WorkTimePreferences
        dailyWorkTimeLimit={dailyWorkTimeLimit}
        control={control}
        errors={errors}
      />

      <WorkSchedule
        setDailyWorkTimeLimit={setDailyWorkTimeLimit}
        control={control}
        defaultTimeZone={draft?.timeZone}
      />

      {/* Save and Continue Box */}
      <SaveAndContinueBox buttonRef={buttonRef} />
    </form>
  );
};

export default TabAvailability;
