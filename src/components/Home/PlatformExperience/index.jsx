import Link from "next/link";
import Image from "next/image";
import { AppleSmallIcon, CheckedShieldIcon, GoogleSmallIcon, PlayIcon } from "../../Icons";

// Images && icons
import googlePlay from "@/public/icons/google-play.png";
import womanWorking from "@/public/images/working-woman.jpg";
import IconHeader from "../../Shared/IconHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";

const StoreCard = ({ href, icon, storeLabel, ctaLabel }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-[#F8F7F5] rounded-[32px] w-[368px] h-[180px] flex flex-col items-end p-8 gap-5 transition-transform duration-200 hover:-translate-y-1"
  >
    <div className="flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-4 self-start">
        <span className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center">
          {icon}
        </span>

        <div className="flex flex-col text-left">
          <span className="text-[11.2px] leading-[17px] font-medium text-black">Available on</span>
          <span className="text-[16px] leading-6 font-medium text-black">{ctaLabel}</span>
        </div>
      </div>

      <span className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center self-end">
        <PlayIcon width={20} height={20} fillColor="fill-black" ariaLabel={`Open ${storeLabel}`} />
      </span>
    </div>
  </Link>
);

const PlatformExperience = () => {
  return (
        <SectionWrapper className={"w-[1000px] mx-auto"}>
          <IconHeader
            icon={<CheckedShieldIcon fillcolor={"fill-primary-color-P1"} />}
            title="Cross platform experience"
            description="From school support to professional skill improvement, find lessons that fit your needs and learning style."
            className="w-[calc(100%+160px)] md:ml-[-65px]"
          />

          <SectionContent className="w-full">
            <article className="flex flex-col lg:flex-row gap-[32px] items-center lg:items-start">
              <div className="flex flex-col justify-between gap-[32px]">
                <StoreCard
                  href="https://www.apple.com/app-store/"
                  icon={<AppleSmallIcon />}
                  storeLabel="App Store"
                  ctaLabel="Apple Store"
                />

                <StoreCard
                  href="https://play.google.com/store/games"
                  icon={<GoogleSmallIcon />}
                  storeLabel="Google Play"
                  ctaLabel="Google Play"
                />
              </div>

              <div className="h-full">
                <Image
                  alt="Cross platform preview"
                  className="w-[600px] h-[392px] object-cover rounded-[32px]"
                  src={womanWorking}
                />
              </div>
            </article>
          </SectionContent>
        </SectionWrapper>
  );
};

export default PlatformExperience;
