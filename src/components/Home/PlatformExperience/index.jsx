import SectionHeader from "../../Globals/SectionHeader";
import PlatformButton from "../../Globals/PlatformButton";

// Images && icons
import checkedShield from "@/public/icons/checked-shield-2.png";
import microsoftStore from "@/public/icons/microsoft.png";
import googlePlay from "@/public/icons/google-play.png";
import apple from "@/public/icons/apple.png";

const PlatformExperience = () => {
  return (
    <section className="bg-primary-color-P1">
      <div className="container-page-v1 md:py-[60px] py-10">
        <SectionHeader
          iconSrc={checkedShield}
          iconClassName="w-4"
          iconAlt={"Checked Shield Icon"}
          titleText="Cross platform experience"
          descriptionText="Our platform provides a secure, monitored space with verified tutors, ensuring a safe and supportive learning experience for all."
          theme="dark"
        />

        <div className="flex flex-wrap items-center justify-center gap-4 mt-[30px]">
          <div className="min-[670px]:min-w-[17.3rem] min-w-full">
            <PlatformButton
              platformStoreLink={"https://www.apple.com/"}
              platformStoreName={"Apple Play"}
              platformStoreSrc={apple}
              platformStoreAlt={"Apple Icon"}
            />
          </div>

          <div className="min-[670px]:min-w-[17.3rem] min-w-full">
            {" "}
            <PlatformButton
              platformStoreLink={"https://play.google.com/store/games"}
              platformStoreName={"Google play"}
              platformStoreSrc={googlePlay}
              platformStoreAlt={"Google Play Icon"}
            />
          </div>

          <div className="min-[670px]:min-w-[17.3rem] min-w-full">
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
