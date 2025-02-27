import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import StudentPreference from "./StudentPreferences";
import { tabSubjectSchema } from "@/src/validations";
import RelatedSubTopics from "./RelatedSubTopics";
import SubjectsToTeach from "./SubjectsToTeach";
import PresentYourSelf from "./PresentYourSelf";
import AveragePrice from "./AveragePrice";
import Withdrawal from "./Withdrawal";
import StudentAge from "./StudentAge";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef, useState } from "react";

const TabSubject = ({
  setSelectedSubSubjects,
  selectedSubSubjects,
  setActiveTab,
  activeTab,
  draft,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors, isSubmitted },
    control,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabSubjectSchema),
    defaultValues: {
      subjectIntroduction: draft?.subjectIntroduction,
      emailWithdrawal: draft?.emailWithdrawal,
      profileTitle: draft?.profileTitle,
      teachToAmateurPersons: draft?.teachToAmateurPersons,
      teachToYoungPersons: draft?.teachToYoungPersons,
      hourlyPrice: draft?.hourlyPrice,
      studentLevel: draft?.studentLevel,
      subject: draft?.subject,
      videoLink: draft?.videoLink,
      withdrawal: draft?.withdrawal,
      subSubject: draft?.subSubject,
    },
  });
  const [backEndErrors, setBackEndErrors] = useState("");
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

        const response = await axios.post(
          `/teacher/set/subject`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "SUBJECT");
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
      onSubmit={handleSubmit(onSubmit)}
      className={`${activeTab !== 1 && "hidden"}`}
    >
      <WhiteSpaceWrapper className={"p-0"}>
        <SubjectsToTeach
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          setValue={setValue}
          register={register}
          control={control}
          watch={watch}
        />

        <RelatedSubTopics
          setSelectedSubSubjects={setSelectedSubSubjects}
          selectedSubSubjects={selectedSubSubjects}
        />

        <PresentYourSelf
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          register={register}
          watch={watch}
        />

        <StudentPreference
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          control={control}
        />

        <StudentAge
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          isSubmitted={isSubmitted}
          control={control}
        />

        <AveragePrice
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          register={register}
          watch={watch}
        />

        {/* <Withdrawal
          setWithdrawal={setWithdrawal}
          withdrawal={withdrawal}
          draft={draft}
        /> */}
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
