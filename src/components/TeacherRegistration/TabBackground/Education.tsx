import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";

import FormInputsBox from "./FormInputsBox";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import SectionContent from "../../Shared/SectionContent";
import SectionHeader from "../../Shared/SectionHeader";
import SectionWrapper from "../../Shared/SectionWrapper";

// External imports
import { Controller, useFieldArray } from "react-hook-form";

// Icons
import { NotebookOpenedIconBigger, SchoolCurriculumIcon, PlusIcon } from "../../Icons";

const Education = ({ errors, control }) => {
  const {
    fields: education,
    append,
    remove,
  } = useFieldArray({ control, name: "education" });

  // ADD EDUCATION
  const handleAddEducation = () => {
    append({
      company: "",
      from: "",
      to: "",
      description: "",
      uploadFile: "",
    });
  };

  // DELETE EDUCATION
  const handleDeleteEducation = (index) => {
    remove(index);
  };

  return (
    <Controller
      name={`education`}
      control={control}
      render={({ fieldState: { error } }) => (
        <SectionWrapper>
          <SectionHeader
            titleIcon={<NotebookOpenedIconBigger fillcolor="fill-primary-color-P1" />}
            titleText="Educational background"
            descriptionText="Tell us about your education path."
            titleClassName="MT-SB-1"
          />
          <SectionContent>
          <div className="space-y-4">
            {/* Add Education Button */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={`${getInputStatusBorder(
                  errors,
                  education,
                  "education"
                )}`}
              >
                <div className="flex items-center bg-primary-color-P1 rounded-[16px] p-[6px] justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-[8px] rounded-[10px] bg-primary-color-P12">
                      <SchoolCurriculumIcon fillColor={"fill-primary-color-P4"} />
                    </div>
                    <div>
                      <span className="ST-3 text-primary-color-P12">
                        Add a school curriculum
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Add education"
                    className=""
                    onClick={handleAddEducation}
                  >
                    <div className="p-[8px] rounded-[10px] bg-primary-color-P12 hover:bg-secondary-color-S8 transition-colors">
                      <PlusIcon />
                    </div>
                  </button>
                </div>
              </InputLeftStickStatus>
            </div>

            {/* Education Items */}
            {education?.map((education, index) => (
              <FormInputsBox
                firstInputPlaceholder={"Example: University Of Somewhere"}
                handleDelete={handleDeleteEducation}
                array={"education"}
                key={education.id}
                control={control}
                item={education}
                errors={errors}
                index={index}
              />
            ))}
          </div>

          <SplitDynamicErrorZod message={error?.message} />
        </SectionContent>
        </SectionWrapper>
      )}
    />
  );
};

export default Education;
