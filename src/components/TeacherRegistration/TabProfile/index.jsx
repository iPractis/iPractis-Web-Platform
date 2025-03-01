import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import { tabProfileSchema } from "@/src/validations/index";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";

// External imports
import { CalendarDate, parseDate } from "@internationalized/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef, useState } from "react";

const TabProfile = ({
  setSelectedNationality,
  selectedNationality,
  setSelectedCountry,
  selectedCountry,
  setActiveTab,
  activeTab,
  draft,
}) => {
  const { register, handleSubmit, formState: { errors: frontEndErrors }, control, watch, setValue, } = useForm({ mode: "onBlur", resolver: zodResolver(tabProfileSchema),
    defaultValues: {
      firstName: draft?.firstName,
      middleName: draft?.middleName,
      lastName: draft?.lastName,
      introduction: draft?.introduction,
      uploadProfileImage: draft?.uploadProfileImage,
      birthDateDay: draft?.birthDate ? parseDate(draft?.birthDate)?.day : "",
      birthDateMonth: draft?.birthDate ? parseDate(draft?.birthDate)?.month : "",
      birthDateYear: draft?.birthDate ? parseDate(draft?.birthDate)?.year : "",
      languages: draft?.languages || [],
      gender: draft?.gender,
    },
  });
  const [backEndErrors, setBackEndErrors] = useState("");
  const buttonRef = useRef(null);
  
  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB PROFILE
      if (activeTab === 0) {
        actualDraftInfo.birthDate = validBirthDate?.toString().includes("NaN") ? "" : validBirthDate?.toString();
        actualDraftInfo.uploadProfileImage = data?.uploadProfileImage;
        actualDraftInfo.nationality = selectedNationality?.key;
        actualDraftInfo.introduction = data?.introduction;
        actualDraftInfo.country = selectedCountry?.key;
        actualDraftInfo.middleName = data?.middleName;
        actualDraftInfo.languages = masteredLanguages;
        actualDraftInfo.firstName = data?.firstName;
        actualDraftInfo.lastName = data?.lastName;
        actualDraftInfo.gender = data?.gender;

        const validationResult = tabProfileSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) return;

        const response = await axios.post(
          `/teacher/set/profile`,
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
      className={`${activeTab !== 0 && "hidden"}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile Picture */}
      <ProfilePicture
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      {/* Personal Informations */}
      <PersonalInfo
        setSelectedNationality={setSelectedNationality}
        selectedNationality={selectedNationality}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        setValue={setValue}
        register={register}
        watch={watch}
      />

      {/* Tell students about yourself */}
      <AboutYourself>
        <AboutYourselfMasteredLanguages
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          control={control}
          watch={watch}
        />
      </AboutYourself>

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        buttonRef={buttonRef}
      />
    </form>
  );
};

export default TabProfile;
