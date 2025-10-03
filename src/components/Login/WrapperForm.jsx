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
          "bg-[#F8F7F5] rounded-[32px] p-8"
        }
        titleIcon={
          <div className="w-12 h-12 bg-white rounded-2xl p-3.5 flex items-center justify-center">
            <SparkleIcon />
          </div>
        }
        titleClassName="MT-SB-1"
        titleText="Welcome back"
      />

      {/* Log In Section */}
      <div className="px-8 mt-8 rounded-xl">
        <SectionHeader
          descriptionText="Enter your account details to access to your account."
          // headerContainerClassName="px-4"
          titleIcon={
            <div className="w-12 h-12 bg-[#F8F7F5] rounded-2xl p-3.5 flex items-center justify-center">
              <PadLockUserIcon />
            </div>
          }
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
