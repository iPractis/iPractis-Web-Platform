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
  setTeachToAmateurPersons,
  setTeachToYoungPersons,
  setSelectedSubSubjects,
  teachToAmateurPersons,
  selectedSubSubjects,
  teachToYoungPersons,
  setSelectedLevel,
  selectedLevel,
  setWithdrawal,
  setActiveTab,
  withdrawal,
  activeTab,
  draft,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
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
        actualDraftInfo.subjectIntroduction = watch("subjectIntroduction");
        actualDraftInfo.emailWithdrawal = watch("emailWithdrawal");
        actualDraftInfo.profileTitle = watch("profileTitle");
        actualDraftInfo.teachToAmateurPersons = watch("teachToAmateurPersons");
        actualDraftInfo.hourlyPrice = watch("hourlyPrice");
        actualDraftInfo.teachToYoungPersons = watch("teachToYoungPersons");
        actualDraftInfo.videoLink = watch("videoLink");
        actualDraftInfo.subSubject = watch("subSubject");
        actualDraftInfo.studentLevel = watch("studentLevel");
        actualDraftInfo.subject = watch("subject");
        actualDraftInfo.withdrawal = watch("withdrawal");

        const validationResult = tabSubjectSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) return;

        const response = await axios.post(
          `/teacher/set/subject`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "PROFILE");
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
          setSelectedLevel={setSelectedLevel}
          selectedLevel={selectedLevel}
        />

        <StudentAge
          setTeachToAmateurPersons={setTeachToAmateurPersons}
          setTeachToYoungPersons={setTeachToYoungPersons}
          teachToAmateurPersons={teachToAmateurPersons}
          teachToYoungPersons={teachToYoungPersons}
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
