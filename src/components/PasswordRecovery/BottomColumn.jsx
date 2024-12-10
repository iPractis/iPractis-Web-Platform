import SectionHeader from "../Globals/SectionHeader";
import { PadLockUserIcon } from "../Icons";
import Form from "./Form";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Please enter your email address to receive a password recovery link.`}
        titleText={`Request password changes`}
        descriptionClassName="mt-1"
        titleIcon={<PadLockUserIcon />}
        titleClassName="MT-SB-1"
      />

      <Form />
    </div>
  );
};

export default BottomColumn;
