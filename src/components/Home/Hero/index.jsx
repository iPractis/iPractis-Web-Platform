import AveragePricesLanguaguesCarousel from "./AveragePricesLanguaguesCarousel";

import hero from "@/public/images/home-hero.jpg";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="container-page-v1 md:my-[60px] my-10">
      {/* Hero */}
      <div className="flex flex-col md:flex-row md:gap-[55px]">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <h1 className="text-primary-color-P1 md:LT-SB-2 LT-SB-1">
              Learn any subject with <span className="block">top-rated tutor</span>
            </h1>

            <div className="md:hidden block max-w-full mx-auto my-10">
              <Image
                className="w-[425px] h-full"
                alt="Hero Image"
                src={hero}
                priority
              />
            </div>

            <ul className="MT-SB-1 list-disc text-primary-color-P6 ps-5 space-y-2">
              <li>
                <p>1 : 1 Online Lessons with a real matched tutors</p>
              </li>
              <li>
                <p>Flexible scheduling and rescheduling</p>
              </li>
              <li>
                <p>Access to a library</p>
              </li>
            </ul>

            <Link
              className="btn btn-primary py-3 px-4 MT-SB-1 rounded-2xl md:mt-0 mt-10"
              type="button"
              href="/dashboard"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="md:block hidden max-w-md mx-auto">
            <Image
              className="w-full h-full"
              alt="Hero Image"
              src={hero}
              priority
            />
          </div>
        </div>
      </div>

      {/* Carousel of Languages */}
      <AveragePricesLanguaguesCarousel />
    </section>
  );
};

export default Hero;
