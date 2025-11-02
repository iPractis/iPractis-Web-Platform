"use client";

import { tabAvailabilitySchema } from "@/src/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import WorkTimePreferences from "../../TeacherRegistration/TabAvailability/WorkTimePreferences";
import SaveAndContinueBox from "../../TeacherRegistration/TabSubject/SaveAndContinueBox";
import axios from "axios";
import WorkScheduleTable from "../../Shared/WorkScheduleTable";
import WorkSchedule from "../../TeacherRegistration/TabAvailability/WorkSchedule";

const TabAvailability = ({ setActiveTab, activeTab }) => {
  const [dailyWorkTimeLimit, setDailyWorkTimeLimit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  const buttonRef = useRef(null);

  const { user } = useAuth();

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
      dailyWorkTime: 0,
      workSchedule: [],
      timeZone: "America/Chicago",
    },
  });

  // ✅ Fetch teacher data from API
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!user?.teacherId) return;

      try {
        setLoading(true);
        const res = await axios.get(`/api/teachers/${user.teacherId}`);
        console.log(res.data)
        const teacher = res.data;
        const availability = teacher.availability || {};

        // 🧩 Convert API format into full week format
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const mappedSchedule = availability

        setTeacherData(teacher);
        console.log("Mapped Schedule:", mappedSchedule);
        reset({
          dailyWorkTime: teacher.daily_work_time || 0,
          workSchedule: mappedSchedule,
          timeZone: teacher.timezone || "America/Chicago",
        });
      } catch (err) {
        console.error("Error fetching teacher data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      buttonRef.current?.loading();

      if (activeTab === 3) {
        const availabilityForDb = data?.workSchedule;

        const payload = {
          userId: user?.userId,
          dailyWorkTime: data?.dailyWorkTime,
          availability: availabilityForDb,
          timeZone: data?.timeZone,
        };

        console.log("Saving teacher availability payload:", payload);

        const res = await fetch("/api/teacher-draft", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to save availability");
        }

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

  if (activeTab !== 5) return null;

  console.log("set",setDailyWorkTimeLimit)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <WorkScheduleTable
            setDailyWorkTimeLimit={setDailyWorkTimeLimit}
            control={control}
            defaultTimeZone={teacherData?.timezone || "America/Chicago"}
          />

          <SaveAndContinueBox buttonRef={buttonRef} />
       
    </form>
  );
};

export default TabAvailability;
