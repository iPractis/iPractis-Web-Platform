import { Select } from "@nextui-org/react";
import { useFieldArray, useController } from "react-hook-form";

import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import SectionHeader from "../../Shared/SectionHeader";
import SubSubject from "./SubSubject";

import { BookOpenedIcon, NotebookOpenedIcon } from "../../Icons";

const RelatedSubTopics = ({ control, errors }) => {
  const {
    fields: subSubjectsFields,
    append,
    remove,
  } = useFieldArray({ control, name: "subSubject" });

  const {
    fieldState: { error },
  } = useController({
    name: "subSubject",
    control,
  });

  // Check if all sub-subject entries are valid (both name and description filled)
  const allSelectorsValid = subSubjectsFields.length > 0 && subSubjectsFields.every(field => field.selected && field.description);

  // Add sub-subject
  const handleAddSubSubject = () => {
    append({
      selected: "",
      description: "",
    });
  };

  // Delete sub-subject
  const handleDeleteSelectedSubSuject = (index) => {
    remove(index);
  };

  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<BookOpenedIcon fillcolor="fill-primary-color-P1" />}
        titleText="Pick specialties or sub-subject"
        descriptionText="Highlight your teaching methods and the subtopics you've mastered."
        titleClassName="MT-SB-1"
      />

      <SectionContent>
        <div className="space-y-4">
          {/* Add Sub-subject Button */}
          <div>
            <InputLeftStickStatus
              inputBarStatusClassName={getInputStatusBorder(
                errors,
                allSelectorsValid ? "valid" : null,
                "subSubject"
              )}
            >
              <div className="relative">
                <Select
                  name="addSubSubject"
                  selectedKeys={[]}
                  onChange={() => {}} // This won't be used
                  labelPlacement="outside"
                  placeholder="Add a sub-subject"
                  selectorIcon={<span></span>}
                  startContent={
                    <InputBGWrapperIcon>
                      <NotebookOpenedIcon fillcolor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    trigger: [
                      "!bg-black rounded-2xl p-1.5 h-auto border-0 shadow-none pr-12", // Added right padding for button
                      (error?.message || error !== undefined) &&
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

                {/* Add button positioned absolutely outside the Select */}
                <button
                  type="button"
                  aria-label="Add sub-subject"
                  className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none"
                  onClick={handleAddSubSubject}
                >
                  <InputBGWrapperIcon className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1" role="img" aria-label="Add sub-subject">
                      <title>Add sub-subject</title>
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </InputBGWrapperIcon>
                </button>
              </div>
            </InputLeftStickStatus>
          </div>

          {/* Selected Sub-subjects */}
          {subSubjectsFields.map((field, index) => (
            <SubSubject
              handleDeleteSelectedSubSuject={handleDeleteSelectedSubSuject}
              name={"subSubject"}
              subSubject={field}
              control={control}
              errors={errors}
              key={field.id}
              index={index}
            />
          ))}
        </div>

        <SplitDynamicErrorZod message={error?.message} />
      </SectionContent>
    </SectionWrapper>
  );
};

export default RelatedSubTopics;
