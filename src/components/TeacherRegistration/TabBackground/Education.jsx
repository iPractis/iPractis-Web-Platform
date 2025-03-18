import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import FormInputsBox from "./FormInputsBox";

// External imports
import { Controller, useFieldArray } from "react-hook-form";

// Icons
import { AddBoxBiggerIcon, GraduationCapIcon } from "../../Icons";

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
            titleIcon={
              <GraduationCapIcon fillColor={"fill-primary-color-P1"} />
            }
            wrapperSectionHeaderClassName={
              "flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
            }
            titleText="Education"
            titleClassName="MT-SB-1"
          >
            <button
              className={`${
                error?.message ? "form-input-error" : "btn-tertiary"
              } btn flex gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
              onClick={handleAddEducation}
              type="button"
            >
              <span className="MT-1 px-1.5">Add educational experience</span>{" "}
              <AddBoxBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
            </button>
          </SectionHeader>

          <SplitDynamicErrorZod message={error?.message} />

          <WhiteSpaceWrapper className={"lg:px-8 p-0"}>
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
          </WhiteSpaceWrapper>
        </div>
      )}
    />
  );
};

export default Education;
