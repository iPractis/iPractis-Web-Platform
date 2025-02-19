"use client";

import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import { newPasswordInputs } from "@/src/lib/actions/authAction";
import passwordStars from "@/public/icons/password-stars.png";
import { validPasswordErrors } from "@/src/data/dataRegister";
import PasswordLevels from "../Register/PasswordLevels";
import DualButton from "../Shared/DualButton";

// React imports
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const Form = () => {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [securityLevel, setSecurityLevel] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const token = searchParams.get("token");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Check if password input is not empty
    if (!password) {
      const invalidPasswordError = {
        title: "Invalid Password",
        message: "Password can't be empty.",
      };

      return setError(invalidPasswordError);
    }

    // Check if password input is too short (can't be less than 8)
    if (password.length < 8) {
      const invalidPasswordError = {
        title: "Password too short",
        message: "You need at least 8 characters to make a password.",
      };

      return setError(invalidPasswordError);
    }

    // Check if password input is too long (can't excess 30)
    if (password.length > 30) {
      const invalidPasswordError = {
        title: "Password too long",
        message: "Your password should not exceed 30 characters.",
      };

      return setError(invalidPasswordError);
    }

    if (password !== repeatPassword) {
      const invalidPasswordError = {
        title: "Passwords are not the same",
        message: "Make sure both passwords are the same before proceeding.",
      };

      return setError(invalidPasswordError);
    }

    try {
      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      formData.append("token", token);

      const response = await newPasswordInputs(formData);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setError({ message: response.message, title: response.title });
      } else {
        router.push(`/password-updated-successfully`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    // Regex - to prevent user to not SPACE in the input!
    setPassword(newPassword);

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

  const isValidPasswordError =
    error?.message && validPasswordErrors.includes(error?.title);

  return (
    <form onSubmit={handleSubmit} className="sm:px-8 mt-[50px]">
      <div className="mb-8">
        {/* New Password */}
        <div>
          <CustomNextUiInput
            type="password"
            name="password"
            placeholder="Enter your new password"
            startContent={
              <Image className="w-9" src={passwordStars} alt="3 Stars Icon" />
            }
            onChange={handlePasswordChange}
            value={password}
            classNames={{
              inputWrapper: isValidPasswordError && "form-input-error",
            }}
          />
        </div>

        {/* Retape password */}
        <div className="mt-2.5">
          <CustomNextUiInput
            type="password"
            name="repeatPassword"
            placeholder="Retape your new password"
            onChange={(e) =>
              setRepeatPassword(e?.target?.value)
            }
            value={repeatPassword}
            startContent={
              <Image className="w-9" src={passwordStars} alt="3 Stars Icon" />
            }
            classNames={{
              inputWrapper: isValidPasswordError && "form-input-error",
            }}
          />
        </div>

        {isValidPasswordError && (
          <ErrorMessageiPractis
            typeError={error?.title}
            descError={error?.message}
          />
        )}

        <PasswordLevels securityLevel={securityLevel} />

        <h3 className="px-2.5 mt-2 ST-4 text-primary-color-P1">
          Password Security Level{securityLevel && ":"}
          <span className="ps-1">{getSecurityLevelMessage(securityLevel)}</span>
        </h3>
      </div>

      <DualButton
        leftButtonClassName={"disabled:opacity-20 disabled:pointer-events-none"}
        rightButtonClassName={
          "disabled:opacity-20 disabled:pointer-events-none"
        }
        leftButtonText={"Cancel"}
        leftButtonHref="/login"
        leftButtonDisabled={isPending}
        rightButtonDisabled={isPending}
        rightButtonText={isPending ? "Loading..." : "Change password"}
        rightButtonType="submit"
      />
    </form>
  );
};

export default Form;
