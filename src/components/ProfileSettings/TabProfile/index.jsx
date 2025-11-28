"use client";

import ProfilePicture from "./ProfilePicture";
import PersonalInfo from "./PersonalInfo";
import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import ProfileDisplaySettings from "./ProfileDisplaySettings";
import SaveAndContinueBox from "./SaveAndContinueBox";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React imports
import { useRef } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { tabProfileSchema } from "@/src/validations/profileSettings";

const TabProfile = ({ activeTab }) => {
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
      firstName: "",
      middleName: "",
      lastName: "",
      profile_url: "",
      introduction: "",
      languages: [],
      nationality: "United Kingdom",
      country: "United Kingdom",
      birthDate: "",
      gender: "",
      showProfilePublicly: true,
      showAchievements: true,
    },
  });

  const buttonRef = useRef(null);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      buttonRef.current?.loading();

      // Payload for profile settings update
      const payload = {
        userId: user?.userId,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        profile_url: data.profile_url,
        introduction: data.introduction,
        languages: data.languages,
        nationality: data.nationality,
        country: data.country,
        birthDate: data.birthDate,
        gender: data.gender,
        showProfilePublicly: data.showProfilePublicly,
        showAchievements: data.showAchievements,
      };

      console.log("PROFILE SETTINGS PAYLOAD:", payload);

      // TODO: Implement actual API call for profile settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      buttonRef.current?.notIsLoading();
    } catch (err) {
      console.error("Save error:", err);
      setError("general", { message: err.message });
      buttonRef.current?.notIsLoading();
    }
  };

  return (
    <form
      className={`${activeTab !== 2 && "hidden"} space-y-[64px]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile Picture */}
      <ProfilePicture
        errors={errors}
        control={control}
        setValue={setValue}
      />

      {/* Personal Information */}
      <PersonalInfo control={control} errors={errors} watch={watch} />

      {/* Language Proficiency Level */}
      <AboutYourselfMasteredLanguages errors={errors} control={control} />

      {/* Profile Display Settings */}
      <ProfileDisplaySettings control={control} />

      {/* Save Section */}
      <SaveAndContinueBox buttonRef={buttonRef} />
    </form>
  );
};

export default TabProfile;
