import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import { tabAvailabilitySchema } from "@/src/validations";
import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef, useState } from "react";

const TabAvailability = ({
  setSelectedSlots,
  selectedSlots,
  setActiveTab,
  activeTab,
  draft,
}) => {
  const {
    handleSubmit,
    formState: { errors: frontEndErrors },
    control,
    watch,
    register,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabAvailabilitySchema),
    defaultValues: {
      timeZone: draft?.timeZone,
      dailyWorkTime: draft?.dailyWorkTime,
      workSchedule: draft?.workSchedule,
    },
  });
  const [backEndErrors, setBackEndErrors] = useState("");
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

        const validationResult =
          tabAvailabilitySchema.safeParse(actualDraftInfo);

        if (!validationResult.success) return;

        const response = await axios.post(
          `/teacher/set/availability`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "AVAILABILITY");
      }
    } catch (err) {
      setBackEndErrors(err?.response?.data?.message);
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
      <WorkTimePreferences
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        register={register}
        control={control}
        watch={watch}
      />

      <WorkSchedule
        setSelectedSlots={setSelectedSlots}
        selectedSlots={selectedSlots}
      />

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
