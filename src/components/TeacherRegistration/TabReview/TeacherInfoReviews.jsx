import Image from "next/image";
import SectionHeader from "../../Shared/SectionHeader";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";

// Icons && images
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import { CalendarIcon, StarIcon } from "../../Icons";

const TeacherInfoReviews = () => {
  return (
    <article className="my-5">
      <SectionHeader
        titleIcon={<StarIcon fillColor={"fill-primary-color-P1 "} />}
        wrapperSectionHeaderClassName="py-2 px-4 mb-5"
        titleText={"Review"}
      />

      <div className="flex items-center justify-between my-5 text-primary-color-P1">
        <div className="flex items-center gap-4">
          <h3 className="flex items-center gap-1.5 ST-SB-4">
            <CalendarIcon fillColor={"fill-primary-color-P1"} />
            25 Reviews
          </h3>

          <div className="flex gap-[5px] my-4">
            <StarIcon fillColor={"fill-primary-color-P1"} />
            <StarIcon fillColor={"fill-primary-color-P1"} />
            <StarIcon fillColor={"fill-primary-color-P1"} />
            <StarIcon fillColor={"fill-primary-color-P1"} />
            <StarIcon fillColor={"fill-primary-color-P1"} />
          </div>

          <h3 className="ST-SB-4">5.0</h3>
        </div>

        <div>
          <h3 className="ST-3">X Student satisfied</h3>
        </div>
      </div>

      <WhiteSpaceWrapper className={"bg-primary-color-P11"}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <Image
                alt={"Tutor Image"}
                className="w-[46px] rounded-[10px]"
                src={tutorImagePreview || null}
              />
              <div className="absolute right-1 bottom-1 rounded-full w-2 h-2 bg-quinary-color-VS5"></div>
            </div>

            <div>
              <h2 className="MT-SB-1 text-primary-color-P1">Daria</h2>
              <p className="ST-2 text-primary-color-P4">
                6 Lessons with the teacher
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <p className="ST-4 text-primary-color-P4">October 19, 2024</p>
            <CalendarIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>

        <div className="flex gap-[5px] my-4">
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
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
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <Image
                alt={"Tutor Image"}
                className="w-[46px] rounded-[10px]"
                src={tutorImagePreview || null}
              />
              <div className="absolute right-1 bottom-1 rounded-full w-2 h-2 bg-quinary-color-VS5"></div>
            </div>

            <div>
              <h2 className="MT-SB-1 text-primary-color-P1">Daria</h2>
              <p className="ST-2 text-primary-color-P4">
                6 Lessons with the teacher
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <p className="ST-4 text-primary-color-P4">October 19, 2024</p>
            <CalendarIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>

        <div className="flex gap-[5px] my-4">
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
          <StarIcon fillColor={"fill-quaternary-color-A5"} />
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

export default TeacherInfoReviews;
