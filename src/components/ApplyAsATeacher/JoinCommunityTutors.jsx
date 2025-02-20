import header from "@/public/images/apply-as-teacher-hero.jpg";
import Image from "next/image";
import Link from "next/link";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { ChevronRightBiggerIcon } from "../Icons";

const JoinCommunityTutors = () => {
  return (
    <header className="flex flex-col lg:flex-row justify-between">
      <div className="flex-[20%]">
        <div className="flex flex-col justify-between lg:items-start items-center h-full">
          <h1 className="LT-SB-2 text-primary-color-P1">
            Join our top rated <span className="block">community tutors</span>
          </h1>

          <ul className="list-disc text-primary-color-P6 ps-5 space-y-1 lg:mt-0 mt-[25px]">
            <li>
              <p className="MT-SB-1">Work at your suitable hours</p>
            </li>
            <li>
              <p className="MT-SB-1">Work online from anywhere</p>
            </li>
            <li>
              <p className="MT-SB-1">Do the job that make you feel free</p>
            </li>
          </ul>

          {/* From 1024px to bottom */}
          <div className="lg:hidden block flex-1">
            <Image
              alt="Header Image"
              className="w-[372px] mx-auto mt-[50px]"
              src={header}
            />
          </div>

          <Link
            href={"#"}
            className="btn btn-primary lg:w-[390px] w-full sm:p-1.5 p-2.5 rounded-xl sm:MT-SB-1 MT-SB-2 lg:mt-0 mt-[50px] flex items-center justify-center"
          >
            <span className="flex-1">Apply now!</span>

            <InputBGWrapperIcon className={"sm:block hidden"}>
              <ChevronRightBiggerIcon fillColor={"fill-primary-color-P1"} />
            </InputBGWrapperIcon>
          </Link>
        </div>
      </div>

      {/* From 640px to top */}
      <div className="lg:block hidden flex-1">
        <Image alt="Header Image" className="w-[372px] ms-auto" src={header} />
      </div>
    </header>
  );
};

export default JoinCommunityTutors;
