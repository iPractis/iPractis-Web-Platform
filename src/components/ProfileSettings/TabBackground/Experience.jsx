import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";

import FormInputsBox from "./FormInputsBox";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import SectionContent from "../../Shared/SectionContent";
import SectionHeader from "../../Shared/SectionHeader";
import SectionWrapper from "../../Shared/SectionWrapper";

// External imports
import { Controller, useFieldArray } from "react-hook-form";

// Icons
import { NotebookOpenedIconBigger, ExperienceBuildingIcon, PlusIcon, ChevronDownIcon, ChevronDownMediumPlusIcon } from "../../Icons";

const Experience = ({ errors, control }) => {
  const {
    fields: careerExperience,
    append,
    remove,
  } = useFieldArray({ control, name: "careerExperience" });

  // ADD EXPERIENCE
  const handleAddExperience = () => {
    append({
      company: "",
      from: "",
      to: "",
      description: "",
      uploadFile: "",
    });
  };

  // DELETE EXPERIENCE
  const handleDeleteExperience = (index) => {
    remove(index);
  };

  return (
    <Controller
      name={`careerExperience`}
      control={control}
      render={({ fieldState: { error } }) => (
        <SectionWrapper>
          <SectionHeader
            titleIcon={<NotebookOpenedIconBigger fillcolor="fill-primary-color-P1" />}
            titleText="Professional background"
            descriptionText="Tell us about your career and experience"
            titleClassName="MT-SB-1"
            rightElement={
              <div className="bg-primary-color-P12 p-[6px] flex items-center rounded-[16px]">
                <span className="px-[16px]">Edit information</span>
                <div className="bg-secondary-color-S11 rounded-[10px] p-[8px]">
                  <ChevronDownMediumPlusIcon fillcolor={"fill-primary-color-P1"}/>
                </div>
              </div>
            }
          />
          <SectionContent>
          <div className="space-y-4">
            {/* Add Experience Button */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={`${getInputStatusBorder(
                  errors,
                  careerExperience,
                  "careerExperience"
                )}`}
              >
                <div className="flex items-center bg-tertiary-color-SC6 rounded-[16px] p-[6px] justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-[8px] rounded-[10px] bg-primary-color-P12">
                      <ExperienceBuildingIcon fillColor={"fill-tertiary-color-SC5"} />
                    </div>
                    <div>
                      <span className="ST-3 text-primary-color-P12">
                        Add an experience
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Add experience"
                    className=""
                    onClick={handleAddExperience}
                  >
                    <div className="p-[8px] rounded-[10px] bg-primary-color-P12 hover:bg-secondary-color-S8 transition-colors">
                      <PlusIcon fillColor="fill-tertiary-color-SC5" />
                    </div>
                  </button>
                </div>
              </InputLeftStickStatus>
            </div>

            {/* Experience Items */}
            {careerExperience?.map((experience, index) => (
              <FormInputsBox
                firstInputPlaceholder={"Example: University Of Somewhere"}
                handleDelete={handleDeleteExperience}
                array={"careerExperience"}
                key={experience.id}
                item={experience}
                control={control}
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

export default Experience;
