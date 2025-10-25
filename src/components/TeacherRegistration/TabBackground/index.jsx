import { tabBackgroundSchema } from "@/src/validations";
import Experience from "./Experience";
import Education from "./Education";
import SaveAndContinueBox from "../TabSubject/SaveAndContinueBox";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React imports
import { useRef, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";

const TabBackground = ({ setActiveTab, activeTab, draft, setDraft }) => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabBackgroundSchema),
    defaultValues: {
      careerExperience: draft?.careerExperience || [],
      education: draft?.education || [],
    },
  });

  const buttonRef = useRef(null);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      buttonRef.current?.loading();

      const payload = {
        userId: user?.userId,
        careerExperience: data.careerExperience,
        education: data.education,
      };

      console.log("BACKGROUND PAYLOAD TO DRAFT API:", payload);

      // 🔥 Save/merge into teacher_drafts
      const res = await fetch("/api/teacher-draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save background tab");
      }

      const { draft: updatedDraft } = await res.json();

      // ✅ update parent draft state
      if (setDraft) setDraft(updatedDraft);

      // ✅ move to next tab
      setActiveTab((prev) => prev + 1);
    } catch (err) {
      setError("general", { message: err.message });
    } finally {
      setLoading(false);
      buttonRef.current?.notIsLoading();
    }
  };

  return (
    <form
      className={`${activeTab !== 2 && "hidden"} space-y-16`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Experience Section */}
      <Experience errors={errors} control={control} />

      {/* Education Section */}
      <Education errors={errors} control={control} />

      {/* Save and Continue Box */}
      <SaveAndContinueBox buttonRef={buttonRef} />
    </form>
  );
};

export default TabBackground;
