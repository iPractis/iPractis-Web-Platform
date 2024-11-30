import SectionHeader from "../../Globals/SectionHeader";

// Images && icons
import womanWorking from "@/public/images/working-woman.jpg";
import twoUsers from "@/public/icons/2-users.png";
import library from "@/public/icons/library.png";
import sparkle from "@/public/icons/sparkle.png";
import Image from "next/image";

const MeetOurServices = () => {
  return (
    <main className="bg-primary-color-P11">
      <div className="container-page-v1 md:py-[60px] py-10">
        <SectionHeader
          iconSrc={sparkle}
          iconClassName="w-[20px]"
          iconAlt={"Sparkle Icon"}
          titleText="Meet our services"
          descriptionText="Start learning today"
        />
        
        <article className="flex flex-col-reverse md:flex-row sm:gap-4 gap-[30px] mt-[30px]">
          <div className="flex-1">
            <div className="flex flex-col h-full sm:gap-4 gap-[30px] justify-between">
              <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
                <Image
                  alt={"2 Users Icon"}
                  className="w-16 mx-auto"
                  src={twoUsers}
                />

                <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
                  Dedicated lessons
                </h2>

                <p className="text-primary-color-P6 ST-3">
                  Find teachers from all over the world sharing their languages,
                  dialects, and cultures.
                </p>
              </div>

              <div className="bg-primary-color-P12 flex-1 text-center rounded-[20px] py-8 px-4">
                <Image
                  alt={"Icon library"}
                  className="w-16 mx-auto"
                  src={library}
                />

                <h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
                  Library access
                </h2>
                <p className="text-primary-color-P6 ST-3">
                  Find teachers from all over the world sharing their languages,
                  dialects, and cultures.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-[20%]">
            <Image
              alt="Woman Working"
              className="w-full h-full object-cover rounded-[20px]"
              src={womanWorking}
            />{" "}
          </div>
        </article>
      </div>
    </main>
  );
};

export default MeetOurServices;
