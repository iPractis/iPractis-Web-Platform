import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { subSubjects } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Globals/SectionHeader";
import { Select, SelectItem } from "@nextui-org/react";
import SubSubject from "./SubSubject";
import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, QuestionMark, TagIcon } from "../../Icons";

const RelatedSubTopics = () => {
  const [selectedSubSubjects, setSelectedSubSubjects] = useState([]);
  const [descriptionSubSubject, setDescriptionSubSubject] = useState("");
  const [selectedSubSubject, setSelectedSubSubject] = useState("");
  const [tempSelectedKey, setTempSelectedKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Add sub-subject
  const handleAddSubSubject = (e) => {
    const subSubjectSelected = e?.target?.value;

    const selectedSubSubjectDetails = {
      selected: subSubjectSelected,
      description: descriptionSubSubject,
    };

    setSelectedSubSubjects([...selectedSubSubjects, selectedSubSubjectDetails]);

    // We clear the selected sub-subject from select
    setSelectedSubSubject("");

    // We create other state to input the value in bottom
    setTempSelectedKey(subSubjectSelected);
  };

  // Delete sub-subject
  const handleDeleteSelectedSubSuject = (selected) => {
    const filteredSelectedSubSubjects = selectedSubSubjects?.filter(
      (item) => item?.selected !== selected
    );

    setSelectedSubSubjects(filteredSelectedSubSubjects);
    setSelectedSubSubject("");
    setDescriptionSubSubject("");
  };

  // Add description text
  const descriptionSubSubjectOnChange = (e, selected) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 20) {
      // Update the VALUE directly in the object before returning!
      const updatedSubSubjects = selectedSubSubjects?.map((item) =>
        item?.selected === selected ? { ...item, description: textValue } : item
      );

      setSelectedSubSubjects(updatedSubSubjects);

      return setDescriptionSubSubject(textValue);
    }

    // If we reach to 20 characters, we update as we normally do!
    const updatedSubSubjects = selectedSubSubjects?.map((item) =>
      item?.selected === selected ? { ...item, description: textValue } : item
    );

    setSelectedSubSubjects(updatedSubSubjects);
  };

  return (
    <div className="flex-1">
      <SectionHeader
        descriptionText="Highlight your teaching methods and the subtopics you've mastered."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px] mb-20 mt-16"
        titleIcon={<TagIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Choose your specialties"
        titleClassName="MT-SB-1"
      />

      <div className="md:px-8 space-y-[50px]">
        {/* Select Sub-subject */}
        <div className="flex items-end gap-2 mt-7">
          <Select
            name="selectSubSubject"
            label={
              <div className="flex flex-col mb-2">
                <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                  Related sub topics{" "}
                  <QuestionMark fillColor={"fill-primary-color-P4"} />
                </span>

                <div className="self-start">
                  <span className=" text-primary-color-P4 ST-3">
                    Sub topics allow you to match with students needs.
                  </span>
                </div>
              </div>
            }
            value={selectedSubSubject}
            selectedKeys={selectedSubSubject ? [selectedSubSubject] : []}
            onChange={handleAddSubSubject}
            onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
            labelPlacement="outside"
            placeholder="Select a sub-subject"
            selectorIcon={<span></span>}
            isOpen={isOpen}
            startContent={
              <InputBGWrapperIcon>
                <TagIcon fillColor={"fill-primary-color-P4"} />
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
            {subSubjects?.map((subSuject) => (
              <SelectItem key={subSuject}>{subSuject}</SelectItem>
            ))}
          </Select>
        </div>

        {/* Selected Sub-subjects */}
        {selectedSubSubjects?.map((subSubject) => (
          <SubSubject
            handleDeleteSelectedSubSuject={handleDeleteSelectedSubSuject}
            descriptionSubSubjectOnChange={descriptionSubSubjectOnChange}
            descriptionSubSubject={descriptionSubSubject}
            tempSelectedKey={tempSelectedKey}
            key={subSubject?.selected}
            {...subSubject}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSubTopics;
