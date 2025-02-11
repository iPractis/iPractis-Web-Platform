import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import IndividualEducation from "./IndividualEducation";
import SectionHeader from "../../Globals/SectionHeader";

// Icons
import { AddBoxBiggerIcon, GraduationCapIcon } from "../../Icons";

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
          "flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
        }
        titleText="Education"
        titleClassName="MT-SB-1"
      >
        <button
          className={`${
            educationError ? "form-input-error" : "btn-tertiary"
          } btn flex gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
          onClick={handleAddEducation}
          type="button"
        >
          <span className="MT-1 px-1.5">Add educational experience</span>{" "}
          <AddBoxBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
        </button>
      </SectionHeader>

      <div className={educations?.length !== 0 && "mb-8"}>
        {/* We do this because we want error to change of position (if it's a different error) */}
        {educationError ===
          "Invalid submission --- At least one education is required." && (
          <ErrorZodResponse errors={errors} fieldName={"education"} />
        )}
      </div>

      <WhiteSpaceWrapper className={"md:px-8 p-0"}>
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
