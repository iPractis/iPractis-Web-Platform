"use client";

import { useState } from "react";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";

export const TeacherRegistration = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="container-page-v7 space-y-4 px-2">
      {/* Tabs */}
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Tabs displayed info */}
      <TabsDisplayedInfo />
    </main>
  );
};
