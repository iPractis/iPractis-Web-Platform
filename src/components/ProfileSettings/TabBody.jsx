"use client";

import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";
import { useState } from "react";

export const TabBody = () => {
  const [activeTab, setActiveTab] = useState(2); // Default to Profile tab

  return (
    <section className={`max-w-[1000px] mx-auto space-y-16 px-2`}>
      {/* Tabs buttons (top) */}
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Tabs displayed info (bottom) */}
      <TabsDisplayedInfo activeTab={activeTab} />
    </section>
  );
};
