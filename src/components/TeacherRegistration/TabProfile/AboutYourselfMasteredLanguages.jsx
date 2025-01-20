import { useRef, useState } from "react";

import AboutYourselfLevelLanguage from "./AboutYourselfLevelLanguage";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { languages } from "@/src/data/dataTeacherRegistration";
import { Select, SelectItem } from "@nextui-org/react";

// Images && icons
import {
  ChevronDownBigIcon,
  QuestionMark,
  UserSpeakingIcon,
} from "../../Icons";

const AboutYourselfMasteredLanguages = ({
  setMasteredLanguages,
  masteredLanguages,
}) => {
  const [languageLevel, setLanguageLevel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const masteredLanguageRef = useRef("");

  // Add Mastered Language
  const handleAddMasteredLanguage = (e) => {
    const languageSelected = e?.target?.value;

    const masteredLanguageDetails = {
      name: languageSelected,
      level: languageLevel,
    };

    setMasteredLanguages([...masteredLanguages, masteredLanguageDetails]);
  };

  // Delete Mastered Language
  const handleDeleteMasteredLanguage = (language) => {
    const filteredMasteredLanguages = masteredLanguages?.filter(
      (item) => item?.name !== language
    );
    setMasteredLanguages(filteredMasteredLanguages);
  };

  // Add language level
  const handleLanguageLevel = (e, language) => {
    const levelSelected = e?.target?.value;

    const updatedLanguages = masteredLanguages?.map((item) =>
      item?.name === language ? { ...item, level: levelSelected } : item
    );

    setMasteredLanguages(updatedLanguages);
  };

  return (
    <div className="md:px-8">
      {/* Select Language */}
      <div className="flex items-end gap-2 mt-[75px]">
        <Select
          name="masteredLanguage"
          label={
            <div className="mb-2">
              <span className="flex gap-1.5  items-center text-primary-color-P4 MT-SB-1">
                Select the languages your masters{" "}
                <QuestionMark fillColor={"fill-primary-color-P4"} />
              </span>

              <span className="text-primary-color-P4 ST-3">
                Select only the languages you can use to teach.
              </span>
            </div>
          }
          ref={masteredLanguageRef}
          selectedKeys={
            masteredLanguageRef?.current?.value
              ? [masteredLanguageRef?.current?.value]
              : []
          }
          onChange={handleAddMasteredLanguage}
          onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
          labelPlacement="outside"
          placeholder="Add language"
          selectorIcon={<span></span>}
          isOpen={isOpen}
          startContent={
            <InputBGWrapperIcon>
              <UserSpeakingIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon>
              <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
            </InputBGWrapperIcon>
          }
          classNames={{
            trigger: ["select-wrapper-ipractis"],
            innerWrapper: ["select-ipractis", "w-full"],
            value: [
              "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
            ],
            listbox: ["text-primary-color-P4"],
          }}
        >
          {languages?.map((language) => (
            <SelectItem key={language}>{language}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Select Level Language */}
      {masteredLanguages?.map((masteredIndividualLanguage, index) => (
        <AboutYourselfLevelLanguage
          handleDeleteMasteredLanguage={handleDeleteMasteredLanguage}
          handleLanguageLevel={handleLanguageLevel}
          masteredIndividualLanguage={masteredIndividualLanguage}
          setLanguageLevel={setLanguageLevel}
          {...masteredIndividualLanguage}
          key={index}
        />
      ))}
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
