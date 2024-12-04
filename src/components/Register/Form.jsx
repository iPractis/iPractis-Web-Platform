"use client";

import CustomNextUiInput from "@/src/components/Globals/CustomNextUiInput";
import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import SectionHeader from "../Globals/SectionHeader";
import PasswordLevels from "./PasswordLevels";
import { useState } from "react";
import Image from "next/image";

import userAddCircle from "@/public/icons/user-add-circle.png";
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import userInput from "@/public/icons/user-input.png";
import usersBox from "@/public/icons/users-box.png";
import apple from "@/public/icons/apple.png";
import email from "@/public/icons/email.png";
import phone from "@/public/icons/phone.png";

const Form = () => {
  const [password, setPassword] = useState("");
  const [securityLevel, setSecurityLevel] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    // Regex - to prevent user to not SPACE in the input!
    setPassword(newPassword.replace(/\s/g, ""));

    if (!newPassword.trim(" ")) return setSecurityLevel("");

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
              type="text"
              placeholder="First name"
              startContent={
                <Image className="w-9" src={userInput} alt="User Input" />
              }
            />

            <CustomNextUiInput
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
              type="email"
              placeholder="Enter your email address"
              startContent={
                <Image className="w-9" src={email} alt="Email Input" />
              }
            />

            <div className="w-12 animation-fade bg-primary-color-P11 hover:bg-secondary-color-S9 cursor-pointer rounded-2xl p-3">
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
              type="password"
              maxLength={32}
              placeholder="Enter your password"
              startContent={
                <Image className="w-9" src={passwordInput} alt="User Input" />
              }
              onChange={handlePasswordChange}
              value={password}
            />

            <PasswordLevels securityLevel={securityLevel} />

            <h3 className="px-2.5 mt-2 ST-4 text-primary-color-P1">
              Password Security Level{securityLevel && ":"}
              <span className="ps-1">
                {getSecurityLevelMessage(securityLevel)}
              </span>
            </h3>
          </div>
        </div>

        <button
          className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
          type="submit"
        >
          Create an account
        </button>
      </div>
    </form>
  );
};

export default Form;
