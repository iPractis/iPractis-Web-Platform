"use client";

import SectionHeader from "../Shared/SectionHeader";
import SectionContent from "../Shared/SectionContent";
import Form from "./Form";

// Icons
import { PadLockUserIcon, SparkleIcon } from "../Icons";
import IconHeader from "../Shared/IconHeader";
import SectionWrapper from "../Shared/SectionWrapper";

const WrapperForm = () => {
  return (
    <SectionWrapper>
      {/* Heading Title */}
      <SectionHeader
        titleText="Welcome back"
        titleIcon={<SparkleIcon fillcolor="fill-primary-color-P1" />}
        titleClassName="MT-SB-1"
        descriptionText="Log in to continue your journey with iPractis."
      />

      {/* Log In Section */}
      <div className="w-[430px] mx-auto space-y-[30px]">
        <IconHeader
          title="Account Credentials"
          description="Enter your account details to access to your account."
          icon={<PadLockUserIcon fillcolor="fill-primary-color-P1" />}
        />

        {/* Social media buttons to login */}
        {/* <SocialMediaButtons /> */}

        {/* Login form inputs */}
        <div className="-mt-8">
          <Form />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WrapperForm;
