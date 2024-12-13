"use client";

import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import CustomNextUiInput from "@/src/components/Globals/CustomNextUiInput";
import PasswordLevels from "../Register/PasswordLevels";
import DualButton from "../Globals/DualButton";
import { useState } from "react";
import Image from "next/image";

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
    <form>
      <div className="my-[50px]">
        {/* New Password */}
        <div>
          <CustomNextUiInput
            type="password"
            maxLength={32}
            placeholder="Enter your new password"
            startContent={
              <Image className="w-9" src={passwordStars} alt="3 Stars Icon" />
            }
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        {/* Retape password */}
        <div className="mt-2.5">
          <CustomNextUiInput
            type="password"
            maxLength={32}
            placeholder="Retape your new password"
            startContent={
              <Image className="w-9" src={passwordStars} alt="3 Stars Icon" />
            }
          />
        </div>

        <PasswordLevels securityLevel={securityLevel} />

        <h3 className="px-2.5 mt-2 ST-4 text-primary-color-P1">
          Password Security Level{securityLevel && ":"}
          <span className="ps-1">{getSecurityLevelMessage(securityLevel)}</span>
        </h3>
      </div>

      <DualButton
        leftButtonText={"Cancel"}
        rightButtonText={"Change password"}
        rightButtonType="submit"
      />
    </form>
  );
};

export default Form;
