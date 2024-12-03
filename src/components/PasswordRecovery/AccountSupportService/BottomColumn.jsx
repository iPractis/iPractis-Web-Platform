import SectionHeader from "../../Globals/SectionHeader";
import Form from "./Form";

// Images && icons
import lockedUser from "@/public/icons/locked-user.png";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Please enter your email address to receive a password recovery link.`}
        titleText={`Request password changes`}
        descriptionClassName="mt-1"
        iconAlt={"Locked User Icon"}
        iconClassName="w-[19px]"
        titleClassName="MT-SB-1"
        iconSrc={lockedUser}
      />

      <Form />
    </div>
  );
};

export default BottomColumn;
