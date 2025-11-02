"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TabAvailability = ({ activeTab, teacherId }) => {
  const [loading, setLoading] = useState(false);

  // Default structure like: { Mon: [], Tue: [], ... }
  const defaultAvailability = DAYS.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      availability: defaultAvailability,
    },
  });

  const availability = watch("availability");

  // ✅ Load teacher availability from API
  useEffect(() => {
    async function fetchAvailability() {
      if (!teacherId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/teacher/${teacherId}`);
        if (!res.ok) throw new Error("Failed to fetch teacher data");
        const data = await res.json();

        // The API returns { availability: { Mon: ["09:00","09:30"], ... } }
        reset({
          availability: data.availability || defaultAvailability,
        });
      } catch (err) {
        console.error("Error loading availability:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
  }, [teacherId, reset]);

  // ✅ Submit handler — save availability
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/teacher/${teacherId}/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.availability),
      });

      if (!res.ok) throw new Error("Failed to save availability");

      reset(data); // reset dirty state
    } catch (err) {
      console.error("Error saving availability:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 5 && "hidden"} space-y-8 mb-16`}
    >
      <h2 className="text-2xl font-semibold text-gray-800">Weekly Availability</h2>

      

      {isDirty && (
        <div className="flex justify-end pt-6">
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

export default TabAvailability;
