"use client";
import { availableTranslatedLanguages } from "@/src/data/dataHome";
import { useState } from "react";
import Image from "next/image";

// Icons && images
import chevronDown from "@/public/icons/chevron-down.png";
import usaFlag from "@/public/flags/united-kingdom.png";
import spainFlag from "@/public/flags/spain.png";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");

  return (
    <>
      {/* Language Switcher */}
      <div className="relative inline-block">
        <div className="flex items-center cursor-pointer ST-2">
          <Image
            src={language === "en" ? usaFlag : spainFlag}
            className="w-[15px]"
            alt={language}
          />

          <span className="mx-1.5">{language === "en" ? "English" : "Español"}</span>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full text-primary-color-P1"
          >
            {availableTranslatedLanguages?.map((availableLanguage, index) => {
              return (
                <option
                  value={availableLanguage?.value}
                  key={index}
                >
                  {availableLanguage?.language}
                </option>
              );
            })}
          </select>

          <Image
            src={chevronDown}
            className="w-[9px]"
            alt={"Chevron Down"}
          />
        </div>
      </div>
    </>
  );
};

export default LanguageSwitcher;
