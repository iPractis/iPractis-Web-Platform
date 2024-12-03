import SectionHeader from "../Globals/SectionHeader";
import Form from "./Form";

// Icons && images
import sparkle from "@/public/icons/sparkle.png";

export const SupportRequest = () => {
  return (
    <section className="container-page-v2">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Heading Title */}
        <div className="p-4">
          <SectionHeader
            descriptionText="We are sorry to see you here, we hope your problem will be resolved soon."
            titleClassName="MT-SB-1"
            titleText="Account support service"
            iconClassName="w-[20px]"
            iconAlt={"Sparkle Icon"}
            iconSrc={sparkle}
          />
        </div>

        <Form />
      </div>
    </section>
  );
};
