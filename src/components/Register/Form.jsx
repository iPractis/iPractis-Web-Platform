"use client";

import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import EmailPhoneSwitcherRegister from "./EmailPhoneSwitcherRegister";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import { useActionState, useState, startTransition } from "react";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { registerUser } from "@/src/lib/actions/authAction";
import SectionHeader from "../Shared/SectionHeader";
import PasswordLevels from "./PasswordLevels";
import Image from "next/image";

import { UserAddCircleIcon, UserAddCircleMediumIcon } from "../Icons";
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import userInput from "@/public/icons/user-input.png";
import usersBox from "@/public/icons/users-box.png";
import apple from "@/public/icons/apple.png";

const Form = () => {
  const [state, formAction, isPending] = useActionState(registerUser, {});
  const [toggleInput, setToggleInput] = useState("email");
  const [securityLevel, setSecurityLevel] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("toggleInput", toggleInput);

    // Send data to server action
    startTransition(() => {
      formAction(formData);
    });
  };

  const validEmailErrors = [
    "Invalid Email Submission",
    "Invalid Email Length",
    "Invalid Email",
    "You already have an account",
  ];

  const validPhoneNumberErrors = ["Invalid Phone Number"];

  const validPasswordErrors = [
    "Invalid Password",
    "Password too short",
    "Password too long",
  ];

  const validFirstNameErrors = [
    "Invalid First Name",
    "First name too short",
    "First name too long",
  ];

  const validLastNameErrors = [
    "Invalid Last Name",
    "Last name too short",
    "Last name too long",
  ];

  const isValidEmailError =
    state?.message && validEmailErrors.includes(state?.title);
  const isValidPhoneNumberError =
    state?.message && validPhoneNumberErrors.includes(state?.title);
  const isValidPasswordError =
    state?.message && validPasswordErrors.includes(state?.title);
  const isValidFirstNameError =
    state?.message && validFirstNameErrors.includes(state?.title);
  const isValidLastNameError =
    state?.message && validLastNameErrors.includes(state?.title);

  return (
    <form
      className="sm:px-8 rounded-2xl sm:mt-[50px] mt-8"
      onSubmit={handleSubmit}
      action={formAction}
    >
      <SectionHeader
        descriptionText="Manually enter your details to create a secure account."
        wrapperSectionHeaderClassName={"sm:px-4"}
        titleText="Create an account using ID"
        titleIcon={<UserAddCircleIcon />}
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
      />

      <div className="space-y-8">
        <div className="flex gap-3 mt-8">
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
              name="firstName"
              startContent={
                <Image className="w-9" src={userInput} alt="User Input" />
              }
              classNames={{
                inputWrapper: isValidFirstNameError && "form-input-error",
              }}
            />

            <CustomNextUiInput
              type="text"
              name="lastName"
              placeholder="Last name"
              startContent={
                <Image className="w-9" src={usersBox} alt="Users Input" />
              }
              classNames={{
                inputWrapper: isValidLastNameError && "form-input-error",
              }}
            />
          </div>

          {isValidFirstNameError && (
            <ErrorMessageiPractis
              typeError={state.title}
              descError={state.message}
            />
          )}

          {isValidLastNameError && (
            <ErrorMessageiPractis
              typeError={state.title}
              descError={state.message}
            />
          )}

          {/* Email || Phone Number Input */}
          <EmailPhoneSwitcherRegister
            isValidPhoneNumberError={isValidPhoneNumberError}
            isValidEmailError={isValidEmailError}
            setToggleInput={setToggleInput}
            messageError={state?.message}
            toggleInput={toggleInput}
            titleError={state?.title}
          />

          {/* Password Input */}
          <div>
            <CustomNextUiInput
              type="password"
              name="password"
              placeholder="Enter your password"
              startContent={
                <Image className="w-9" src={passwordInput} alt="User Input" />
              }
              classNames={{
                inputWrapper: isValidPasswordError && "form-input-error",
              }}
              onChange={handlePasswordChange}
              value={password}
            />

            {isValidPasswordError && (
              <ErrorMessageiPractis
                typeError={state.title}
                descError={state.message}
              />
            )}

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
          className="btn btn-secondary w-full MT-SB-1 rounded-2xl p-1.5 flex justify-center items-center"
          disabled={isPending}
          type="submit"
        >
          <span className="flex-1">
            {isPending ? "Loading..." : "Create an account"}
          </span>

          <InputBGWrapperIcon>
            <UserAddCircleMediumIcon fillColor={"fill-tertiary-color-SC5"} />
          </InputBGWrapperIcon>
        </button>
      </div>
    </form>
  );
};

export default Form;
