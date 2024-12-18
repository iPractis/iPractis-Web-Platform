import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import { CheckedShieldIcon } from "../../Icons";

const IDVerification = () => {
  return (
    <WhiteSpaceWrapper>
      <SectionHeader
        descriptionText="Verify your identity to ensure account security and access additional features."
        titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P1"} />}
        titleText="ID Verification"
        titleClassName="MT-SB-1"
      />
    </WhiteSpaceWrapper>
  );
};

export default IDVerification;
