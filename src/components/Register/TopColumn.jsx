import SectionHeader from "../Globals/SectionHeader";
import { SparkleIcon } from "../Icons";
import Form from "./Form";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="Start using iPractis by signing up quickly."
          titleText="Create an account"
          titleIcon={<SparkleIcon />}
          titleClassName="MT-SB-1"
        />
      </div>

      {/* Sign Up Section */}
      <Form />
    </article>
  );
};

export default TopColumn;
