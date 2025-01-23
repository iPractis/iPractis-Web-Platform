import Image from "next/image";

// Images && icons
import book from "@/public/icons/book-opened-black.png";
import dollar from "@/public/icons/dollar-black.png";
import user from "@/public/icons/user-black.png";
import hat from "@/public/icons/hat-black.png";

const StepsToStartCareer = () => {
  return (
    <section>
      <div className="my-[50px]">
        <h3 className="text-primary-color-P1 MT-SB-3">
          Few steps only to start your career
        </h3>

        <p className="MT-SB-1 sm:text-primary-color-P6 text-primary-color-P8 mt-1.5">
          Kickstart your tutoring career with iPractis! Do the job you love and
          enjoy a competitive pay, flexible hours, and the opportunity to make a
          real impact.
        </p>
      </div>

      {/* From 640px to up - Desktop */}
      <article className="sm:block hidden">
        <div className="grid gap-[33px] grid-cols-4 relative">
          <div className="absolute top-6 -z-10 w-full bg-primary-color-P1 h-[4px]"></div>

          <div>
            <Image alt="Book Icon" className="w-[50px]" src={book} />

            <div className="mt-[15px]">
              <h3 className="MT-SB-1 text-primary-color-P1">Pick a subject</h3>
              <p className="ST-4 text-primary-color-P6">
                Choose a subject you{" "}
                <span className="lg:block inline">master</span>
              </p>
            </div>
          </div>

          <div>
            <Image alt="User Icon" className="w-[50px]" src={user} />

            <div className="mt-[15px]">
              <h3 className="MT-SB-1 text-primary-color-P1">
                Fill up your profile
              </h3>
              <p className="ST-4 text-primary-color-P6">
                Set up your tutor profile in{" "}
                <span className="lg:block inline">a few steps.</span>
              </p>
            </div>
          </div>

          <div>
            <Image alt="Hat Icon" className="w-[50px]" src={hat} />

            <div className="mt-[15px]">
              <h3 className="MT-SB-1 text-primary-color-P1">Get approved</h3>
              <p className="ST-4 text-primary-color-P6">
                Match requirement to get{" "}
                <span className="lg:block inline">approved.</span>
              </p>
            </div>
          </div>

          <div>
            <div className="flex gap-[15px]">
              <Image alt="Dollar Icon" className="w-[50px]" src={dollar} />

              <button
                className="btn btn-primary w-full MT-SB-2 rounded-[10px] p-2.5"
                type="button"
              >
                Start!
              </button>
            </div>

            <div className="mt-[15px]">
              <h3 className="MT-SB-1 text-primary-color-P1">
                Start a new career life
              </h3>
              <p className="ST-4 text-primary-color-P6">
                Work from anywhere at{" "}
                <span className="lg:block inline">your own path.</span>
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* From 640px to bottom - Responsive */}
      <article className="sm:hidden block space-y-[33px]">
        <div className="flex items-center gap-3">
          <div>
            <Image alt="Book Icon" className="w-[50px]" src={book} />
          </div>

          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">Pick a subject</h3>
            <p className="ST-4 text-primary-color-P6">
              Choose a subject you{" "}
              <span className="lg:block inline">master</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Image alt="User Icon" className="w-[50px]" src={user} />
          </div>
          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">
              Fill up your profile
            </h3>
            <p className="ST-4 text-primary-color-P6">
              Set up your tutor profile in a few steps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Image alt="Hat Icon" className="w-[50px]" src={hat} />
          </div>
          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">Get approved</h3>
            <p className="ST-4 text-primary-color-P6">
              Match requirement to get approved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Image alt="Dollar Icon" className="w-[50px]" src={dollar} />
          </div>
          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">
              Start a new career life
            </h3>
            <p className="ST-4 text-primary-color-P6">
              Work from anywhere at your own path.
            </p>
          </div>
        </div>

        <button className="btn btn-primary w-full MT-SB-2 rounded-[10px] p-2.5" type="button">
          Start!
        </button>
      </article>
    </section>
  );
};

export default StepsToStartCareer;
