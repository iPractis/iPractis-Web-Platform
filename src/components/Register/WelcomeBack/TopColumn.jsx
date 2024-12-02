"use client";
import CustomNextUiInput from "@/src/components/Globals/CustomNextUiInput";
import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Images && icons
import ErrorMessageiPractis from "../../Globals/ErrorMessageiPractis";
import userAddCircle from "@/public/icons/user-add-circle.png";
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import userInput from "@/public/icons/user-input.png";
import usersBox from "@/public/icons/users-box.png";
import sparkle from "@/public/icons/sparkle.png";
import apple from "@/public/icons/apple.png";
import email from "@/public/icons/email.png";
import phone from "@/public/icons/phone.png";
import { useState } from "react";

const TopColumn = () => {
  const [password, setPassword] = useState("");
  const [securityLevel, setSecurityLevel] = useState(0);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword === "") {
      setSecurityLevel(0);
      return;
    }

    if (newPassword.length < 6) {
      setSecurityLevel(1);
    } else if (newPassword.length < 8) {
      setSecurityLevel(2);
    } else if (newPassword.length < 10) {
      setSecurityLevel(3);
    } else {
      setSecurityLevel(4);
    }
  };

  return (
    <article>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="Start using iPractis by signing up quickly."
          titleClassName="MT-SB-1"
          titleText="Create an account"
          iconClassName="w-[20px]"
          iconAlt={"Sparkle Icon"}
          iconSrc={sparkle}
        />
      </div>

      {/* Sign Up Section */}
      <form className="bg-primary-color-P12 p-8 mt-8 rounded-2xl">
        <SectionHeader
          descriptionText="Manually enter your details to create a secure account."
          titleText="Create an account using ID"
          descriptionClassName="mt-1"
          iconAlt={"Add User Icon"}
          iconClassName="w-[24px]"
          titleClassName="MT-SB-1"
          iconSrc={userAddCircle}
        />

        <div className="sm:space-y-[50px] space-y-[32px]">
          <div className="flex gap-3 sm:mt-[50px] mt-[32px]">
            <button
              className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
              type="button"
            >
              <Image
                alt="Google Original Icon"
                className="mx-auto w-[22px] h-[22px] object-contain"
                src={google}
              />
            </button>

            <button
              className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
              type="button"
            >
              <Image
                alt="Microsoft Original Icon"
                className="mx-auto w-[22px] h-[22px] object-contain"
                src={microsoft}
              />
            </button>

            <button
              className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
              type="button"
            >
              <Image
                alt="Apple Original Icon"
                className="mx-auto w-[22px] h-[22px] object-contain"
                src={apple}
              />
            </button>
          </div>

          <div className="space-y-3">
            {/* Firtname && Lastname input */}
            <div className="flex gap-3 items-center">
              <CustomNextUiInput
                color="modern"
                type="text"
                placeholder="First name"
                startContent={
                  <Image className="w-9" src={userInput} alt="User Input" />
                }
              />

              <CustomNextUiInput
                color="modern"
                type="text"
                placeholder="Last name"
                startContent={
                  <Image className="w-9" src={usersBox} alt="Users Input" />
                }
              />
            </div>

            {/* Email Input */}
            <div className="flex gap-3">
              <CustomNextUiInput
                color="modern"
                type="email"
                placeholder="Enter your email address"
                startContent={
                  <Image className="w-9" src={email} alt="Email Input" />
                }
              />

              <div className="w-12 bg-primary-color-P11 rounded-2xl p-3">
                <Image
                  className="w-6 h-6 object-cover"
                  src={phone}
                  alt="Phone Input"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <CustomNextUiInput
                color="modern"
                type="password"
                placeholder="Enter your password"
                startContent={
                  <Image className="w-9" src={passwordInput} alt="User Input" />
                }
                onChange={handlePasswordChange}
                value={password}
              />

              <div className="flex gap-3 px-2.5 text-[#1C1C1E] mt-2.5">
                <div
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    securityLevel >= 1
                      ? securityLevel >= 2
                        ? securityLevel >= 3
                          ? securityLevel >= 4
                            ? "bg-[#29FF64]" // Level 4
                            : "bg-[#FFDD29]" // Level 3
                          : "bg-[#FF9264]" // Level 2
                        : "bg-[#FF2937]" // Level 1
                      : "bg-[#E5E5EA]" // Without color
                  }`}
                ></div>
                <div
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    securityLevel >= 2
                      ? securityLevel >= 3
                        ? securityLevel >= 4
                          ? "bg-[#29FF64]" // Level 4
                          : "bg-[#FFDD29]" // Level 3
                        : "bg-[#FF9264]" // Level 2
                      : "bg-[#E5E5EA]" // Without color
                  }`}
                ></div>
                <div
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    securityLevel >= 3
                      ? securityLevel >= 4
                        ? "bg-[#29FF64]" // Level 4
                        : "bg-[#FFDD29]" // Level 3
                      : "bg-[#E5E5EA]" // Without color
                  }`}
                ></div>
                <div
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    securityLevel >= 4 ? "bg-[#29FF64]" : "bg-[#E5E5EA]"
                  }`}
                ></div>
              </div>

              <h3 className="px-2.5 mt-2 ST-4">
                Password Security Level{securityLevel > 0 ? ":" : ""}{" "}
                {getSecurityLevelMessage(securityLevel)}
              </h3>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
          >
            Create an account
          </button>
        </div>
      </form>
    </article>
  );
};

export default TopColumn;
