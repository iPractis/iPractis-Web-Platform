import { useState } from "react";

// Images && icons
import {
  ChevronDownBigIcon,
  QuestionMark,
  UserSpeakingIcon,
} from "../../Icons";
import AboutYourselfLevelLanguage from "./AboutYourselfLevelLanguage";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { languages } from "@/src/data/dataTeacherRegistration";
import { Select, SelectItem } from "@nextui-org/react";

const AboutYourselfMasteredLanguages = () => {
  const [masteredLanguages, setMasteredLanguages] = useState([]);
  const [masteredLanguage, setMasteredLanguage] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Add Mastered Language
  const handleAddMasteredLanguage = (e) => {
    const languageSelected = e?.target?.value;

    // Grab the selected language that the user masters
    setMasteredLanguage(languageSelected);

    // Save to "DB" mastered languages
    const masteredLanguageDetails = {
      language: languageSelected,
      level: languageLevel,
    };

    setMasteredLanguages([...masteredLanguages, masteredLanguageDetails]);

    // Reset value (but it's not working)
    // setMasteredLanguage("");
  };

  // Delete Mastered Language
  const handleDeleteMasteredLanguage = (language) => {
    const filteredMasteredLanguages = masteredLanguages?.filter(
      (item) => item?.language !== language
    );
    setMasteredLanguages(filteredMasteredLanguages);
  };

  return (
    <div className="flex-1 w-full">
      {/* Select Language */}
      <div className="flex items-end gap-2 mt-7">
        <Select
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
          value={masteredLanguage}
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
          setLanguageLevel={setLanguageLevel}
          {...masteredIndividualLanguage}
          languageLevel={languageLevel}
          key={index}
        />
      ))}
    </div>
  );
};

export default AboutYourselfMasteredLanguages;
