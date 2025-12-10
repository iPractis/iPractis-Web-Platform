import { subjectsAndTutors } from "@/src/data/dataHome";
import TutorCard from "./TutorCard";
import ActionButtonRightIcon from "../../Shared/ActionButtonRightIcon";

const TutorCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[32px]">
      {subjectsAndTutors?.map((subjectAndTutor, index) => {
        return <TutorCard subjectAndTutor={subjectAndTutor} key={index} />;
      })}

      <div className="bg-secondary-color-S11 h-full p-5 rounded-2xl">
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
          <ActionButtonRightIcon
            className={"w-[271px]"}
            description={"See more"}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorCards;
