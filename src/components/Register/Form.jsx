"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Components
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import { DynamicInputErrorMessage } from "../../lib/utils/getZodValidations";
import PasswordLevels from "./PasswordLevels";
import SocialMediaButtons from "./SocialMediaButtons";

// Utils
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { getSecurityLevelMessage } from "@/src/lib/utils/getSecurityLevelMessage";
import { errorFormMessages } from "@/src/data/dataRegister";

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

// Validation Schema
import { z } from "zod";

const schema = z.object({
  firstName: z
    .string()
    .min(2, "Invalid First Name --- First name can't be empty.")
    .max(254)
    .regex(/^[A-Za-z\s-]+$/),
  lastName: z
    .string()
    .min(2, "Invalid Last Name --- Last name can't be empty.")
    .max(254)
    .regex(/^[A-Za-z\s-]+$/),
  email: z
    .string()
    .email("Invalid Email --- Check your spelling email")
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
  password: z
    .string()
    .min(8, "Invalid Password --- Password can't be empty.")
    .max(30),
});

const Form = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [backEndErrors, setBackEndErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const password = watch("password");

  const securityLevel = useMemo(() => {
    if (!password?.trim()) return "";
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (password.length < 10) return 3;
    return 4;
  }, [password]);

  const onSubmit = async (data) => {
    setIsPending(true);
    setBackEndErrors({});
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        // Set backend errors
        setBackEndErrors({ email: result.error });
        setError("email", { type: "server", message: result.error });
        return;
      }

      // Store JWT in localStorage
      localStorage.setItem("token", result.token);

      // Redirect to dashboard
router.push(`/authenticator?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setIsPending(false);
    }
  };

  const renderInput = ({
    name,
    placeholder,
    startIcon,
    type = "text",
    toggleable = false,
  }) => (
    <InputLeftStickStatus
      inputBarStatusClassName={getLeftStickInputColorStatus(
        errors,
        backEndErrors,
        watch(name),
        name
      )}
    >
      <CustomNextUiInput
        type={toggleable && showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        startContent={<InputBGWrapperIcon>{startIcon}</InputBGWrapperIcon>}
        endContent={
          <>
            {toggleable && (
              <InputBGWrapperIcon
                className="absolute right-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeWithDashIcon fillColor="fill-primary-color-P4" />
                ) : (
                  <EyeWithoutDashIcon fillColor="fill-primary-color-P4" />
                )}
              </InputBGWrapperIcon>
            )}
            <InputBGWrapperIcon className="cursor-pointer">
              <CloseIcon strokeColor="stroke-primary-color-P4" />
            </InputBGWrapperIcon>
          </>
        }
        isClearable
        classNames={{
          inputWrapper: `!bg-[#F8F7F5] ${
            (errors?.[name]?.type || backEndErrors?.[name]) &&
            "form-input-error"
          }`,
          ...(toggleable && { input: "!pe-20" }),
        }}
        {...register(name)}
      />
    </InputLeftStickStatus>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
      {/* First & Last Name */}
      <div className="flex gap-3 items-center">
        {renderInput({
          name: "firstName",
          placeholder: "First name",
          startIcon: <UserBigIcon fillColor="fill-primary-color-P4" />,
        })}
        {renderInput({
          name: "lastName",
          placeholder: "Last name",
          startIcon: <ThreeUsersIcon fillColor="fill-primary-color-P4" />,
        })}
      </div>
      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={errors}
        backEndErrors={backEndErrors}
        fieldName="firstName"
      />
      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={errors}
        backEndErrors={backEndErrors}
        fieldName="lastName"
      />

      {/* Email */}
      {renderInput({
        name: "email",
        placeholder: "Enter your email address",
        startIcon: <MailIcon fillColor="fill-primary-color-P4" />,
      })}
      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={errors}
        backEndErrors={backEndErrors}
        fieldName="email"
      />

      {/* Password */}
      {renderInput({
        name: "password",
        placeholder: "Enter your password",
        startIcon: <PadLockClosedBigIcon fillColor="fill-primary-color-P4" />,
        type: "password",
        toggleable: true,
      })}
      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={errors}
        backEndErrors={backEndErrors}
        fieldName="password"
      />
      <PasswordLevels securityLevel={securityLevel} />
      <h3 className="px-2.5 mt-2 ST-4 text-primary-color-P1">
        Password Security Level
        {securityLevel && `: ${getSecurityLevelMessage(securityLevel)}`}
      </h3>

        {/* Submit Button */}
        <button
          className="btn btn-secondary MT-SB-1 rounded-2xl p-1.5 flex justify-center items-center"
          style={{ marginTop: '32px', width: 'calc(100% + 8.5px)', marginLeft: '-7px' }}
          disabled={isPending}
          type="submit"
        >
        <span className="flex-1">
          {isPending ? "Loading..." : "Create an account"}
        </span>
        <InputBGWrapperIcon>
          <UserAddCircleMediumIcon fillColor="fill-tertiary-color-SC5" />
        </InputBGWrapperIcon>
      </button>

      {/* Social Media Buttons */}
      <div style={{ marginTop: '32px' }}>
        <SocialMediaButtons />
      </div>
    </form>
  );
};

export default Form;
