"use client";

import LeftColumnReasonsSelect from "./LeftColumnReasonsSelect";
import CustomNextUiInput from "../Globals/CustomNextUiInput";
import SectionHeader from "../Globals/SectionHeader";
import { useState } from "react";
import Image from "next/image";

// Images && icons
import circleAlert from "@/public/icons/circle-alert.png";
import pinInput from "@/public/icons/pin-input.png";
import emailInput from "@/public/icons/email.png";

const Form = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <article className="flex-1 w-full">
      <SectionHeader
        descriptionText="We need this information to assist you effectively"
        iconAlt={"Locked User Icon"}
        descriptionClassName="mt-1"
        iconClassName="w-[24px]"
        titleClassName="MT-SB-1"
        titleText="Contact ID"
        iconSrc={circleAlert}
      />

      <div className="my-[50px]">
        {/* Reason */}
        <LeftColumnReasonsSelect />

        {/* Contact email */}
        <div className="mt-2.5">
          <CustomNextUiInput
            type="email"
            maxLength={32}
            placeholder="Contact Email"
            startContent={
              <Image className="w-9" src={emailInput} alt="Email Input" />
            }
          />
        </div>

        {/* Email related to your account */}
        <div className="mt-2.5">
          <CustomNextUiInput
            type="email"
            maxLength={32}
            placeholder="Enter email related to your account"
            startContent={
              <Image className="w-9" src={emailInput} alt="Email Input" />
            }
          />
        </div>

        {/* Password Input */}
        <div className="mt-2.5 relative">
          <input
            type="file"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 z-10 cursor-pointer"
          />

          <div className="flex items-center rounded-2xl p-1.5 ST-3 bg-primary-color-P11 hover:bg-secondary-color-S9">
            <Image className="w-9" src={pinInput} alt="Pin Input" />
            <span className="placeholder:text-primary-color-P4 text-primary-color-P4 ps-4">
              {fileName || "Upload a screenshot (Optional)"}{" "}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Form;
