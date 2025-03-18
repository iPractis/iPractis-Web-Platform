import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import FormInputsBox from "./FormInputsBox";

// External imports
import { Controller, useFieldArray } from "react-hook-form";

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
            titleIcon={<UserTieIcon fillColor={"fill-primary-color-P1"} />}
            wrapperSectionHeaderClassName={
              "flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
            }
            titleText="Experience"
            titleClassName="MT-SB-1"
          >
            <button
              className={`${
                error?.message ? "form-input-error" : "btn-tertiary"
              } btn flex gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
              onClick={handleAddExperience}
              type="button"
            >
              <span className="MT-1 px-1.5">Add professional experience</span>{" "}
              <AddBoxBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
            </button>
          </SectionHeader>

          <SplitDynamicErrorZod message={error?.message} />

          <WhiteSpaceWrapper className={"lg:px-8 p-0"}>
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
          </WhiteSpaceWrapper>
        </div>
      )}
    />
  );
};

export default Experience;
