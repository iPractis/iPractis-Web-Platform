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

const TabAvailability = ({ setActiveTab, activeTab, draft }) => {
  const [dailyWorkTimeLimit, setDailyWorkTimeLimit] = useState([]);

  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabAvailabilitySchema),
    defaultValues: {
      dailyWorkTime: draft?.workSchedule?.length,
      workSchedule: draft?.workSchedule,
      timeZone: draft?.timeZone,
    },
  });
  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB AVAILABILITY
      if (activeTab === 3) {
        actualDraftInfo.dailyWorkTime = data?.dailyWorkTime;
        actualDraftInfo.workSchedule = data?.workSchedule;
        actualDraftInfo.timeZone = data?.timeZone;

        console.log(actualDraftInfo, "ACTUAL DRAFT");
        setActiveTab((prev) => prev + 1);
        console.log(response, "AVAILABILITY");
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
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
        dailyWorkTimeLimit={dailyWorkTimeLimit}
        control={control}
        errors={errors}
      />

      <WorkSchedule
        setDailyWorkTimeLimit={setDailyWorkTimeLimit}
        control={control}
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
