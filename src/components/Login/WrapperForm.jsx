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
        descriptionText="Sign in to continue your journey with iPractis."
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleIcon={<SparkleIcon />}
        titleClassName="MT-SB-1"
        titleText="Welcome back"
      />

      {/* Log In Section */}
      <div className="sm:px-8 sm:mt-[50px] mt-8 shadow-lg rounded-xl">
        <SectionHeader
          descriptionText="Enter your account details to access to your account."
          headerContainerClassName="px-4"
          titleIcon={<PadLockUserIcon />}
          descriptionClassName="mt-1"
          titleClassName="MT-SB-1"
          titleText="Log in"
        />

        {/* Social media buttons to login */}
        {/* <SocialMediaButtons /> */}

        {/* Login form inputs */}
        <Form />
      </div>
    </>
  );
};

export default WrapperForm;
