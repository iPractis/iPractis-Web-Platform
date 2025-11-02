import { languages as allLanguages, languagesLevels, masteredLanguagesImages } from "@/src/data/dataTeacherRegistration";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { useController, useFieldArray } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

// React imports
import { useRef, useState, useEffect } from "react";

// Icons
import {
  AddBoxIcon,
  QuestionMark,
  UserSpeakingIcon,
  ChevronDownBigIcon,
  TrashBinIcon,
} from "../../Icons";
import Image from "next/image";

const AboutYourselfMasteredLanguages = ({ errors, control }) => {
  // State for managing multiple selector boxes
  const [selectors, setSelectors] = useState([
    { language: "", level: "", id: 0 }
  ]);
  const [nextId, setNextId] = useState(1);

  // Get the languages field array for validation
  const {
    field: language,
    fieldState: { error: languagesError },
  } = useController({
    name: "languages",
    control: control,
  });

  // Initialize selectors from draft data
  useEffect(() => {
    if (language?.value && language.value.length > 0) {
      const draftSelectors = language.value.map((lang, idx) => ({
        language: lang.name,
        level: lang.level,
        id: idx,
      }));
      setSelectors(draftSelectors);
      setNextId(draftSelectors.length);
    }
  }, []);

  // Sync selectors to form array
  const syncToFormArray = () => {
    const validLanguages = selectors
      .filter(sel => sel.language && sel.level)
      .map(sel => ({ name: sel.language, level: sel.level }));
    
    if (language?.onChange) {
      language.onChange(validLanguages);
    }
  };

  // Update selector
  const updateSelector = (id, field, value) => {
    setSelectors(prev => {
      const updated = prev.map(sel => sel.id === id ? { ...sel, [field]: value } : sel);
      return updated;
    });
  };

  // Add new selector box when + is clicked
  const handleAddSelector = () => {
    const newId = nextId;
    setSelectors(prev => [...prev, { language: "", level: "", id: newId }]);
    setNextId(prev => prev + 1);
  };

  // Delete selector
  const handleDeleteSelector = (id) => {
    setSelectors(prev => prev.filter(sel => sel.id !== id));
  };

  // Sync whenever selectors change
  useEffect(() => {
    syncToFormArray();
  }, [selectors]);

  return (
    <div className="mx-[285px] mt-[32px]">
      <div className="space-y-4">
        {/* Add Language Button - Keep existing styling at top */}
        <div>
          <Select
            name="languages"
            selectedKeys={[]}
            onChange={() => {}} // This won't be used
            labelPlacement="outside"
            placeholder="Add a language"
            selectorIcon={<span></span>}
            startContent={
              <InputBGWrapperIcon>
                <UserSpeakingIcon fillcolor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <div 
                className="w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddSelector();
                }}
              >
                <InputBGWrapperIcon className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1 pointer-events-none">
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </InputBGWrapperIcon>
              </div>
            }
            classNames={{
              trigger: [
                "!bg-black rounded-2xl p-1.5 h-auto border-0 shadow-none",
                (languagesError?.message || languagesError !== undefined) &&
                  "form-input-error",
              ],
              innerWrapper: ["text-white placeholder:text-white", "w-full"],
              value: [
                "group-data-[has-value=true]:text-white text-white ST-3 ml-4",
              ],
              listbox: ["text-primary-color-P4"],
              base: "!mt-0",
            }}
          >
            {/* Empty - this is just for styling */}
          </Select>
        </div>

                                   {/* Show selector boxes */}
          {selectors.map((selector) => {
            const selectedLanguageImage = masteredLanguagesImages[selector.language];
            
            return (
              <div key={selector.id} className="flex items-center gap-[2px]">
                <InputLeftStickStatus
                  inputBarStatusClassName={getInputStatusBorder(
                    errors,
                    selector.language && selector.level ? "valid" : null,
                    "languages"
                  )}
                >
                  <div className="w-full h-[48px] bg-[#F8F7F5] rounded-2xl opacity-100 gap-[2px] flex items-center relative">
                                         {/* Language Selector Dropdown */}
                     <div className="mt-[6px] mb-[6px] ml-[6px] w-[195px] h-[36px] bg-white rounded-[10px]">
                       <Select
                        placeholder="Language"
                        selectedKeys={selector.language ? [selector.language] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys).join("");
                          updateSelector(selector.id, "language", selected);
                        }}
                        selectorIcon={<span></span>}
                        startContent={
                          selectedLanguageImage && (
                            <Image
                              className="h-6 w-[39px] rounded-[4px]"
                              src={selectedLanguageImage.src}
                              alt={selector.language}
                              width={39}
                              height={24}
                            />
                          )
                        }
                        endContent={<ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />}
                        classNames={{
                          trigger: [
                            "select-wrapper-ipractis",
                            "!bg-primary-color-P12",
                            "w-full",
                            "min-h-fit",
                            "!rounded-xl",
                          ],
                          innerWrapper: ["select-ipractis", "w-full", "ps--1"],
                          value: [
                            "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                          ],
                          listbox: ["text-primary-color-P4"],
                          base: "!w-full",
                        }}
                      >
                        {allLanguages
                          ?.filter(
                            (language) =>
                              !selectors.some(
                                (sel) => sel.language === language && sel.id !== selector.id
                              ) || language === selector.language
                          )
                          .map((language) => (
                            <SelectItem key={language}>{language}</SelectItem>
                          ))}
                      </Select>
                    </div>

                                                                                   {/* Level Dropdown */}
                      <div className="mt-[6px] mb-[6px] mr-[6px] w-[153px] h-[36px] bg-white rounded-[10px] ml-1">
                        <Select
                         placeholder="Level"
                         selectedKeys={selector.level ? [selector.level] : []}
                         onSelectionChange={(keys) => {
                           const selected = Array.from(keys).join("");
                           updateSelector(selector.id, "level", selected);
                         }}
                         selectorIcon={<span></span>}
                         endContent={<ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />}
                         classNames={{
                           trigger: [
                             "select-wrapper-ipractis",
                             "!bg-primary-color-P12",
                             "w-full",
                             "min-h-fit",
                             "!rounded-xl",
                           ],
                           innerWrapper: ["select-ipractis", "w-full", "ps-1"],
                           value: [
                             "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                           ],
                           listbox: ["text-primary-color-P4"],
                           base: "!w-full",
                         }}
                       >
                         {languagesLevels.map((level) => (
                           <SelectItem key={level}>{level}</SelectItem>
                         ))}
                       </Select>
                     </div>
                  </div>
                </InputLeftStickStatus>

                {/* Delete Button - separated with 2px gap */}
                <button
                  className="bg-[#F8F7F5] hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
                  onClick={() => handleDeleteSelector(selector.id)}
                  type="button"
                >
                  <TrashBinIcon
                    fillcolor={"fill-primary-color-P4"}
                    strokeColor={"stroke-primary-color-P4"}
                  />
                </button>
              </div>
            );
          })}
      </div>

      <SplitDynamicErrorZod message={languagesError?.message} />
    </div>
  );
};

export default AboutYourselfMasteredLanguages;