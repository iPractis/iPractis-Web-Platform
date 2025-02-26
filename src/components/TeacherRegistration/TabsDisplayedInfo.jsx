import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";
import TabReview from "./TabReview";

// React imports
import { CalendarDate, parseDate } from "@internationalized/date";
import { useState } from "react";
import axios from "axios";

// Images && icons
import ukFlag from "@/public/flags/united-kingdom.png";
import italyFlag from "@/public/flags/italy.png";
import franceFlag from "@/public/flags/france.png";
import spainFlag from "@/public/flags/spain.png";

const TabsDisplayedInfo = ({ setActiveTab, activeTab, draft }) => {
  // TAB PROFILE STATES
  const countryFlags = {
    UnitedKingdom: ukFlag,
    France: franceFlag,
    Spain: spainFlag,
    Italy: italyFlag,
  };
  const [selectedCountry, setSelectedCountry] = useState({
    key: draft?.country || "United Kingdom",
    image: countryFlags[draft?.country] || ukFlag,
    alt: `Flag of ${draft?.country}`,
  });
  const [selectedNationality, setSelectedNationality] = useState({
    key: draft?.nationality || "United Kingdom",
    image: countryFlags[draft?.nationality] || ukFlag,
    alt: `Flag of ${draft?.nationality}`,
  });

  // TAB SUBJECT STATES
  const [selectedSubSubjects, setSelectedSubSubjects] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(draft?.studentLevel);

  // TAB BACKGROUND STATES
  const [experiences, setExperiences] = useState(draft?.careerExperience);
  const [educations, setEducations] = useState(draft?.education);

  // TAB AVAILAIBILITY STATES
  const [selectedSlots, setSelectedSlots] = useState(draft?.workSchedule);

  const [errors, setErrors] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append(
  //     "uploadProfileImage",
  //     e?.target?.uploadProfileImage?.files[0]
  //   );
  //   const uploadedImage = formData.get("uploadProfileImage");

  //   const actualDraftInfo = draft;

  //   try {
  //     // setIsTabProfilePending(true);
  //     // setIsTabSubjectPending(true);
  //     // setIsTabBackgroundPending(true);
  //     // setIsTabAvailabilityPending(true);

  //     // TAB PROFILE
  //     if (activeTab === 0) {
  //       actualDraftInfo.birthDate = validBirthDate?.toString().includes("NaN")
  //         ? ""
  //         : validBirthDate?.toString();
  //       actualDraftInfo.middleName = e?.target?.middleName?.value;
  //       actualDraftInfo.firstName = e?.target?.firstName?.value;
  //       actualDraftInfo.nationality = selectedNationality?.key;
  //       actualDraftInfo.lastName = e?.target?.lastName?.value;
  //       actualDraftInfo.uploadProfileImage = uploadedImage;
  //       actualDraftInfo.country = selectedCountry?.key;
  //       actualDraftInfo.languages = masteredLanguages;
  //       actualDraftInfo.introduction = introText;
  //       actualDraftInfo.gender = selectedGender;

  //       const validationResult = tabProfileSchema.safeParse(actualDraftInfo);

  //       if (!validationResult.success) {
  //         return setErrors(validationResult.error.issues);
  //       }

  //       const response = await axios.post(
  //         `/teacher/set/profile`,
  //         actualDraftInfo
  //       );

  //       setErrors([]);
  //       setActiveTab((prev) => prev + 1);
  //       console.log(response, "PROFILE");
  //     }

  //     // TAB SUBJECT
  //     if (activeTab === 1) {
  //       actualDraftInfo.subjectIntroduction = e?.target?.subjectIntroduction?.value;
  //       actualDraftInfo.emailWithdrawal = e?.target?.emailWithdrawal?.value;
  //       actualDraftInfo.profileTitle = e?.target?.profileTitle?.value;
  //       actualDraftInfo.teachToAmateurPersons = teachToAmateurPersons;
  //       actualDraftInfo.hourlyPrice = e?.target?.hourlyPrice?.value;
  //       actualDraftInfo.teachToYoungPersons = teachToYoungPersons;
  //       actualDraftInfo.videoLink = e?.target?.videoLink?.value;
  //       actualDraftInfo.subSubject = selectedSubSubjects;
  //       actualDraftInfo.studentLevel = selectedLevel;
  //       actualDraftInfo.subject = subjectToTeach;
  //       actualDraftInfo.withdrawal = withdrawal;

  //       const validationResult = tabSubjectSchema.safeParse(actualDraftInfo);

  //       if (!validationResult.success) {
  //         return setErrors(validationResult.error.issues);
  //       }

  //       const response = await axios.put(
  //         `/teacher/set/subject`,
  //         actualDraftInfo
  //       );

  //       setErrors([]);
  //       setActiveTab((prev) => prev + 1);
  //       console.log(response, "SUBJECT");
  //     }

  //     // TAB BACKGROUND
  //     if (activeTab === 2) {
  //       actualDraftInfo.careerExperience = experiences;
  //       actualDraftInfo.education = educations;

  //       const validationResult = tabBackgroundSchema.safeParse(actualDraftInfo);

  //       if (!validationResult.success) {
  //         return setErrors(validationResult.error.issues);
  //       }

  //       const response = await axios.put(
  //         `/teacher/set/background`,
  //         actualDraftInfo
  //       );

  //       setErrors([]);
  //       setActiveTab((prev) => prev + 1);
  //       console.log(response, "BACKGROUND");
  //     }

  //     // TAB AVAILABILITY
  //     if (activeTab === 3) {
  //       actualDraftInfo.timeZone = e?.target?.timeZone?.value;
  //       actualDraftInfo.dailyWorkTime = selectedSlots?.length;
  //       actualDraftInfo.workSchedule = selectedSlots;

  //       const validationResult =
  //         tabAvailabilitySchema.safeParse(actualDraftInfo);

  //       if (!validationResult.success) {
  //         return setErrors(validationResult.error.issues);
  //       }

  //       const response = await axios.put(
  //         `/teacher/set/availability`,
  //         actualDraftInfo
  //       );

  //       setErrors([]);
  //       setActiveTab((prev) => prev + 1);
  //       console.log(response, "AVAILABILITY");
  //     }
  //   } catch (err) {
  //     setErrors(err?.response?.data?.message);
  //     console.log(err);
  //   } finally {
  //     // setIsTabProfilePending(false);
  //     // setIsTabSubjectPending(false);
  //     // setIsTabBackgroundPending(false);
  //     // setIsTabAvailabilityPending(false);
  //   }
  // };

  return (
    <main className={`max-w-[1000px] md:px-0 px-8 sm:py-0 py-8 mx-auto`}>
      {/* 0 */}
      <TabProfile
        setSelectedNationality={setSelectedNationality}
        selectedNationality={selectedNationality}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 1 */}
      <TabSubject
        setSelectedSubSubjects={setSelectedSubSubjects}
        selectedSubSubjects={selectedSubSubjects}
        setSelectedLevel={setSelectedLevel}
        selectedLevel={selectedLevel}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        errors={errors}
        draft={draft}
      />

      {/* 2 */}
      <TabBackground
        setExperiences={setExperiences}
        setEducations={setEducations}
        experiences={experiences}
        educations={educations}
        activeTab={activeTab}
        errors={errors}
      />

      {/* 3 */}
      <TabAvailability
        setSelectedSlots={setSelectedSlots}
        selectedSlots={selectedSlots}
        activeTab={activeTab}
        errors={errors}
        draft={draft}
      />

      {/* 4 */}
      <TabReview
        setSelectedSlots={setSelectedSlots}
        selectedSlots={selectedSlots}
        activeTab={activeTab}
      />

      {/* 5 */}
      <TabStatus activeTab={activeTab} />
    </main>
  );
};

export default TabsDisplayedInfo;
