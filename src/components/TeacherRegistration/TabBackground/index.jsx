import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import { tabBackgroundSchema } from "@/src/validations";
import Experience from "./Experience";
import Education from "./Education";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// React imports
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

const TabBackground = ({ setActiveTab, activeTab, draft }) => {
  const { handleSubmit, formState: { errors: frontEndErrors }, control, watch, } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabBackgroundSchema),
    defaultValues: {
      careerExperience: draft?.experiences,
      education: draft?.education,
    },
  });
  const [backEndErrors, setBackEndErrors] = useState("");
  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB BACKGROUND
      if (activeTab === 2) {
        actualDraftInfo.careerExperience = data?.experiences;
        actualDraftInfo.education = data?.education;

        const validationResult = tabBackgroundSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) return;

        const response = await axios.post(
          `/teacher/set/background`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "BACKGROUND");
      }
    } catch (err) {
      setBackEndErrors(err?.response?.data?.message);
      console.log(err);
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
      <Experience
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        control={control}
      />

      {/* Education Section */}
      {/* <Education
        setEducations={setEducations}
        educations={educations}
        errors={errors}
      /> */}

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        buttonRef={buttonRef}
      />
    </form>
  );
};

export default TabBackground;
