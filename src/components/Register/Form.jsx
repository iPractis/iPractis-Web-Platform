"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { errorFormMessages } from "@/src/data/dataRegister";
import { registerUser } from "@/src/lib/actions/authAction";
import PasswordLevels from "./PasswordLevels";

// React imports
import { useActionState, useState, startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

// Icons
import {
  UserAddCircleMediumIcon,
  PadLockClosedBigIcon,
  EyeWithoutDashIcon,
  EyeWithDashIcon,
  ThreeUsersIcon,
  UserBigIcon,
  CloseIcon,
  MailIcon,
} from "../Icons";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
  } = useForm({ mode: "onBlur" });
  const [backEndErrors, setBackEndErrors] = useState("");
  const [state, formAction, isPending] = useActionState(registerUser, {});
  const [showPassword, setShowPassword] = useState(false);
  const [securityLevel, setSecurityLevel] = useState("");

  const onSubmit = (data) => {
    // Send data to server action
    startTransition(() => {
      formAction(data);
    });
  };

  const password = watch("password");

  // If there's errors in backend, we set them to the state
  useEffect(() => {
    setBackEndErrors(state?.formError);
  }, [state?.formError]);

  useEffect(() => {
    if (!password?.trim()) {
      setSecurityLevel("");
    } else if (password.length < 6) {
      setSecurityLevel(1);
    } else if (password.length < 8) {
      setSecurityLevel(2);
    } else if (password.length < 10) {
      setSecurityLevel(3);
    } else {
      setSecurityLevel(4);
    }
  }, [password]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action={formAction}
      className="mt-8"
    >
      <div className="space-y-3">
        {/* Firtname && Lastname input */}
        <div className="flex gap-3 items-center">
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("firstName"),
              "firstName"
            )}
          >
            <CustomNextUiInput
              type="text"
              placeholder="First name"
              name="firstName"
              startContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <UserBigIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.firstName?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("firstName", {
                required: "Invalid First Name --- First name can't be empty.",
                pattern: /[0-9!@#%^&*()_+={}[\]:;"'<>?,./£$€¥]/,
                setValueAs: (value) => value.trim(),
                maxLength: 254,
                minLength: 2,
              })}
            />
          </InputLeftStickStatus>

          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("lastName"),
              "lastName"
            )}
          >
            <CustomNextUiInput
              type="text"
              name="lastName"
              placeholder="Last name"
              startContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <ThreeUsersIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.lastName?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("lastName", {
                required: "Invalid Last Name --- Last name can't be empty.",
                pattern: /[0-9!@#%^&*()_+={}[\]:;"'<>?,./£$€¥]/,
                setValueAs: (value) => value.trim(),
                maxLength: 254,
                minLength: 2,
              })}
            />
          </InputLeftStickStatus>
        </div>

        <DynamicInputErrorMessage
          errorMessages={errorFormMessages}
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="firstName"
        />

        <DynamicInputErrorMessage
          errorMessages={errorFormMessages}
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="lastName"
        />

        {/* Email Input */}
        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("email"),
              "email"
            )}
          >
            <CustomNextUiInput
              type="text"
              name="email"
              placeholder="Enter your email address"
              startContent={
                <InputBGWrapperIcon>
                  <MailIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.email?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("email", {
                required: "Invalid Email --- Check your spelling email",
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                maxLength: 254,
              })}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="email"
          />
        </div>

        {/* Password Input */}
        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("password"),
              "password"
            )}
          >
            <CustomNextUiInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              startContent={
                <InputBGWrapperIcon>
                  <PadLockClosedBigIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              {...register("password", {
                required: "Invalid Password --- Password can't be empty.",
                setValueAs: (value) => value.trim(),
                maxLength: 30,
                minLength: 8,
              })}
              endContent={
                <>
                  <InputBGWrapperIcon
                    className={"absolute right-10 cursor-pointer"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeWithDashIcon fillColor={"fill-primary-color-P4"} />
                    ) : (
                      <EyeWithoutDashIcon fillColor={"fill-primary-color-P4"} />
                    )}
                  </InputBGWrapperIcon>

                  <InputBGWrapperIcon className={"cursor-pointer"}>
                    <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                  </InputBGWrapperIcon>
                </>
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.password?.type || backEndErrors?.message) &&
                  "form-input-error",
                input: "!pe-20",
              }}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="password"
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
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl p-1.5 flex justify-center items-center mt-8"
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
    </form>
  );
};

export default Form;
