import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import SectionHeader from "../../Shared/SectionHeader";
import FormInputsBox from "./FormInputsBox";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

// External imports
import { Controller, useFieldArray } from "react-hook-form";
import { Select } from "@nextui-org/react";

// Icons
import { NotebookOpenedIconBigger, PersonWithTieIcon } from "../../Icons";

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
        <div>
          <SectionHeader
            descriptionText="Tell us about your education path."
            wrapperSectionHeaderClassName="relative bg-[#F8F7F5] lg:p-4 p-8 lg:rounded-[30px] rounded-[32px] lg:max-w-[1000px] max-w-[398px] lg:h-[112px] h-[122px] flex items-center justify-between my-16"
            titleIcon={
              <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
                <NotebookOpenedIconBigger fillcolor={"fill-primary-color-P1"} />
              </div>
            }
            titleText="Educational background"
            titleClassName="MT-SB-1 lg:ml-[80px] md:ml-[60px] ml-[80px]"
            descriptionClassName="lg:ml-[80px] md:ml-[60px] ml-[80px]"
          />

          <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:-mt-[24px] md:-mt-[24px] -mt-[24px]">
            <InputLeftStickStatus
              inputBarStatusClassName={`${getInputStatusBorder(
                errors,
                education,
                "education"
              )}`}
            >
              <div className="relative">
                <Select
                  name="addEducation"
                  selectedKeys={[]}
                  onChange={() => {}} // This won't be used
                  labelPlacement="outside"
                  placeholder="Add a school curriculum"
                  selectorIcon={<span></span>}
                  startContent={
                    <InputBGWrapperIcon>
                      <PersonWithTieIcon fillcolor={"fill-primary-color-P4"} />
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
                  aria-label="Add education"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none"
                  onClick={handleAddEducation}
                >
                  <InputBGWrapperIcon className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1" role="img" aria-label="Add education">
                      <title>Add education</title>
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

          <SplitDynamicErrorZod message={error?.message} />

          <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:mt-[32px] md:mt-[32px] mt-[32px]">
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
        </div>
      )}
    />
  );
};

export default Education;
