import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import { tabProfileSchema } from "@/src/validations/index";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// React imports
import { useRef } from "react";

const TabProfile = ({ setActiveTab, activeTab, draft }) => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabProfileSchema),
    defaultValues: {
      firstName: draft?.firstName,
      middleName: draft?.middleName,
      lastName: draft?.lastName,
      introduction: draft?.introduction,
      uploadProfileImage: draft?.uploadProfileImage,
      languages: draft?.languages,
      nationality: draft?.nationality,
      birthDate: draft?.birthDate,
      country: draft?.country,
      gender: draft?.gender,
    },
  });

  console.log(watch("country"))

  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB PROFILE
      if (activeTab === 0) {
        actualDraftInfo.uploadProfileImage = data?.uploadProfileImage;
        actualDraftInfo.introduction = data?.introduction;
        actualDraftInfo.nationality = data?.nationality;
        actualDraftInfo.middleName = data?.middleName;
        actualDraftInfo.languages = data?.languages;
        actualDraftInfo.birthDate = data?.birthDate;
        actualDraftInfo.firstName = data?.firstName;
        actualDraftInfo.lastName = data?.lastName;
        actualDraftInfo.country = data?.country;
        actualDraftInfo.gender = data?.gender;

        const response = await axios.post(
          `/teacher/set/profile`,
          actualDraftInfo
        );

        setActiveTab((prev) => prev + 1);
        console.log(response, "PROFILE");
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
      className={`${activeTab !== 0 && "hidden"}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile Picture */}
      <ProfilePicture errors={errors} control={control} />

      {/* Personal Informations */}
      <PersonalInfo control={control} errors={errors} watch={watch} />

      {/* Tell students about yourself */}
      <AboutYourself>
        <AboutYourselfMasteredLanguages errors={errors} control={control} />
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
