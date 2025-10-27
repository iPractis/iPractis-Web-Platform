import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import StudentPreference from "./StudentPreferences";
import { tabSubjectSchema } from "@/src/validations";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";
import PresentYourSelf from "./PresentYourSelf";
import AveragePrice from "./AveragePrice";
import StudentAge from "./StudentAge";
import GenderRestriction from "./GenderRestriction";
import SaveAndContinueBox from "./SaveAndContinueBox";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React imports
import { useState, useRef } from "react";
import { useAuth } from "@/src/hooks/useAuth";

const TabSubject = ({ setActiveTab, activeTab, draft, setDraft }) => {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  const {
    formState: { errors, isSubmitted },
    handleSubmit,
    setError,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabSubjectSchema),
    defaultValues: {
      subjectIntroduction: draft?.subjectIntroduction || "",
      profileTitle: draft?.profileTitle || "",
      teachToAmateurPersons: draft?.teachToAmateurPersons || false,
      teachToYoungPersons: draft?.teachToYoungPersons || false,
      teachToSameGender: draft?.teachToSameGender || false,
      hourlyPrice: draft?.hourlyPrice ?? "",
      studentLevel: draft?.studentLevel || [],
      subject: draft?.subject || "",
      videoLink: draft?.videoLink || "",
      subSubject: draft?.subSubject || [],
    },
  });

  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      buttonRef.current?.loading();

      const payload = {
        userId: user?.userId,
        subjectIntroduction: data.subjectIntroduction,
        profileTitle: data.profileTitle,
        teachToAmateurPersons: data.teachToAmateurPersons,
        teachToYoungPersons: data.teachToYoungPersons,
        teachToSameGender: data.teachToSameGender,
        hourlyPrice: data.hourlyPrice,
        studentLevel: data.studentLevel,
        subject: data.subject,
        videoLink: data.videoLink,
        subSubject: data.subSubject,
      };

      console.log("SUBJECT PAYLOAD TO DRAFT API:", payload);

      // 🔥 Save/merge into teacher_draft
      const res = await fetch("/api/teacher-draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save subject tab");
      }

      const { draft: updatedDraft } = await res.json();

      if (setDraft) setDraft(updatedDraft);
      
      // Reset button state BEFORE navigation
      buttonRef.current?.notIsLoading();
      setLoading(false);

      setActiveTab((prev) => prev + 1);
    } catch (err) {
      console.error("Save error:", err);
      setError("general", { message: err.message });
      buttonRef.current?.notIsLoading();
      setLoading(false);
    }
  };

  const onError = (errors) => {
    console.log("FORM VALIDATION ERRORS:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={`${activeTab !== 1 && "hidden"}`}
    >
      <WhiteSpaceWrapper className="p-0">
        <SubjectsToTeach control={control} errors={errors} />
        <RelatedSubTopics control={control} errors={errors} />
        <PresentYourSelf control={control} errors={errors} />
        <StudentPreference control={control} errors={errors} />
        <StudentAge isSubmitted={isSubmitted} control={control} />

        <GenderRestriction isSubmitted={isSubmitted} control={control} />

        <AveragePrice control={control} errors={errors} watch={watch} />
        <SaveAndContinueBox buttonRef={buttonRef} />
      </WhiteSpaceWrapper>

    
    </form>
  );
};

export default TabSubject;
