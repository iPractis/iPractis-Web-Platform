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
import { Select } from "@nextui-org/react";

// Icons
import { NotebookOpenedIconBigger, OfficeIcon } from "../../Icons";

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
          />
          <SectionContent>
            <InputLeftStickStatus
              inputBarStatusClassName={`${getInputStatusBorder(
                errors,
                careerExperience,
                "careerExperience"
              )}`}
            >
              <div className="relative">
                <Select
                  name="addExperience"
                  selectedKeys={[]}
                  onChange={() => {}} // This won't be used
                  labelPlacement="outside"
                  placeholder="Add an experience"
                  selectorIcon={<span></span>}
                  startContent={
                    <InputBGWrapperIcon>
                      <OfficeIcon fillcolor={"black"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    trigger: [
                      "!bg-black rounded-2xl p-1.5 h-auto border-0 shadow-none pr-12", // Added right padding for button
                      error?.message && "form-input-error",
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
                  aria-label="Add experience"
                  className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none"
                  onClick={handleAddExperience}
                >
                  <InputBGWrapperIcon className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1" role="img" aria-label="Add experience">
                      <title>Add experience</title>
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

            <SplitDynamicErrorZod message={error?.message} />

            <div>
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
          </SectionContent>
        </SectionWrapper>
      )}
    />
  );
};

export default Experience;
