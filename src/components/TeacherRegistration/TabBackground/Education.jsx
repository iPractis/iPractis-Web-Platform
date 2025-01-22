import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";

// Icons
import { AddBoxIcon, GraduationCapIcon } from "../../Icons";

import IndividualEducation from "./IndividualEducation";

const Education = ({ setEducations, educations }) => {
  // ADD EDUCATION
  const handleAddEducation = () => {
    const newEducation = {
      company: "",
      from: "",
      to: "",
      description: "",
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
        <button
          className="btn btn-septenary flex items-center justify-between w-full rounded-2xl px-4 py-2.5 mb-8"
          onClick={handleAddEducation}
          type="button"
        >
          <span className="MT-1 text-primary-color-P4">
            Add professional experience
          </span>{" "}
          <AddBoxIcon fillColor={"fill-primary-color-P4"} />
        </button>

        {educations?.map((education, index) => (
          <IndividualEducation
            key={index}
            index={index}
            education={education}
            handleUpdateEducation={handleUpdateEducation}
            handleDeleteEducation={handleDeleteEducation}
          />
        ))}
      </WhiteSpaceWrapper>
    </div>
  );
};

export default Education;
