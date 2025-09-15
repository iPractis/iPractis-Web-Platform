import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import { CalendarIcon, UserTieIcon } from "../../Icons";

const TeacherInfoExperience = ({ draftData }) => {
  const experiences = draftData?.careerExperience || [];

  return (
    <article className="my-5">
      <SectionHeader
        titleIcon={<UserTieIcon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleText={"Experience"}
      />

      {experiences.length === 0 ? (
        <p className="text-primary-color-P4 ST-4">No experience added yet.</p>
      ) : (
        experiences.map((exp, idx) => (
          <WhiteSpaceWrapper
            key={idx}
            className={"bg-primary-color-P11 mt-5 first:mt-0"}
          >
            <div className="flex flex-col md:flex-row items-start justify-between mb-4">
              <div>
                <h3 className="MT-SB-1 text-primary-color-P1">
                  {exp.company || "Untitled Experience"}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 md:mt-0 mt-5">
                <p className="ST-4 text-primary-color-P4">
                  From {exp.from} to {exp.to}
                </p>
                <CalendarIcon fillColor={"fill-primary-color-P1"} />
              </div>
            </div>

            <ul className="list-disc pl-5 ST-4 text-primary-color-P4">
              <li>{exp.description}</li>
            </ul>
          </WhiteSpaceWrapper>
        ))
      )}
    </article>
  );
};

export default TeacherInfoExperience;
