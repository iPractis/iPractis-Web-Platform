"use client";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";

// React imports
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
  subSubject: [],
  subject: "",
  subjectIntroduction: "",
  videoLink: "",
  hourlyPrice: "",
  studentLevel: "",
  teachToAmateurPersons: false,
  teachToYoungPersons: false,
  careerExperience: [],
  education: [],
};

export const TabBody = ({ draftData }) => {
  const [draft, setDraft] = useState({ ...defaultValue, ...draftData });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className={`max-w-[1000px] mb-[100px] mx-auto space-y-16 px-2`}>
      {/* Tabs buttons (top) */}
      <TabsButtons
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        draft={draft}
      />

      {/* Tabs displayed info (bottom) */}
      <TabsDisplayedInfo
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setDraft={setDraft}
        draft={draft}
      />
    </main>
  );
};
