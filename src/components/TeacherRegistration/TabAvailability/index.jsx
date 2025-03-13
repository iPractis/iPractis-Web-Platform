import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import { tabAvailabilitySchema } from "@/src/validations";
import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef } from "react";

const TabAvailability = ({ setActiveTab, activeTab, draft }) => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabAvailabilitySchema),
    defaultValues: {
      timeZone: draft?.timeZone,
      dailyWorkTime: draft?.dailyWorkTime,
      workSchedule: draft?.workSchedule,
    },
  });
  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB AVAILABILITY
      if (activeTab === 3) {
        actualDraftInfo.timeZone = data?.timeZone;
        actualDraftInfo.dailyWorkTime = selectedSlots?.length;
        actualDraftInfo.workSchedule = selectedSlots;

        const response = await axios.put(
          `/teacher/set/availability`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "AVAILABILITY");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 3 && "hidden"}`}
    >
      <WorkTimePreferences control={control} errors={errors} />

      <WorkSchedule control={control} />

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        buttonRef={buttonRef}
      />
    </form>
  );
};

export default TabAvailability;
