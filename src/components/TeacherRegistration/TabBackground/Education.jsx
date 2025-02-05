import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";

// Icons
import { AddBoxIcon, GraduationCapIcon } from "../../Icons";

import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import IndividualEducation from "./IndividualEducation";
import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";

const Education = ({ setEducations, educations, errors }) => {
  const educationError = findInputErrorZod(errors, "education")?.message;

  // ADD EDUCATION
  const handleAddEducation = () => {
    const newEducation = {
      company: "",
      from: "",
      to: "",
      description: "",
      index: educations?.length,
    };
    setEducations([...educations, newEducation]);
  };

  // UPDATE EDUCATION
  const handleUpdateEducation = (index, updatedEducation) => {
    const updatedEducations = educations.map((exp, i) =>
      i === index ? updatedEducation : exp
    );
    setEducations(updatedEducations);
  };

  // DELETE EDUCATION
  const handleDeleteEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

  return (
    <div>
      <SectionHeader
        descriptionText="Tell us about your education path."
        titleIcon={<GraduationCapIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleText="Education"
        titleClassName="MT-SB-1"
      />

      <WhiteSpaceWrapper className={"bg-primary-color-P12 pb-0 pt-[50px]"}>
        {/* To create a new Professional Experience */}
        <div className="mb-8">
          <button
            className={`${
              educationError ? "form-input-error" : "btn-septenary"
            } btn flex items-center justify-between w-full rounded-2xl px-4 py-2.5`}
            onClick={handleAddEducation}
            type="button"
          >
            <span className="MT-1 text-primary-color-P4">
              Add professional experience
            </span>{" "}
            <AddBoxIcon fillColor={"fill-primary-color-P4"} />
          </button>

          {/* We do this because we want error to change of position (if it's a different error) */}
          {educationError ===
            "Invalid submission --- At least one education is required." && (
            <ErrorZodResponse errors={errors} fieldName={"education"} />
          )}
        </div>

        {educations?.map((education, index) => (
          <IndividualEducation
            handleUpdateEducation={handleUpdateEducation}
            handleDeleteEducation={handleDeleteEducation}
            education={education}
            errors={errors}
            index={index}
            key={index}
          />
        ))}
      </WhiteSpaceWrapper>
    </div>
  );
};

export default Education;
