import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import { tabProfileSchema } from "@/src/validations/index";
import TabsButtonsBottomNav from "../TabsButtonsBottomNav";
import ProfilePicture from "./ProfilePicture";
import AboutYourself from "./AboutYourself";
import PersonalInfo from "./PersonalInfo";
import ButtonSubmitForm from "../../Shared/ButtonSubmitForm";
import SectionHeader from "../../Shared/SectionHeader";
import { ChevronDownBigIcon, CircleImportantIcon } from "../../Icons";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React imports
import { useRef } from "react";

const TabProfile = ({ setActiveTab, activeTab, draft }) => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(tabProfileSchema),
    defaultValues: {
      firstName: draft?.firstName,
      middleName: draft?.middleName,
      lastName: draft?.lastName,
      profile_url: draft?.profile_url,
      introduction: draft?.introduction,
      profile_url: draft?.profile_url,
      languages: draft?.languages,
      nationality: draft?.nationality || "United Kingdom",
      country: draft?.country || "United Kingdom",
      birthDate: draft?.birthDate,
      gender: draft?.gender,
    },
  });

  const buttonRef = useRef(null);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    const actualDraftInfo = draft;

    try {
      // TAB PROFILE
      if (activeTab === 0) {
        actualDraftInfo.introduction = data?.introduction;
        actualDraftInfo.nationality = data?.nationality;
        actualDraftInfo.middleName = data?.middleName;
        actualDraftInfo.languages = data?.languages;
        actualDraftInfo.birthDate = data?.birthDate;
        actualDraftInfo.firstName = data?.firstName;
        actualDraftInfo.lastName = data?.lastName;
        actualDraftInfo.country = data?.country;
        actualDraftInfo.gender = data?.gender;
        actualDraftInfo.profile_url = data?.profile_url;
        console.log(actualDraftInfo, "ACTUAL DRAFT");
        setActiveTab((prev) => prev + 1);
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
      className={`${activeTab !== 0 && "hidden"}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile Picture */}
      <ProfilePicture errors={errors} control={control} setValue={setValue}/>

      {/* Personal Informations */}
      <PersonalInfo control={control} errors={errors} watch={watch} />

      {/* Tell students about yourself */}
      <AboutYourself>
        <AboutYourselfMasteredLanguages errors={errors} control={control} />
      </AboutYourself>

      {/* Save and Continue Section Header */}
      <div className="mt-16">
        <SectionHeader
          descriptionText="These information will be subject to review"
          wrapperSectionHeaderClassName="relative bg-[#FFF4B8] p-4 rounded-xl max-w-[1000px] h-[112px] flex items-center justify-between"
          titleIcon={
            <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
              <CircleImportantIcon />
            </div>
          }
          titleText="Attention required"
          titleClassName="MT-SB-1 ml-[80px]"
          descriptionClassName="ml-[80px]"
        >
          <div className="absolute top-[32px] bottom-[32px] right-[32px] w-[190px] h-[48px] bg-white rounded-[16px] p-[6px] flex items-center justify-between gap-[2px]">
            <ButtonSubmitForm
              buttonClassName="text-primary-color-P1 ST-3 ml-[8px] bg-transparent border-0 p-0 cursor-pointer flex items-center whitespace-nowrap"
              ref={buttonRef}
            >
              Save, and continue
            </ButtonSubmitForm>
            <div className="mr-[6px] w-[36px] h-[36px] bg-[#F8F7F5] rounded-[10px] flex items-center justify-center gap-[10px] p-[8px]">
              <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
            </div>
          </div>
        </SectionHeader>
      </div>
    </form>
  );
};

export default TabProfile;
