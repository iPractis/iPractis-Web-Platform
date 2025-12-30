import { GraduationCapIcon, DollarSignIcon, NotebookOpenedIconBigger, UserIcon } from "../Icons/index";

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
          <div className="absolute top-6 -z-10 w-[80%] bg-primary-color-P1 h-[4px]"></div>

          <div>
            <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center">
              <NotebookOpenedIconBigger fillcolor="fill-primary-color-P12" />
            </div>

            <div className="mt-[15px]">
              <h3 className="MT-SB-1 text-primary-color-P1">Pick a subject</h3>
              <p className="ST-4 text-primary-color-P6">
                Choose a subject you{" "}
                <span className="lg:block inline">master</span>
              </p>
            </div>
          </div>

          <div>
            <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center">
              <UserIcon fillcolor="fill-primary-color-P12" />
            </div> 

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
            <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center">
              <GraduationCapIcon fillcolor="fill-primary-color-P12" />
            </div> 

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
            <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center shrink-0">
              <DollarSignIcon fillcolor="fill-primary-color-P12" />
            </div> 

              <button
                className="btn btn-primary w-full MT-SB-2 rounded-[16px] p-2.5"
                type="button"
              >
                Start !
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
          <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center shrink-0">
            <NotebookOpenedIconBigger fillcolor="fill-primary-color-P12" />
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
          <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center shrink-0">
            <UserIcon fillcolor="fill-primary-color-P12" />
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
          <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center shrink-0">
            <GraduationCapIcon fillcolor="fill-primary-color-P12" />
          </div>
          <div>
            <h3 className="MT-SB-1 text-primary-color-P1">Get approved</h3>
            <p className="ST-4 text-primary-color-P6">
              Match requirement to get approved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary-color-P1 w-[50px] h-[50px] rounded-[16px] flex items-center justify-center shrink-0">
            <DollarSignIcon fillcolor="fill-primary-color-P12" />
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

        <button className="btn btn-primary w-full MT-SB-2 rounded-[16px] p-2.5" type="button">
          Start !
        </button>
      </article>
    </section>
  );
};

export default StepsToStartCareer;
