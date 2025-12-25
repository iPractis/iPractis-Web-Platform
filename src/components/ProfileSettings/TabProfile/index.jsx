"use client";

import ProfilePicture from "./ProfilePicture";
import PersonalInfo from "./PersonalInfo";
import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import ProfileDisplaySettings from "./ProfileDisplaySettings";
import SaveAndContinueBox from "./SaveAndContinueBox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { tabProfileSchema } from "@/src/validations/profileSettings";

const TabProfile = ({ activeTab, userData, language }) => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabProfileSchema),
    defaultValues: {
      firstName: userData.first_name || "",
      middleName: userData.middle_name || "",
      lastName: userData.last_name || "",
      profile_url: userData.profile_image || "",
      introduction: userData.introduction || "",
      language: userData.language || [],
      nationality: userData.nationality || "",
      country: userData.country || "",
      birthDate: userData.birth_date || "2000-01-01",
      gender: userData.gender || "",
      showProfilePublicly: true,
      showAchievements: true,
    },
  });

  const buttonRef = useRef(null);
  const { user } = useAuth();

  /* ----------------------------------------
     SUBMIT HANDLER
  ---------------------------------------- */
  const onSubmit = async (data) => {
    try {
      buttonRef.current?.loading();

      // 🔐 Build SAFE payload (no userId from client)
      const payload = {
        user: {
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          profile_image: data.profile_url,
          nationality: data.nationality,
          country: data.country,
          language : data.language,
          birth_date: data.birthDate,
          gender: data.gender,
          introduction: data.introduction,
        },
      };

      // Add teacher fields only if teacher
      if (user?.role === "teacher") {
        payload.teacher = {
          introduction: data.introduction,
        };
      }
      console.log("Payload to submit:", payload);

      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Profile update failed");
      }

      buttonRef.current?.notIsLoading();
    } catch (err) {
      console.error("Save error:", err);
      setError("root", { message: err.message });
      buttonRef.current?.notIsLoading();
    }
  };

  return (
    <form
      className={`${activeTab !== 2 ? "hidden" : ""} space-y-[64px]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile Picture */}
      <ProfilePicture
        errors={errors}
        control={control}
        setValue={setValue}
      />

      {/* Personal Information */}
      <PersonalInfo
        control={control}
        errors={errors}
        watch={watch}
      />

      {/* Language Proficiency */}
      <AboutYourselfMasteredLanguages
        errors={errors}
        control={control}
      />

      {/* Profile Display Settings */}
      <ProfileDisplaySettings control={control} />

      {/* Save */}
      <SaveAndContinueBox buttonRef={buttonRef} />
    </form>
  );
};

export default TabProfile;
