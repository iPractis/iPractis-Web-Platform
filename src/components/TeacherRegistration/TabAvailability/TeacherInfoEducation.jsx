import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";

// Icons
import { CalendarIcon, GraduationCapIcon } from "../../Icons";

const TeacherInfoEducation = () => {
  return (
    <article className="my-5">
      <SectionHeader
        titleIcon={<GraduationCapIcon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleText={"Education"}
      />

      <WhiteSpaceWrapper className={"bg-primary-color-P11"}>
        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">
              Associate Degree in General Studies
            </h3>
          </div>

          <div className="flex items-center gap-2.5 md:mt-0 mt-5">
            <p className="ST-4 text-primary-color-P4 ">From 2018 to 2021</p>
            <CalendarIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>

        <ul className="list-disc pl-5 ST-4 text-primary-color-P4">
          <li>
            Help students improve image qualities by teaching them the secrets
            of professionals.
          </li>
          <li>
            Teach how to develop creative skill to produce professional level
            digital compositing art.
          </li>
          <li>
            Teach students how to create commercial level digital compositing.
          </li>
        </ul>
      </WhiteSpaceWrapper>

      <WhiteSpaceWrapper className={"bg-primary-color-P11 mt-5"}>
        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">
              Associate Degree in General Studies
            </h3>
          </div>

          <div className="flex items-center gap-2.5 md:mt-0 mt-5">
            <p className="ST-4 text-primary-color-P4 ">From 2018 to 2021</p>
            <CalendarIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>

        <ul className="list-disc pl-5 ST-4 text-primary-color-P4">
          <li>
            Help students improve image qualities by teaching them the secrets
            of professionals.
          </li>
          <li>
            Teach how to develop creative skill to produce professional level
            digital compositing art.
          </li>
          <li>
            Teach students how to create commercial level digital compositing.
          </li>
        </ul>
      </WhiteSpaceWrapper>
    </article>
  );
};

export default TeacherInfoEducation;
