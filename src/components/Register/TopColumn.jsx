import SectionHeader from "../Shared/SectionHeader";
import { SparkleIcon } from "../Icons";
import Form from "./Form";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Create an account to begin your journey with iPractis."
        titleText="Welcome on iPractis!"
        titleIcon={<SparkleIcon />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleClassName="MT-SB-1"
      />

      {/* Sign Up Section */}
      <Form />
    </article>
  );
};

export default TopColumn;
