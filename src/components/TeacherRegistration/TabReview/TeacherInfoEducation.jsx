import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import { CalendarIcon, GraduationCapIcon, CheckedShieldIcon } from "../../Icons";

const TeacherInfoEducation = ({ draftData }) => {
  const educationList = draftData?.education || [];

  return (
    <article className="my-5">
      <SectionHeader
        titleIcon={<GraduationCapIcon fillcolor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleText={"Education"}
      />

      {educationList.length > 0 && educationList.map((edu, idx) => (
        <WhiteSpaceWrapper
          key={idx}
          className={"bg-[#f8f7f5] mt-5 first:mt-0"}
        >
          <div className="flex flex-col md:flex-row items-start justify-between mb-4">
            <div className="bg-white rounded-[16px] w-[269px] h-[48px] px-4 py-[14px] flex items-center">
              <h3 className="MT-SB-1 text-primary-color-P1 whitespace-nowrap overflow-hidden text-ellipsis">
                {edu.company || "Unnamed Institution"}
              </h3>
            </div>

            <div className="flex items-center gap-4 md:mt-0 mt-5">
              <div className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-[16px]">
                <span className="w-[36px] h-[36px] rounded-[10px] p-2 bg-[#f8f7f5] opacity-80 flex items-center justify-center">
                  <CalendarIcon fillcolor={"fill-primary-color-P1"} />
                </span>
                <p className="ST-4 text-primary-color-P4">From {edu.from} to {edu.to}</p>
              </div>
              <span className="w-[48px] h-[48px] bg-white rounded-[16px] p-3 flex items-center justify-center">
                <CheckedShieldIcon fillcolor={"fill-primary-color-P1"} />
              </span>
            </div>
          </div>

          <ul className="list-disc pl-5 ST-4 text-primary-color-P4">
            <li>{edu.description}</li>
          </ul>
        </WhiteSpaceWrapper>
      ))}
    </article>
  );
};

export default TeacherInfoEducation;
