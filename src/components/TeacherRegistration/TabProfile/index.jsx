import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import { tabProfileSchema } from "@/src/validations/index";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";
import ButtonSubmitForm from "../../Shared/ButtonSubmitForm";
import SectionHeader from "../../Shared/SectionHeader";
import { ChevronDownBigIcon, CircleImportantIcon } from "../../Icons";

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

      // Move to next tab
      setActiveTab((prev) => prev + 1);
    } catch (err) {
      console.error("Save error:", err);
      setError("general", { message: err.message });
    } finally {
      setLoading(false);
    }
  };

  console.log("DRAFT IN PROFILE TAB:", draft);

  return (
    <form
      className={`${activeTab !== 0 && "hidden"}`}
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
      <AboutYourself>
        <AboutYourselfMasteredLanguages errors={errors} control={control} />
      </AboutYourself>

      {/* Save and Continue Section Header */}
      <div className="mt-16">
        <SectionHeader
          descriptionText="These information will be subject to review"
          wrapperSectionHeaderClassName="relative bg-[#FFF4B8] p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between"
          titleIcon={
            <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
              <CircleImportantIcon />
            </div>
          }
          titleText="Attention required"
          titleClassName="MT-SB-1 ml-[80px]"
          descriptionClassName="ml-[80px]"
        >
          <div className="absolute top-[32px] bottom-[32px] right-[32px] w-[190px] h-[48px] bg-white rounded-[16px] p-[6px] flex items-center justify-between gap-[2px]">
            <ButtonSubmitForm
              buttonClassName="text-primary-color-P1 ST-3 ml-[8px] bg-transparent border-0 p-0 cursor-pointer flex items-center whitespace-nowrap"
              ref={buttonRef}
            >
              Save, and continue
            </ButtonSubmitForm>
            <div className="mr-[6px] w-[36px] h-[36px] bg-[#F8F7F5] rounded-[10px] flex items-center justify-center gap-[10px] p-[8px]">
              <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
            </div>
          </div>
        </SectionHeader>
      </div>
    </form>
  );
};

export default TabProfile;
