import SectionHeader from "@/src/components/Globals/SectionHeader";
import Form from "./Form";

// Images && icons
import lock from "@/public/icons/lock.png";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Please enter your new password to access your account.`}
        titleText={`Make a new password`}
        descriptionClassName="mt-1"
        iconAlt={"Lock Icon"}
        iconClassName="w-[16px]"
        titleClassName="MT-SB-1"
        iconSrc={lock}
      />

      <Form />
    </div>
  );
};

export default BottomColumn;
