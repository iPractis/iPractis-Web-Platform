import SectionHeader from "@/src/components/Globals/SectionHeader";

// Images && icons
import sparkle from "@/public/icons/sparkle.png";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="We are sorry to see you here, we hope your problem will be resolved soon."
          titleText="Account support service"
          titleClassName="MT-SB-1"
          iconClassName="w-[20px]"
          iconAlt={"Sparkle Icon"}
          iconSrc={sparkle}
        />
      </div>
    </article>
  );
};

export default TopColumn;
