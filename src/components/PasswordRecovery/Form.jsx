"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import OTPInput from "react-otp-input";
import {
  MailIcon,
  CloseIcon,
  ChevronRightBiggerIcon,
  EyeWithoutDashIcon,
  EyeWithDashIcon,
} from "../Icons";

const PasswordResetForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [backEndErrors, setBackEndErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const router = useRouter();
  const buttonRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors: frontEndErrors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Validate password mismatch in real-time
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  }, [password, confirmPassword]);

  const callApi = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  const onSubmit = async (data) => {
    setBackEndErrors({});
    setLoading(true);

    try {
      if (step === 1) {
        const res = await callApi("/api/auth/send-otp", { email: data.email });
        if (res.error) {
          setBackEndErrors({ message: res.error });
          return;
        }
        setEmail(data.email);
        setStep(2);
      } else if (step === 2) {
        if (triesLeft <= 0) {
          setBackEndErrors({ message: "Too many attempts. Request new OTP." });
          return;
        }

        const res = await callApi("/api/auth/verify-otp", { email, otp: data.otp });
        if (res.error) {
          setTriesLeft((prev) => prev - 1);
          setBackEndErrors({ message: `Invalid OTP. ${triesLeft - 1} attempts left.` });
          return;
        }
        setStep(3);
      } else if (step === 3) {
        if (password !== confirmPassword) {
          setBackEndErrors({ message: "Passwords do not match" });
          return;
        }

        const res = await callApi("/api/auth/reset-password", {
          email,
          otp: data.otp,
          newPassword: data.password,
        });
        if (res.error) {
          setBackEndErrors({ message: res.error });
          return;
        }

        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setBackEndErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 px-0 mt-[50px] space-y-6">
      {/* Step 1: Email */}
      {step === 1 && (
        <CustomNextUiInput
          aria-label="Email address"
          placeholder="Enter your email address"
          startContent={<MailIcon fillcolor="fill-primary-color-P4" />}
          endContent={
            watch("email") && (
              <CloseIcon className="cursor-pointer" onClick={() => setValue("email", "")} />
            )
          }
          {...register("email", { required: "Email is required" })}
          type="email"
        />
      )}
      {step === 1 && backEndErrors?.message && (
        <p className="text-red-500 text-sm mt-1">{backEndErrors.message}</p>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <InputLeftStickStatus
          inputBarStatusClassName={getLeftStickInputColorStatus(frontEndErrors, backEndErrors, watch("otp"), "otp")}
        >
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: { value: 6, message: "OTP must be 6 digits" },
            }}
            render={({ field, fieldState }) => (
              <OTPInput
                {...field}
                skipDefaultStyles
                value={field.value || ""}
                onChange={(value) => field.onChange(value)}
                numInputs={6}
                inputType="tel"
                shouldAutoFocus
                disabled={triesLeft <= 0}
                containerStyle="otp-inputs-container justify-between gap-4 sm:px-4"
                inputStyle={`${
                  (fieldState.invalid || backEndErrors?.message) && "form-input-error"
                } text-center w-full h-[48px] bg-primary-color-P11 placeholder:text-primary-color-P4 text-primary-color-P4 hover:bg-secondary-color-S9 outline-none ST-3 rounded-2xl p-1.5`}
                renderInput={(props) => <input {...props} />}
              />
            )}
          />
        </InputLeftStickStatus>
      )}
      {step === 2 && backEndErrors?.message && (
        <p className="text-red-500 text-sm mt-1">{backEndErrors.message}</p>
      )}

      {/* Step 3: Password + Confirm Password */}
      {step === 3 && (
        <>
          {/* New Password */}
          <CustomNextUiInput
            aria-label="New Password"
            placeholder="Enter your new password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            endContent={
              <InputBGWrapperIcon
                className="absolute right-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeWithDashIcon fillcolor="fill-primary-color-P4" />
                ) : (
                  <EyeWithoutDashIcon fillcolor="fill-primary-color-P4" />
                )}
              </InputBGWrapperIcon>
            }
          />

          {/* Confirm Password */}
          <CustomNextUiInput
            aria-label="Confirm Password"
            placeholder="Confirm your new password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
          />
          {passwordMismatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </>
      )}

      {/* Submit Button */}
      <ButtonSubmitForm
        ref={buttonRef}
        type="submit"
        buttonClassName="btn btn-secondary w-full p-1.5 ps-4 rounded-2xl mt-8 flex items-center justify-center"
      >
        <span className="flex-1">
          {loading
            ? "Loading..."
            : step === 1
            ? "Send OTP"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </span>
        <ChevronRightBiggerIcon fillcolor="fill-tertiary-color-SC5" />
      </ButtonSubmitForm>
    </form>
  );
};

export default PasswordResetForm;
