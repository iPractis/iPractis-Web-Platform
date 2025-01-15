import SectionHeader from "../Globals/SectionHeader";
import { SparkleIcon } from "../Icons";
import Form from "./Form";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Start using iPractis by signing up quickly."
        titleText="Welcome on iPractis!"
        titleIcon={<SparkleIcon />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleClassName="MT-SB-2"
      />

      {/* Sign Up Section */}
      <Form />
    </article>
  );
};

export default TopColumn;
