"use client";

import { useState } from "react";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";

export const TeacherRegistration = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="container-page-v7 px-2">
      {/* Tabs */}
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Tabs displayed info */}
      <TabsDisplayedInfo />
    </section>
  );
};
