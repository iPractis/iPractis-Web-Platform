import { tabBackgroundSchema } from "@/src/validations";
import Experience from "./Experience";
import Education from "./Education";
import SaveAndContinueBox from "../TabSubject/SaveAndContinueBox";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef } from "react";

const TabBackground = ({ setActiveTab, activeTab, draft }) => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabBackgroundSchema),
    defaultValues: {
      careerExperience: draft?.careerExperience,
      education: draft?.education,
    },
  });
  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB BACKGROUND
      if (activeTab === 2) {
        actualDraftInfo.careerExperience = data?.careerExperience;
        actualDraftInfo.education = data?.education;

        console.log(actualDraftInfo, "ACTUAL DRAFT");

        setActiveTab((prev) => prev + 1);
        console.log(response, "BACKGROUND");
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
