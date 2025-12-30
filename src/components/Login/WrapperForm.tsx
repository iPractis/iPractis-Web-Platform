"use client";

import Form from "./Form";
import SectionHeader from "../Shared/SectionHeader";

// Icons
import { SparkleIcon, UserIcon, UserProfileIcon } from "../Icons";
import IconHeader from "../Shared/IconHeader";
import SectionWrapper from "../Shared/SectionWrapper";

const WrapperForm = () => {
  return (
    <SectionWrapper>
      {/* Heading Title */}
      <SectionHeader
        titleText="Welcome back!"
        titleIcon={<SparkleIcon fillcolor="fill-primary-color-P1" />}
        titleClassName="MT-SB-1"
        descriptionText="Log in to continue your journey with iPractis."
      />

      {/* Log In Section */}
      <div className="w-[430px] mx-auto space-y-[30px]">
        <IconHeader
          title="Account credentials"
          description="Enter your account details to access to your account."
          icon={<UserIcon  fillcolor="fill-primary-color-P1" />}
        />

        {/* Login form inputs */}
        <Form />
      </div>
    </SectionWrapper>
  );
};

export default WrapperForm;
