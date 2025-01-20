import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

import { parseDate } from "@internationalized/date";
import { useState } from "react";

import ukFlag from "@/public/flags/united-kingdom.png";

const TabsDisplayedInfo = ({
  setActiveTab,
  activeTab,
  saved,
  setSaved,
  draft,
  // setDraft,
}) => {
  const [masteredLanguages, setMasteredLanguages] = useState(draft?.languages);
  const [birthDate, setBirthDate] = useState(parseDate(draft?.birthDate));
  const [selectedGender, setSelectedGender] = useState(draft?.gender);
  const [introText, setIntroText] = useState(draft?.introduction);
  const [selectedCountry, setSelectedCountry] = useState({
    key: draft?.country,
    image: ukFlag,
    alt: "United Kingdom",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const actualDraftInfo = draft;

    if (activeTab === 0) {
      actualDraftInfo.birthDate = birthDate;
      actualDraftInfo.middleName = e?.target?.middleName?.value;
      actualDraftInfo.firstName = e?.target?.firstName?.value;
      actualDraftInfo.lastName = e?.target?.lastName?.value;
      actualDraftInfo.country = selectedCountry?.key;
      actualDraftInfo.languages = masteredLanguages;
      actualDraftInfo.introduction = introText;
      actualDraftInfo.gender = selectedGender;

      return;
    }

    if (activeTab === 1) {
      return;
    }

    if (activeTab === 3) {
      setSaved(true);
    } else {
      setActiveTab((prev) => prev + 1);
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
      <TabSubject activeTab={activeTab} />

      {/* 2 */}
      <TabBackground activeTab={activeTab} />

      {/* 3 */}
      <TabAvailability activeTab={activeTab} saved={saved} />

      {/* 4 */}
      <TabStatus activeTab={activeTab} />

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />
    </form>
  );
};

export default TabsDisplayedInfo;
