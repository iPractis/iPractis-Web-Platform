import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import FormInputsBox from "./FormInputsBox";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { Controller, useFieldArray } from "react-hook-form";
import { Select } from "@nextui-org/react";

// Icons
import { AddBoxBiggerIcon, UserTieIcon } from "../../Icons";

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
        <div>
          <SectionHeader
            descriptionText="Tell us about your career and experience"
            wrapperSectionHeaderClassName="relative bg-[#F8F7F5] lg:p-4 p-8 lg:rounded-[30px] rounded-[32px] lg:max-w-[1000px] max-w-[398px] lg:h-[112px] h-[122px] flex items-center justify-between my-16"
            titleIcon={
              <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
                <UserTieIcon fillColor={"fill-primary-color-P1"} />
              </div>
            }
            titleText="Professional background"
            titleClassName="MT-SB-1 lg:ml-[80px] md:ml-[60px] ml-[80px]"
            descriptionClassName="lg:ml-[80px] md:ml-[60px] ml-[80px]"
          />

          <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:-mt-[24px] md:-mt-[24px] -mt-[24px]">
            <Select
              name="addExperience"
              selectedKeys={[]}
              onChange={() => {}} // This won't be used
              labelPlacement="outside"
              placeholder="Add professional experience"
              selectorIcon={<span></span>}
              startContent={
                <InputBGWrapperIcon>
                  <UserTieIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon 
                  className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px] cursor-pointer"
                  onClick={handleAddExperience}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1">
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </InputBGWrapperIcon>
              }
              classNames={{
                trigger: [
                  "!bg-blue-500 rounded-2xl p-1.5 h-auto border-0 shadow-none",
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
          </div>

          <SplitDynamicErrorZod message={error?.message} />

          <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:mt-[32px] md:mt-[32px] mt-[32px]">
            {careerExperience?.map((experience, index) => (
              <FormInputsBox
                firstInputPlaceholder={"Example: Google"}
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
        </div>
      )}
    />
  );
};

export default Experience;
