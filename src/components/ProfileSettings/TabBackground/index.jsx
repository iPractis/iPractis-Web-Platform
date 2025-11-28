import { tabBackgroundSchema } from "@/src/validations";
import Experience from "../../TeacherRegistration/TabBackground/Experience";
import Education from "../../TeacherRegistration/TabBackground/Education";
import SaveAndContinueBox from "../TabProfile/SaveAndContinueBox";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React imports
import { useRef, useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";

const TabBackground = ({ activeTab }) => {
  // Keep a local draft to track updated draft from API
  // No local draft state needed; form is reset with fetched draft values
  const buttonRef = useRef(null);
  const { user } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabBackgroundSchema),
    defaultValues: {
      careerExperience: [],
      education: [],
    },
  });

  // Fetch draft if user is a teacher or has a draft
  useEffect(() => {
    const fetchDraft = async () => {
      if (!user?.userId) return;

      try {
        const res = await fetch(`/api/teacher-draft/${user.userId}`);
        if (!res.ok) return;
        const { draft: fetchedDraft } = await res.json();
        // Reset form with existing draft values (if any)
        reset({
          careerExperience: fetchedDraft?.careerExperience || [],
          education: fetchedDraft?.education || [],
        });
      } catch (err) {
        console.warn("Failed to fetch draft for profile tab background:", err);
      }
    };

    fetchDraft();
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      buttonRef.current?.loading();

      const payload = {
        userId: user?.userId,
        careerExperience: data.careerExperience,
        education: data.education,
      };

      // Save / merge into teacher_drafts
      const res = await fetch("/api/teacher-draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save background");
      }

      await res.json();
      buttonRef.current?.notIsLoading();
    } catch (err) {
      setError("general", { message: err.message });
      buttonRef.current?.notIsLoading();
    }
  };

  return (
    <form
      className={`${activeTab !== 3 && "hidden"} space-y-16`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Education Section */}
      <Education errors={errors} control={control} />

      {/* Experience Section */}
      <Experience errors={errors} control={control} />

      {/* Save and Continue Box (Profile Settings style) */}
      <SaveAndContinueBox buttonRef={buttonRef} buttonText={"Save changes"} />
    </form>
  );
};

export default TabBackground;
