"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage, DynamicInputErrorMessageWithZod } from "@/src/lib/utils/getZodValidations";
import OTPInput from "react-otp-input";
import { errorFormMessages as errorFormMessagesPasswordRecovery } from "@/src/data/dataPasswordRecovery";
import { errorFormMessages as errorFormMessagesOtp } from "@/src/data/dataAuthenticator";
import {
  CloseIcon,
  UserProfileIcon,
  PlayIcon,
} from "../Icons";

const PasswordResetForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [backEndErrors, setBackEndErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3);

  const router = useRouter();
  const buttonRef = useRef(null);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors: frontEndErrors },
  } = useForm();

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
          setBackEndErrors({ field: "email", message: res.error, title: "Error" });
          return;
        }
        setEmail(data.email);
        setStep(2);
      } else if (step === 2) {
        if (triesLeft <= 0) {
          setBackEndErrors({ field: "otp", message: "Too many attempts. Request new OTP.", title: "Too many attempts" });
          return;
        }

        const res = await callApi("/api/auth/verify-otp", { email, otp: data.otp });
        if (res.error) {
          setTriesLeft((prev) => prev - 1);
          setBackEndErrors({ field: "otp", message: `Invalid OTP. ${triesLeft - 1} attempts left.`, title: "Invalid OTP" });
          return;
        }
        
        // OTP verified - redirect to new-password page with email and otp
        router.push(`/new-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(data.otp)}`);
      }
    } catch (err) {
      console.error(err);
      setBackEndErrors({ field: "general", message: "Something went wrong. Please try again.", title: "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 px-0 mt-[50px] space-y-6">
      {/* General server error */}
      {backEndErrors?.field === "general" && (
        <DynamicInputErrorMessageWithZod message={backEndErrors.message} />
      )}

      {/* Step 1: Email */}
      {step === 1 && (
        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(frontEndErrors, backEndErrors, watch("email"), "email")}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <CustomNextUiInput
                  aria-label="Email address"
                  placeholder="Enter your email address"
                  type="email"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  startContent={
                    <InputBGWrapperIcon>
                      <UserProfileIcon fillcolor="fill-primary-color-P4" />
                    </InputBGWrapperIcon>
                  }
                  endContent={
                    field.value && (
                      <InputBGWrapperIcon
                        className="cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <CloseIcon strokeColor="stroke-primary-color-P4" />
                      </InputBGWrapperIcon>
                    )
                  }
                />
              )}
            />
          </InputLeftStickStatus>
          <DynamicInputErrorMessage
            errorMessages={errorFormMessagesPasswordRecovery}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="email"
          />
        </div>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <div>
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
                    (fieldState.invalid || backEndErrors?.field === "otp") && "form-input-error"
                  } text-center w-full h-[48px] bg-primary-color-P11 placeholder:text-primary-color-P4 text-primary-color-P4 hover:bg-secondary-color-S9 outline-none ST-3 rounded-2xl p-1.5`}
                  renderInput={(props) => <input {...props} />}
                />
              )}
            />
          </InputLeftStickStatus>
          <DynamicInputErrorMessage
            errorMessages={errorFormMessagesOtp}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="otp"
          />
          {triesLeft <= 0 && (
            <p className="text-red-500 text-sm mt-2">
              🚫 Too many failed attempts. Please request a new OTP.
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <ButtonSubmitForm
        ref={buttonRef}
        type="submit"
        disabled={loading || triesLeft <= 0}
        buttonClassName="bg-tertiary-color-SC6 hover:bg-tertiary-color-SC5 transition-colors w-full rounded-[16px] p-[6px] flex items-center justify-between"
      >
        <span className="text-primary-color-P12 pl-[16px]">
          {step === 1 ? "Send a request" : "Continue"}
        </span>
        <div className="bg-primary-color-P12 p-[8px] rounded-[10px]">
          <PlayIcon fillColor="fill-tertiary-color-SC5" />
        </div>
      </ButtonSubmitForm>
    </form>
  );
};

export default PasswordResetForm;
