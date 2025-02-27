import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { subSubjects } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";
import { Select, SelectItem } from "@nextui-org/react";
import SubSubject from "./SubSubject";
import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, QuestionMark, TagIcon } from "../../Icons";
// import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
// import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";

const RelatedSubTopics = ({
  selectedSubSubjects,
  setSelectedSubSubjects,
  errors,
}) => {
  // const relatedSubTopicError = findInputErrorZod(errors, "subSubject")?.message;
  const [selectedSubSubject, setSelectedSubSubject] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Add sub-subject
  const handleAddSubSubject = (e) => {
    const subSubjectSelected = e?.target?.value;

    const selectedSubSubjectDetails = {
      selected: subSubjectSelected,
      description: "",
    };

    setSelectedSubSubjects([...selectedSubSubjects, selectedSubSubjectDetails]);

    // We clear the selected sub-subject from select
    setSelectedSubSubject("");
  };

  // Delete sub-subject
  const handleDeleteSelectedSubSuject = (selected) => {
    const filteredSelectedSubSubjects = selectedSubSubjects?.filter(
      (item) => item?.selected !== selected
    );

    setSelectedSubSubjects(filteredSelectedSubSubjects);
    setSelectedSubSubject("");
  };

  // Update description text
  const handleUpdateSubSubject = (index, updatedEducation) => {
    const updatedSubSubjects = selectedSubSubjects?.map((education, i) =>
      i === index ? updatedEducation : education
    );

    setSelectedSubSubjects(updatedSubSubjects);
  };

  return (
    <div className="flex-1">
      <SectionHeader
        descriptionText="Highlight your teaching methods and the subtopics you've mastered."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px] my-16"
        titleIcon={<TagIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Choose your specialties"
        titleClassName="MT-SB-1"
      />

      <div className="md:px-8">
        <div className="space-y-[50px]">
          {/* Select Sub-subject */}
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="flex items-end gap-2">
              <Select
                name="subSubject"
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
                  // trigger: [
                  //   "select-wrapper-ipractis",
                  //   findInputErrorZod(errors, "subSubject")?.message &&
                  //     "form-input-error",
                  // ],
                  innerWrapper: ["select-ipractis", "w-full"],
                  value: [
                    "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                  ],
                  listbox: ["text-primary-color-P4"],
                }}
              >
                {subSubjects
                  ?.filter(
                    (subSuject) =>
                      !selectedSubSubjects.some((s) => s.selected === subSuject)
                  )
                  .map((subSuject) => (
                    <SelectItem key={subSuject}>{subSuject}</SelectItem>
                  ))}
              </Select>
            </div>
          </div>

          {/* Selected Sub-subjects */}
          {selectedSubSubjects?.map((subSubject, index) => (
            <SubSubject
              handleDeleteSelectedSubSuject={handleDeleteSelectedSubSuject}
              handleUpdateSubSubject={handleUpdateSubSubject}
              subSubject={subSubject}
              errors={errors}
              index={index}
              key={index}
            />
          ))}
        </div>

        {/* We do this because we want error to change of position (if it's a different error) */}
        {/* {relatedSubTopicError ===
          "Invalid field --- At least one sub-subject is required." && (
          <ErrorZodResponse errors={errors} fieldName={"subSubject"} />
        )} */}
      </div>
    </div>
  );
};

export default RelatedSubTopics;
