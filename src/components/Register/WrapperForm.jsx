import SectionHeader from "../Shared/SectionHeader";
import Form from "./Form";

// Icons
import { SparkleIcon, UserAddCircleIcon } from "../Icons";
import SocialMediaButtons from "./SocialMediaButtons";

const WrapperForm = () => {
  return (
    <>
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
      <div className="sm:px-8 sm:mt-[50px] mt-8">
        <SectionHeader
          descriptionText="Manually enter your details to create a secure account."
          wrapperSectionHeaderClassName={"sm:px-4"}
          titleText="Create an account using ID"
          titleIcon={<UserAddCircleIcon />}
          descriptionClassName="mt-1"
          titleClassName="MT-SB-1"
        />

        {/* Social media buttons to register */}
        <SocialMediaButtons />

        {/* Sign up form inputs */}
        <Form />
      </div>
    </>
  );
};

export default WrapperForm;
