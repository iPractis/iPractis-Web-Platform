import SectionHeader from "../../Shared/SectionHeader";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import { TagIcon } from "../../Icons";

const TeacherInfoSpecialties = ({draftData}) => {
  return (
    <article className="my-5">
      <SectionHeader
        titleIcon={<TagIcon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleText={"Specialties"}
      />

     {draftData.subSubject.map((data,index)=>{
      return  <WhiteSpaceWrapper className={"bg-primary-color-P11 mt-5"} key={index}>
        <h3 className="MT-SB-1 text-primary-color-P1 mb-5">{data.selected}</h3>
        <p className="ST-4 text-primary-color-P4">
          {data.description}
        </p>
      </WhiteSpaceWrapper>
     })}
    </article>
  );
};

export default TeacherInfoSpecialties;
