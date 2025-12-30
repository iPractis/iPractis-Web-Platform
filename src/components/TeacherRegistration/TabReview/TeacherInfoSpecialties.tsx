import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import { CircleImportantIcon } from "../../Icons";

const TeacherInfoSpecialties = ({draftData}) => {
  return (
    <article className="my-[32px]">
      {/* Teacher's Specialties Header */}
      <div className="bg-primary-color-P12 rounded-[32px] p-4 mb-8 h-[48px] flex items-center gap-[10px] max-w-none w-[calc(100%+160px)] md:w-[calc(100%+120px)] sm:w-[calc(100%+48px)] ml-[-80px] md:ml-[-50px] sm:ml-[-20px]">
        {/* Icon container */}
        <div className="ml-[-36px] md:ml-[-24px] sm:ml-[-12px] w-[48px] h-[48px] rounded-[16px] bg-secondary-color-S11 flex items-center justify-center p-[14px]">
          <CircleImportantIcon fillcolor={"fill-primary-color-P1"} />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="MT-SB-1 text-primary-color-P1">Sub-topic specialties</h3>
          <p className="ST-3 text-primary-color-P4">Key areas of expertise and specialized knowledge the teacher brings to their instruction.</p>
        </div>
      </div>

      {draftData?.subSubject?.length > 0 && draftData?.subSubject?.map((data, idx) => (
        <WhiteSpaceWrapper key={idx} className="bg-secondary-color-S11 mt-5 rounded-[32px]">
          <h3 className="MT-SB-1 text-primary-color-P1 bg-primary-color-P12 mb-5 px-[16px] py-[14px] rounded-[16px]">
            {data.selected || 'n/a'}
          </h3>
          <p className="ST-4 text-primary-color-P4">
            {data.description || 'n/a'}
          </p>
        </WhiteSpaceWrapper>
      ))}
    </article>
  );
};

export default TeacherInfoSpecialties;
