import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";
import Form from "./Form";

// Icons
import { SparkleIcon } from "../Icons";
import SectionContent from "../Shared/SectionContent";

const WrapperForm = () => {
  return (
    <SectionWrapper>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Create an account to begin your journey with iPractis."
        titleText="Welcome on iPractis!"
        titleIcon={<SparkleIcon fillcolor="fill-primary-color-P1" />}
      />

      {/* Sign Up Section */}
      <SectionContent>
        {/* Sign up form inputs */}
        <Form />
      </SectionContent>
    </SectionWrapper>
  );
};

export default WrapperForm;
