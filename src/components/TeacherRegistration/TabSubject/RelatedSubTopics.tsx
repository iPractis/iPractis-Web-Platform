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

import { BookIcon, BookOpenedIcon, NotebookOpenedIcon, PlusIcon } from "../../Icons";

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
              <div className="flex items-center bg-primary-color-P1 rounded-[16px] p-[6px] justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-[8px] rounded-[10px] bg-primary-color-P12">
                    <BookIcon fillcolor={"fill-primary-color-P4"} />
                  </div>
                  <div>
                    <span className="ST-3 text-primary-color-P12">
                      Add a sub-subject
                    </span>
                  </div>
                </div>
                {/* Add button positioned absolutely outside the Select */}
                <button
                  type="button"
                  aria-label="Add sub-subject"
                  className=""
                  onClick={handleAddSubSubject}
                >
                  <div className="p-[8px] rounded-[10px] bg-primary-color-P12 hover:bg-secondary-color-S8 transition-colors">
                    <PlusIcon />
                  </div>
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
