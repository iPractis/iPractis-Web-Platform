import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import { tabProfileSchema } from "@/src/validations/index";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";
import SaveAndContinueBox from "../TabSubject/SaveAndContinueBox";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React imports
import { useState, useRef } from "react";
import { useAuth } from "@/src/hooks/useAuth";

const TabProfile = ({ setActiveTab, activeTab, draft, setDraft }) => {
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
      firstName: draft?.firstName || "",
      middleName: draft?.middleName || "",
      lastName: draft?.lastName || "",
      profile_url: draft?.profile_url || "",
      introduction: draft?.introduction || "",
      languages: draft?.languages || [],
      nationality: draft?.nationality || "United Kingdom",
      country: draft?.country || "United Kingdom",
      birthDate: draft?.birthDate || "",
      gender: draft?.gender || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      buttonRef.current?.loading();

      // Payload = only current form values + userId
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
      };

      console.log("PROFILE PAYLOAD TO DRAFT API:", payload);

      // 🔥 save/merge into teacher_draft
      const res = await fetch("/api/teacher-draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save draft");
      }

      const { draft: updatedDraft } = await res.json();

      // Keep draft state in parent up-to-date
      if (setDraft) setDraft(updatedDraft);
      
      // Reset button state BEFORE navigation
      buttonRef.current?.notIsLoading();
      setLoading(false);

      // Move to next tab
      setActiveTab((prev) => prev + 1);
    } catch (err) {
      console.error("Save error:", err);
      setError("general", { message: err.message });
      buttonRef.current?.notIsLoading();
      setLoading(false);
    }
  };

  console.log("DRAFT IN PROFILE TAB:", draft);

  return (
    <form
      className={`${activeTab !== 0 && "hidden"} space-y-[64px]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile Picture */}
      <ProfilePicture
        errors={errors}
        control={control}
        setValue={setValue}
        draftUrl={draft?.profile_url}
      />

      {/* Personal Informations */}
      <PersonalInfo control={control} errors={errors} watch={watch} />

      {/* Tell students about yourself */}
      <AboutYourselfMasteredLanguages errors={errors} control={control} />

      {/* Save and Continue Section */}
      <SaveAndContinueBox buttonRef={buttonRef} />
    </form>
  );
};

export default TabProfile;
