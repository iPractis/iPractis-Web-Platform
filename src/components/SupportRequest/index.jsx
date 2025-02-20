import SectionHeader from "../Shared/SectionHeader";
import Form from "./Form";

// Icons
import { SparkleIcon } from "../Icons";

export const SupportRequest = () => {
  return (
    <section className="container-page-v8 my-8 sm:px-0 px-8">
      {/* Heading Title */}
      <SectionHeader
        descriptionText="We are sorry to see you here, we hope your problem will be resolved soon."
        titleText="Account support service"
        wrapperSectionHeaderClassName={
          "sm:bg-primary-color-P11 rounded-[32px] sm:p-8"
        }
        titleIcon={<SparkleIcon />}
        titleClassName="MT-SB-1"
      />

      <Form />
    </section>
  );
};
