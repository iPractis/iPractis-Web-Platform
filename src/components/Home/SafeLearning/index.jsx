import SectionHeader from "../../Globals/SectionHeader";

// Images && icons
import happyChildDesktop from "@/public/images/happy-child-desktop.jpg";
import happyChildResponsive from "@/public/images/happy-child-responsive.jpg";
import checkedShield from "@/public/icons/checked-shield.png";
import leftCamera from "@/public/icons/left-camera.png";
import Image from "next/image";

const SafeLearning = () => {
  return (
    <section className="container-page-v1 md:my-[60px] my-10">
      <SectionHeader
        iconSrc={checkedShield}
        iconClassName="w-[16px]"
        iconAlt={"Shield Checked Icon"}
        titleText="Safe Learning Environment"
        descriptionText="Our platform provides a secure, monitored space with verified tutors, ensuring a safe and supportive learning experience for all."
      />

      <article className="flex flex-col md:flex-row sm:gap-4 gap-[30px] mt-[30px]">
        <div className="flex-1">
          <div className="bg-primary-color-P11 flex-1 text-center rounded-[20px] py-[30px] px-4">
            <Image
              alt={"Icon Left Camera"}
              className="w-[41px] mx-auto"
              src={leftCamera}
            />

            <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
              Monitored Sessions
            </h2>

            <p className="text-primary-color-P6 ST-3">
              Tutors and lessons are monitored for quality and safety.
            </p>
          </div>
        </div>

        <div className="flex-[20%]">
          {/* From 768px to up */}
          <Image
            alt="Woman Working"
            className="md:block hidden w-full h-full object-cover rounded-[20px]"
            src={happyChildDesktop}
          />{" "}

          {/* From 768px to bottom */}
          <Image
            alt="Woman Working"
            className="md:hidden block w-full h-[202px] object-cover rounded-[20px]"
            src={happyChildResponsive}
          />{" "}
        </div>
      </article>
    </section>
  );
};

export default SafeLearning;
