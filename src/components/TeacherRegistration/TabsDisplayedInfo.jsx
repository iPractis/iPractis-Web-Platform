import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

// React imports
import { CalendarDate, parseDate } from "@internationalized/date";
import { useState } from "react";
import axios from "axios";

// Images && icons
import ukFlag from "@/public/flags/united-kingdom.png";
import italyFlag from "@/public/flags/italy.png";
import franceFlag from "@/public/flags/france.png";
import spainFlag from "@/public/flags/spain.png";

const TabsDisplayedInfo = ({
  setActiveTab,
  activeTab,
  saved,
  setSaved,
  draft,
  // setDraft,
}) => {
  // TAB PROFILE STATES
  const [isTabProfilePending, setIsTabProfilePending] = useState(false);
  const [masteredLanguages, setMasteredLanguages] = useState(draft?.languages);
  const [birthDate, setBirthDate] = useState(parseDate(draft?.birthDate));
  const [selectedGender, setSelectedGender] = useState(draft?.gender);
  const [introText, setIntroText] = useState(draft?.introduction);
  const countryFlags = {
    UnitedKingdom: ukFlag,
    France: franceFlag,
    Spain: spainFlag,
    Italy: italyFlag,
  };
  const [selectedCountry, setSelectedCountry] = useState({
    key: draft?.country,
    image: countryFlags[draft?.country] || ukFlag,
    alt: `Flag of ${draft?.country}`,
  });
  let validBirthDate = new CalendarDate(
    birthDate?.year,
    birthDate?.month,
    birthDate?.day
  );

  // TAB SUBJECT STATES
  const [teachToAmateurPersons, setTeachToAmateurPersons] = useState(draft?.teachToYoungPersons);
  const [teachToYoungPersons, setTeachToYoungPersons] = useState(draft?.teachToAmateurPersons);
  const [selectedLevel, setSelectedLevel] = useState(draft?.studentLevel);
  const [isTabSubjectPending, setIsTabSubjectPending] = useState(false);
  const [subjectToTeach, setSubjectToTeach] = useState(draft?.subject);
  const [withdrawal, setWithdrawal] = useState(draft?.withdrawal);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualDraftInfo = draft;

    try {
      setIsTabProfilePending(true);
      setIsTabSubjectPending(true);

      // TAB PROFILE
      if (activeTab === 0) {
        actualDraftInfo.middleName = e?.target?.middleName?.value;
        actualDraftInfo.firstName = e?.target?.firstName?.value;
        actualDraftInfo.lastName = e?.target?.lastName?.value;
        actualDraftInfo.birthDate = validBirthDate?.toString();
        actualDraftInfo.country = selectedCountry?.key;
        actualDraftInfo.languages = masteredLanguages;
        actualDraftInfo.introduction = introText;
        actualDraftInfo.gender = selectedGender;

        const res = await axios.post(`/teacher/set/profile`, actualDraftInfo);

        console.log(res);
      }

      // TAB SUBJECT
      if (activeTab === 1) {
        actualDraftInfo.subjectIntroduction = e?.target?.subjectIntroduction?.value;
        actualDraftInfo.emailWithdrawal = e?.target?.emailWithdrawal?.value;
        actualDraftInfo.profileTitle = e?.target?.profileTitle?.value;
        actualDraftInfo.teachToAmateurPersons = teachToAmateurPersons;
        actualDraftInfo.hourlyPrice = e?.target?.hourlyPrice?.value;
        actualDraftInfo.teachToYoungPersons = teachToYoungPersons;
        actualDraftInfo.subSubject = e?.target?.subSubject?.value;
        actualDraftInfo.videoLink = e?.target?.videoLink?.value;
        actualDraftInfo.studentLevel = selectedLevel;
        actualDraftInfo.subject = subjectToTeach;
        actualDraftInfo.withdrawal = withdrawal;
        console.log(actualDraftInfo);

        return;
        const res = await axios.put(`/teacher/set/subject`, actualDraftInfo);

        console.log(res);
      }

      if (activeTab === 3) {
        setSaved(true);
      } else {
        setActiveTab((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsTabProfilePending(false);
      setIsTabSubjectPending(false);
    }

    // setDraft(actualDraftInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        saved ? "max-w-[1000px] sm:px-16 px-8 sm:py-0 py-8" : "max-w-[494px]"
      } mx-auto`}
    >
      {/* 0 */}
      <TabProfile
        setMasteredLanguages={setMasteredLanguages}
        setSelectedCountry={setSelectedCountry}
        setSelectedGender={setSelectedGender}
        masteredLanguages={masteredLanguages}
        selectedCountry={selectedCountry}
        selectedGender={selectedGender}
        setBirthDate={setBirthDate}
        setIntroText={setIntroText}
        introText={introText}
        birthDate={birthDate}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 1 */}
      <TabSubject
        setTeachToAmateurPersons={setTeachToAmateurPersons}
        setTeachToYoungPersons={setTeachToYoungPersons}
        teachToAmateurPersons={teachToAmateurPersons}
        teachToYoungPersons={teachToYoungPersons}
        setSubjectToTeach={setSubjectToTeach}
        setSelectedLevel={setSelectedLevel}
        subjectToTeach={subjectToTeach}
        setWithdrawal={setWithdrawal}
        selectedLevel={selectedLevel}
        withdrawal={withdrawal}
        activeTab={activeTab}
        draft={draft}
      />

      {/* 2 */}
      <TabBackground activeTab={activeTab} />

      {/* 3 */}
      <TabAvailability activeTab={activeTab} saved={saved} />

      {/* 4 */}
      <TabStatus activeTab={activeTab} />

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        isTabSubjectPending={isTabSubjectPending}
        isTabProfilePending={isTabProfilePending}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />
    </form>
  );
};

export default TabsDisplayedInfo;
