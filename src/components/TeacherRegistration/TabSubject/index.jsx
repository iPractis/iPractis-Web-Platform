import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import StudentPreference from "./StudentPreferences";
import { tabSubjectSchema } from "@/src/validations";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";
import PresentYourSelf from "./PresentYourSelf";
import AveragePrice from "./AveragePrice";
import StudentAge from "./StudentAge";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef } from "react";

const TabSubject = ({ setActiveTab, activeTab, draft }) => {
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
      subjectIntroduction: draft?.subjectIntroduction,
      profileTitle: draft?.profileTitle,
      teachToAmateurPersons: draft?.teachToAmateurPersons,
      teachToYoungPersons: draft?.teachToYoungPersons,
      hourlyPrice: draft?.hourlyPrice,
      studentLevel: draft?.studentLevel,
      subject: draft?.subject,
      videoLink: draft?.videoLink,
      subSubject: draft?.subSubject,
    },
  });
  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB SUBJECT
      if (activeTab === 1) {
        actualDraftInfo.teachToAmateurPersons = data?.teachToAmateurPersons;
        actualDraftInfo.subjectIntroduction = data?.subjectIntroduction;
        actualDraftInfo.teachToYoungPersons = data?.teachToYoungPersons;
        actualDraftInfo.emailWithdrawal = data?.emailWithdrawal;
        actualDraftInfo.profileTitle = data?.profileTitle;
        actualDraftInfo.studentLevel = data?.studentLevel;
        actualDraftInfo.hourlyPrice = data?.hourlyPrice;
        actualDraftInfo.subSubject = data?.subSubject;
        actualDraftInfo.withdrawal = data?.withdrawal;
        actualDraftInfo.videoLink = data?.videoLink;
        actualDraftInfo.subject = data?.subject;

        const validationResult = tabSubjectSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) return;

        const response = await axios.put(
          `/teacher/set/subject`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "SUBJECT");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 1 && "hidden"}`}
    >
      <WhiteSpaceWrapper className={"p-0"}>
        <SubjectsToTeach control={control} errors={errors} />

        <RelatedSubTopics control={control} errors={errors} />

        <PresentYourSelf control={control} errors={errors} />

        <StudentPreference control={control} errors={errors} />

        <StudentAge
          isSubmitted={isSubmitted}
          control={control}
          errors={errors}
        />

        <AveragePrice control={control} errors={errors} watch={watch} />
      </WhiteSpaceWrapper>

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        buttonRef={buttonRef}
      />
    </form>
  );
};

export default TabSubject;
