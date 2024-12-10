import SectionHeader from "../Globals/SectionHeader";
import { SparkleIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="We are sorry to see you here, we hope your problem will be resolved soon."
          titleText="Account support service"
          titleIcon={<SparkleIcon />}
          titleClassName="MT-SB-1"
        />
      </div>
    </article>
  );
};

export default TopColumn;
