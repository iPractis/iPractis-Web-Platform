import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { subjectsAndTutors } from "@/src/data/dataHome";
import { ChevronRightBiggerIcon } from "../../Icons";
import TutorCard from "./TutorCard";

const TutorCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 gap-[30px]">
      {subjectsAndTutors?.map((subjectAndTutor, index) => {
        return <TutorCard subjectAndTutor={subjectAndTutor} key={index} />;
      })}

      <div className="bg-primary-color-P12 h-full p-5 rounded-2xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="MT-SB-3 text-primary-color-P1">
              Discover more teachers
            </h3>

            <p className="ST-4 text-primary-color-P4 mt-5">
              Search through 1000+ qualified teachers and select the perfect fit
              based on your target subject, goals and budget.
            </p>
          </div>

          <div className="sm:mt-0 mt-36">
            <button
              className="btn btn-secondary flex justify-between items-center gap-2.5 p-1.5 ps-4 rounded-2xl w-full"
              type="button"
            >
              <span className="px-1.5">Discover more teachers</span>{" "}
              <InputBGWrapperIcon>
                <ChevronRightBiggerIcon fillcolor={"fill-tertiary-color-SC5"} />
              </InputBGWrapperIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCards;
