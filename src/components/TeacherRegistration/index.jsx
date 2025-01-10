"use client";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";
import { useState } from "react";

export const TeacherRegistration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <main className="container-page-v7 space-y-16 px-2">
      {/* Tabs buttons (top) */}
      <TabsButtons
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />

      {/* Tabs displayed info (bottom) */}
      <TabsDisplayedInfo
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />
    </main>
  );
};
