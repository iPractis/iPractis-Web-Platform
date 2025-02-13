import SectionHeader from "../../Shared/SectionHeader";
import PlatformButton from "../../Shared/PlatformButton";
import { CheckedShieldIcon } from "../../Icons";

// Images && icons
import microsoftStore from "@/public/icons/microsoft.png";
import googlePlay from "@/public/icons/google-play.png";
import apple from "@/public/icons/apple.png";

const PlatformExperience = () => {
  return (
    <section className="bg-primary-color-P1">
      <div className="container-page-v1 md:py-[60px] py-10">
        <SectionHeader
          descriptionText="Our platform provides a secure, monitored space with verified tutors, ensuring a safe and supportive learning experience for all."
          titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P12"} />}
          descriptionClassName="mt-1.5 text-primary-color-P12"
          titleClassName="MT-SB-2 text-primary-color-P12"
          titleText="Cross platform experience"
        />

        <div className="flex flex-wrap items-center justify-center gap-4 mt-[30px]">
          <div className="lg:min-w-[312px] min-w-full">
            <PlatformButton
              platformStoreLink={"https://www.apple.com/"}
              platformStoreName={"Apple Play"}
              platformStoreSrc={apple}
              platformStoreAlt={"Apple Icon"}
            />
          </div>

          <div className="lg:min-w-[312px] min-w-full">
            {" "}
            <PlatformButton
              platformStoreLink={"https://play.google.com/store/games"}
              platformStoreName={"Google play"}
              platformStoreSrc={googlePlay}
              platformStoreAlt={"Google Play Icon"}
            />
          </div>

          <div className="lg:min-w-[312px] min-w-full">
            <PlatformButton
              platformStoreLink={"https://www.microsoft.com/en-us/store/b/pc"}
              platformStoreName={"Microsoft Store"}
              platformStoreSrc={microsoftStore}
              platformStoreAlt={"Microsoft Store Icon"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformExperience;
