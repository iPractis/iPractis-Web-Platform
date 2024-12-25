"use client";

import { PadLockUserIcon, QRCodeUserIcon, SparkleIcon } from "../Icons";
import { logInUser } from "@/src/lib/actions/authAction";
import SectionHeader from "../Globals/SectionHeader";
import { useRouter } from "next/navigation";
import RightForm from "./RightForm";
import LeftForm from "./LeftForm";
import { useState } from "react";

const ContainerForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e?.target?.email?.value.trim();

    // Validation of empty field (email)
    if (!email) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Email can't be empty.",
      };

      return setError(invalidEmailError);
    }

    // Validation of gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Check your spelling email",
      };

      return setError(invalidEmailError);
    }

    // Validation of empty field (password)
    if (!password) {
      const invalidEmailError = {
        title: "Invalid Password",
        message: "Password can't be empty.",
      };

      return setError(invalidEmailError);
    }

    // Validation of exceed the character limit (password)
    if (password?.length > 30) {
      const invalidPasswordError = {
        title: "Character limit",
        message: "The input exceeds the allowed character limit.",
      };

      return setError(invalidPasswordError);
    }

    try {
      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      const response = await logInUser(formData);

      if (response?.message && response?.title) {
        setError({ message: response.message, title: response.title });
      } else {
        router.push(`/authenticator?email=${formData.get("email")}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword.replace(/\s/g, ""));
  };

  return (
    <form onSubmit={handleSubmit}>
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

            <LeftForm
              handlePasswordChange={handlePasswordChange}
              password={password}
              error={error}
              isPending={isPending}
            />
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
