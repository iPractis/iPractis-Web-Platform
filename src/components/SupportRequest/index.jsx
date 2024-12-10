import SectionHeader from "../Globals/SectionHeader";
import { SparkleIcon } from "../Icons";
import Form from "./Form";

export const SupportRequest = () => {
  return (
    <section className="container-page-v2">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Heading Title */}
        <div className="p-4">
          <SectionHeader
            descriptionText="We are sorry to see you here, we hope your problem will be resolved soon."
            titleText="Account support service"
            titleIcon={<SparkleIcon />}
            titleClassName="MT-SB-1"
          />
        </div>

        <Form />
      </div>
    </section>
  );
};
