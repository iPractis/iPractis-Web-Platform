import { subjectsAndTutors } from "@/src/data/dataHome";
import Link from "next/link";
import TutorCard from "./TutorCard";

const TutorCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 gap-[30px]">
      {subjectsAndTutors?.map((subjectAndTutor, index) => {
        return <TutorCard subjectAndTutor={subjectAndTutor} key={index} />;
      })}

      <div className="bg-primary-color-P12 h-[357px] p-5 rounded-2xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="MT-SB-3 text-primary-color-P1">
              Discover more <span className="sm:block inline">teachers</span>
            </h3>

            <p className="ST-4 text-primary-color-P4 mt-5">
              Search through 1000+ qualified teachers and select the perfect fit
              based on your target subject, goals and budget.
            </p>
          </div>

          <div>
            <Link
              href={"#"}
              className="btn btn-secondary MT-SB-1 rounded-2xl w-full px-4 py-3"
            >
              Discover more teachers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCards;
