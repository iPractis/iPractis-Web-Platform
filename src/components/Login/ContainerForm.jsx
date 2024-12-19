"use client";
import { PadLockUserIcon, QRCodeUserIcon, SparkleIcon } from "../Icons";
import SectionHeader from "../Globals/SectionHeader";
import { signIn } from "next-auth/react";
import RightForm from "./RightForm";
import LeftForm from "./LeftForm";

const ContainerForm = () => {
  const credentialsAction = (formData) => {
    signIn("credentials", formData);
  };

  return (
    <form action={credentialsAction}>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="Sign in to continue your journey with iPractis."
          titleIcon={<SparkleIcon />}
          titleClassName="MT-SB-1"
          titleText="Welcome back"
        />
      </div>

      {/* Log In Section */}
      <div className="bg-primary-color-P12 p-8 mt-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start sm:gap-[50px]">
          <div className="flex-1 w-full">
            <SectionHeader
              descriptionText="Enter your account details to access to your account."
              titleIcon={<PadLockUserIcon />}
              descriptionClassName="mt-1"
              titleClassName="MT-SB-1"
              titleText="Log in"
            />

            <LeftForm />
          </div>

          <div className="md:block hidden flex-1 w-full">
            <SectionHeader
              descriptionText="Log in with a QR code or a sign-in code."
              titleText="Alternative Login Methods"
              titleIcon={<QRCodeUserIcon />}
              descriptionClassName="mt-1"
              titleClassName="MT-SB-1"
            />

            <RightForm />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContainerForm;
