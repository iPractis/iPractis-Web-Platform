"use client";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";
import { useState } from "react";

export const TabBody = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className={`container-page-v7 space-y-8 sm:mt-[22px] mt-[18px]`}>
      {/* Tabs buttons (top) */}
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Tabs displayed info (bottom) */}
      <TabsDisplayedInfo activeTab={activeTab} />
    </main>
  );
};
