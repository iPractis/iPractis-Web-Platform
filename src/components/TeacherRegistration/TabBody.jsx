"use client";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";
import { useState } from "react";

const defaultValue = {
  firstName: "",
  middleName: "",
  lastName: "",
  country: "",
  gender: "",
  birthDate: "",
  introduction: "",
  languages: [],
  profileTitle: "",
  subSubject: "",
  subject: "",
  subjectIntroduction: "",
  videoLink: "",
  emailWithdrawal: "",
  hourlyPrice: "",
  studentLevel: "",
  teachToAmateurPersons: false,
  teachToYoungPersons: false,
  withdrawal: "",
  careerExperience: [],
  education: [],
};

export const TabBody = ({ draftData }) => {
  const [draft, setDraft] = useState({ ...defaultValue, ...draftData });
  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <main
      className={`container-page-v7 ${
        saved ? "sm:space-y-16 space-y-0" : "space-y-16"
      } px-2`}
    >
      {/* Tabs buttons (top) */}
      <TabsButtons
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />

      {/* Tabs displayed info (bottom) */}
      <TabsDisplayedInfo
        draft={draft}
        setDraft={setDraft}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />
    </main>
  );
};
