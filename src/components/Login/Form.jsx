import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import EmailPhoneSwitcher from "./EmailPhoneSwitcherLogin";

// React imports
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images && icons
import {
  ChevronRightDoorIcon,
  CloseIcon,
  EyeWithDashIcon,
  EyeWithoutDashIcon,
} from "../Icons";

import passwordInput from "@/public/icons/password-input.png";

import {
  validEmailErrors,
  validPasswordErrors,
  validPhoneNumberErrors,
} from "@/src/data/dataRegister";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [toggleInput, setToggleInput] = useState("email");
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If user chooses email we're gonna get the EMAIL INPUT (ignore phone number)
    if (toggleInput === "email") {
      const email = e?.target?.email?.value;

      // Validation of empty field (email)
      if (!email) {
        const invalidEmailError = {
          title: "Invalid Email",
          message: "Email can't be empty.",
        };

        return setError(invalidEmailError);
      }

      // Validation of spaces in email field
      if (email.includes(" ")) {
        const invalidEmailError = {
          title: "Invalid Email Submission",
          message: "Email can't have spaces.",
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

      // Validation of characters (cannot exceed 254 characters)
      if (email?.length > 254) {
        const invalidEmailError = {
          title: "Invalid Email Length",
          message: "Email can't exceed 254 of characters.",
        };

        return setError(invalidEmailError);
      }
    } else {
      // If user chooses number we're gonna get the PHONE NUMBER INPUT (ignore email)
      const number = e?.target?.number?.value?.trim();

      // Validation of empty field (phone number)
      if (!number.trim(" ")) {
        const invalidPhoneNumberError = {
          title: "Invalid Phone Number",
          message: "Phone number can't be empty.",
        };

        return setError(invalidPhoneNumberError);
      }
    }

    // Validation of empty field (password)
    if (!password) {
      const invalidEmailError = {
        title: "Invalid Password",
        message: "Password can't be empty.",
      };

      return setError(invalidEmailError);
    }

    // Check if password input is too short (can't be less than 8)
    if (password?.length < 8) {
      const invalidPasswordError = {
        title: "Password too short",
        message: "You need at least 8 characters for password.",
      };

      return setError(invalidPasswordError);
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

      // If there's error we display the error
      if (response?.message && response?.title) {
        console.log(response, "aqui reror");
        return setError({ message: response.message, title: response.title });
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
    setPassword(newPassword);
  };

  const isValidEmailError =
    error?.message && validEmailErrors.includes(error?.title);
  const isValidPhoneNumberError =
    error?.message && validPhoneNumberErrors.includes(error?.title);
  const isValidPasswordError =
    error?.message && validPasswordErrors.includes(error?.title);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form inputs */}
      <div>
        {/* Email || Phone Number Input */}
        <EmailPhoneSwitcher
          isValidPhoneNumberError={isValidPhoneNumberError}
          isValidEmailError={isValidEmailError}
          setToggleInput={setToggleInput}
          messageError={error?.message}
          toggleInput={toggleInput}
          titleError={error?.title}
        />

        {/* Password Input */}
        <div className="mt-3">
          <CustomNextUiInput
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            startContent={
              <Image className="w-9" src={passwordInput} alt="User Input" />
            }
            endContent={
              password?.length > 0 && (
                <>
                  <InputBGWrapperIcon
                    className={"cursor-pointer me-1.5"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeWithDashIcon fillColor={"fill-primary-color-P4"} />
                    ) : (
                      <EyeWithoutDashIcon fillColor={"fill-primary-color-P4"} />
                    )}
                  </InputBGWrapperIcon>

                  <InputBGWrapperIcon
                    className={"cursor-pointer"}
                    onClick={() => setPassword("")}
                  >
                    <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                  </InputBGWrapperIcon>
                </>
              )
            }
            classNames={{
              inputWrapper: isValidPasswordError && "form-input-error",
            }}
          />

          {isValidPasswordError && (
            <ErrorMessageiPractis
              typeError={error?.title}
              descError={error?.message}
            />
          )}
        </div>
      </div>

      {/* Presskey and submit button */}
      <div className="flex items-center gap-4">
        <button
          className="btn btn-primary w-full MT-1 rounded-2xl py-3 px-4"
          type="button"
        >
          Presskey
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-secondary w-full MT-1 rounded-2xl p-1.5 flex items-center justify-center"
        >
          <span className="flex-1">{isPending ? "Loading..." : "Log in"}</span>{" "}
          <InputBGWrapperIcon>
            <ChevronRightDoorIcon
              fillColor={
                "fill-tertiary-color-SC5 group-hover:fill-tertiary-color-SC5"
              }
            />
          </InputBGWrapperIcon>
        </button>
      </div>

      {/* Link to account assistance  */}
      <Link
        className="text-center block text-primary-color-P4 ST-4"
        href={"/account-assistance"}
      >
        I can’t sing in, help!
      </Link>
    </form>
  );
};

export default Form;
