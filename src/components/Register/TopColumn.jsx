import SectionHeader from "../Globals/SectionHeader";
import Form from "./Form";

// Images && icons
import sparkle from "@/public/icons/sparkle.png";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="Start using iPractis by signing up quickly."
          titleText="Create an account"
          titleClassName="MT-SB-1"
          iconClassName="w-[20px]"
          iconAlt={"Sparkle Icon"}
          iconSrc={sparkle}
        />
      </div>

      {/* Sign Up Section */}
      <Form />
    </article>
  );
};

export default TopColumn;
