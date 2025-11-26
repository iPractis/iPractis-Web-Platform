"use client";

import SectionHeader from "../Shared/SectionHeader";
import Form from "./Form";

// Icons
import { PadLockUserIcon, SparkleIcon } from "../Icons";

const WrapperForm = () => {
  return (
    <>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Log in to continue your journey with iPractis."
        wrapperSectionHeaderClassName={
          "bg-secondary-color-S11 rounded-[32px] p-8"
        }
        titleIcon={<SparkleIcon fillcolor="fill-primary-color-P1" />}
        titleClassName="MT-SB-1"
        descriptionClassName="mt-0.5"
        titleText="Welcome back"
      />

      {/* Log In Section */}
      <div className="px-8 mt-8 rounded-xl">
        <SectionHeader
          descriptionText="Enter your account details to access to your account."
          titleIcon={<PadLockUserIcon fillcolor="fill-primary-color-P1" />}
          descriptionClassName="mt-1"
          titleClassName="MT-SB-1"
          titleText="Account Credentials"
        />

        {/* Social media buttons to login */}
        {/* <SocialMediaButtons /> */}

        {/* Login form inputs */}
        <div className="-ml-6 -mr-8">
          <Form />
        </div>
      </div>
    </>
  );
};

export default WrapperForm;
