"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../../lib/utils/getZodValidations";
import { requestPasswordInput } from "@/src/lib/actions/authAction";
import { errorFormMessages } from "@/src/data/dataPasswordRecovery";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

// Icons
import { ChevronRightBiggerIcon, CloseIcon, MailIcon } from "../Icons";

const ResetPasswordForm = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [backEndErrors, setBackEndErrors] = useState("");
  const [email, setEmail] = useState(""); // keep email across steps
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
    setValue,
  } = useForm({ mode: "onBlur" });

  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();
    setBackEndErrors("");

    try {
      if (step === 1) {
        // Request reset link / OTP
        const response = await requestPasswordInput({ email: data.email });
        if (response?.error) {
          return setBackEndErrors(response.error);
        }
        setEmail(data.email);
        setStep(2);
      } else if (step === 2) {
        // Verify OTP
        const response = await verifyOtp({ email, otp: data.otp });
        if (response?.error) {
          return setBackEndErrors(response.error);
        }
        setStep(3);
      } else if (step === 3) {
        // Reset password
        const response = await resetPassword({
          email,
          otp: data.otp,
          newPassword: data.password,
        });
        if (response?.error) {
          return setBackEndErrors(response.error);
        }
        router.push("/password-reset-success");
      }
    } catch (error) {
      console.log(error);
      setBackEndErrors({
        message: "Something went wrong. Try again later.",
      });
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 px-0 mt-[50px] space-y-6">
      {/* STEP 1: Email */}
      {step === 1 && (
        <InputLeftStickStatus
          inputBarStatusClassName={getLeftStickInputColorStatus(
            frontEndErrors,
            backEndErrors,
            watch("email"),
            "email"
          )}
        >
          <CustomNextUiInput
            aria-label="Email address"
            startContent={
              <InputBGWrapperIcon>
                <MailIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              watch("email") && (
                <InputBGWrapperIcon
                  className={"cursor-pointer"}
                  onClick={() => setValue("email", "")}
                >
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              )
            }
            isClearable
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
              maxLength: 254,
            })}
            name="email"
            type="email"
          />
        </InputLeftStickStatus>
      )}

      {/* STEP 2: OTP */}
      {step === 2 && (
        <CustomNextUiInput
          aria-label="OTP"
          placeholder="Enter 6-digit OTP"
          {...register("otp", {
            required: "OTP is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "OTP must be 6 digits",
            },
          })}
          name="otp"
          type="text"
        />
      )}

      {/* STEP 3: New Password */}
      {step === 3 && (
        <CustomNextUiInput
          aria-label="New Password"
          placeholder="Enter your new password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          name="password"
          type="password"
        />
      )}

      {/* ERROR MESSAGES */}
      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        fieldName={step === 1 ? "email" : step === 2 ? "otp" : "password"}
      />

      {/* BUTTON */}
      <ButtonSubmitForm
        buttonClassName={
          "btn btn-secondary w-full p-1.5 ps-4 rounded-2xl mt-8 flex items-center justify-center disabled:opacity-60"
        }
        ref={buttonRef}
        type="submit"
      >
        <span className="flex-1">
          {step === 1 ? "Send Reset Code" : step === 2 ? "Verify Code" : "Reset Password"}
        </span>
        <InputBGWrapperIcon>
          <ChevronRightBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
        </InputBGWrapperIcon>
      </ButtonSubmitForm>
    </form>
  );
};

export default ResetPasswordForm;
