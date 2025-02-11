import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import IndividualExperience from "./IndividualExperience";
import SectionHeader from "../../Globals/SectionHeader";

import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";

// Icons
import { AddBGIcon, AddBoxBiggerIcon, AddBoxIcon, UserTieIcon } from "../../Icons";

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
      index: experiences?.length,
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
          "flex justify-between bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleText="Experience"
        titleClassName="MT-SB-1"
      >
        <button
          className={`${
            careerExperienceError ? "form-input-error" : "btn-tertiary"
          } btn flex gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
          onClick={handleAddExperience}
          type="button"
        >
          <span className="MT-1 px-1.5">
            Add professional experience
          </span>{" "}
          
          <AddBoxBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
        </button>
      </SectionHeader>

      <WhiteSpaceWrapper className={"px-8"}>
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
