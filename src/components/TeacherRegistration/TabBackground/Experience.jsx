import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import IndividualExperience from "./IndividualExperience";
import SectionHeader from "../../Globals/SectionHeader";

import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";

// Icons
import { AddBoxIcon, UserTieIcon } from "../../Icons";

const Experience = ({ setExperiences, experiences, errors }) => {
  const careerExperienceError = findInputErrorZod(
    errors,
    "careerExperience"
  )?.message;

  // ADD EXPERIENCE
  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      from: "",
      to: "",
      description: "",
    };

    setExperiences([...experiences, newExperience]);
  };

  // UPDATE EXPERIENCE
  const handleUpdateExperience = (index, updatedExperience) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? updatedExperience : exp
    );
    setExperiences(updatedExperiences);
  };

  // DELETE EXPERIENCE
  const handleDeleteExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  return (
    <div>
      <SectionHeader
        descriptionText="Tell us about your career and experience"
        titleIcon={<UserTieIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleText="Experience"
        titleClassName="MT-SB-1"
      />

      <WhiteSpaceWrapper className={"bg-primary-color-P12 pb-0 pt-[50px]"}>
        {/* To create a new Professional Experience */}
        <div className="mb-8">
          <button
            className={`${
              careerExperienceError ? "form-input-error" : "btn-septenary"
            } btn flex items-center justify-between w-full rounded-2xl px-4 py-2.5`}
            onClick={handleAddExperience}
            type="button"
          >
            <span className="MT-1 text-primary-color-P4">
              Add professional experience
            </span>{" "}
            <AddBoxIcon fillColor={"fill-primary-color-P4"} />
          </button>

          {/* We do this because we want error to change of position (if it's a different error) */}
          {careerExperienceError ===
            "Invalid submission --- At least one experience is required." && (
            <ErrorZodResponse errors={errors} fieldName={"careerExperience"} />
          )}
        </div>

        {experiences?.map((experience, index) => (
          <IndividualExperience
            handleUpdateExperience={handleUpdateExperience}
            handleDeleteExperience={handleDeleteExperience}
            experience={experience}
            errors={errors}
            index={index}
            key={index}
          />
        ))}
      </WhiteSpaceWrapper>
    </div>
  );
};

export default Experience;
