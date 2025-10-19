import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { subSubjects } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";
import SubSubject from "./SubSubject";

// External imports
import { useFieldArray, useController } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

// React imports
import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, QuestionMark, TagIcon } from "../../Icons";

const RelatedSubTopics = ({ control, errors }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    fields: subSubjectsFields,
    append,
    remove,
  } = useFieldArray({ control, name: "subSubject" });

  const {
    field: { value, onBlur },
    fieldState: { error },
  } = useController({
    name: "subSubject",
    control,
  });

  // Add sub-subject
  const handleAddSubSubject = (e) => {
    const subSubjectSelected = e?.target?.value;

    append({
      selected: subSubjectSelected,
      description: "",
    });
  };

  // Delete sub-subject
  const handleDeleteSelectedSubSuject = (index) => {
    remove(index);
  };

  return (
    <div className="flex-1">
      <SectionHeader
        descriptionText="Highlight your teaching methods and the subtopics you've mastered."
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] lg:p-4 p-8 lg:rounded-[30px] rounded-[32px] lg:max-w-[1000px] max-w-[398px] lg:h-[112px] h-[122px] flex items-center justify-between my-16"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <TagIcon fillColor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Pick specialties or sub-subject"
        titleClassName="MT-SB-1 lg:ml-[80px] md:ml-[60px] ml-[80px]"
        descriptionClassName="lg:ml-[80px] md:ml-[60px] ml-[80px]"
      />

      <div className="lg:mx-[285px] md:mx-[100px] mx-4">
        <div className="lg:space-y-[40px] md:space-y-[32px] space-y-[24px]">
          {/* Select Sub-subject */}
          <div>
            <InputLeftStickStatus
              inputBarStatusClassName={`${getInputStatusBorder(
                errors,
                value,
                "subSubject"
              )} top-[54%] -translate-y-0`}
            >
              <Select
                  name="subSubject"
                  selectedKeys={value}
                  onChange={(e) => handleAddSubSubject(e)}
                  onOpenChange={(open) => {
                    setIsOpen(open);

                    if (!open) {
                      onBlur();
                    }
                  }}
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
                    trigger: `px-1 py-1.5 h-auto !bg-[#f8f7f5] ${
                      (error?.message || error !== undefined) &&
                      "form-input-error"
                    }`,
                    innerWrapper: ["select-ipractis", "w-full"],
                    value: [
                      "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                    ],
                    listbox: ["text-primary-color-P4"],
                    base: "w-full",
                  }}
                >
                  {subSubjects
                    ?.filter(
                      (subSubject) =>
                        !subSubjectsFields.some(
                          (field) => field.selected === subSubject
                        )
                    )
                    .map((subSubject) => (
                      <SelectItem key={subSubject}>{subSubject}</SelectItem>
                    ))}
                </Select>
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
      </div>
    </div>
  );
};

export default RelatedSubTopics;
