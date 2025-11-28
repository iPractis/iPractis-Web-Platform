import SectionHeader from "../Shared/SectionHeader";
import Form from "./Form";

// Icons
import { SparkleIcon, UserAddCircleIcon } from "../Icons";

const WrapperForm = () => {
  return (
    <>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Create an account to begin your journey with iPractis."
        titleText="Welcome on iPractis!"
        titleIcon={<SparkleIcon fillcolor="fill-primary-color-P1" />}
        wrapperSectionHeaderClassName={
          "bg-secondary-color-S11 rounded-[32px] p-8 -ml-1.5"
        }
        titleClassName="MT-SB-1"
        descriptionClassName="mt-0.5"
      />

      {/* Sign Up Section */}
      <div className="sm:px-8 sm:mt-[50px] mt-8">
        <SectionHeader
          descriptionText="Enter your details to create a secure account."
          wrapperSectionHeaderClassName={"px-0 -ml-1.5"}
          titleText="Create an account using ID"
          titleIcon={<UserAddCircleIcon fillcolor="fill-primary-color-P1" />}
          descriptionClassName="mt-0.5"
          titleClassName="MT-SB-1"
        />

        {/* Sign up form inputs */}
        <Form />
      </div>
    </>
  );
};

export default WrapperForm;
