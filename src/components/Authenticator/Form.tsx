"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import { errorFormMessages } from "@/src/data/dataAuthenticator";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";

// React imports
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import Link from "next/link";

// Icons
import { ChevronRightDoorIcon } from "../Icons";

const Form = () => {
    const router = useRouter();
  
  const [backEndErrors, setBackEndErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3); // 🔥 only 3 tries allowed
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
    control,
  } = useForm({ mode: "onBlur" });

  // Submit OTP
  const onSubmit = async (data) => {
    if (triesLeft <= 0) {
      setBackEndErrors({
        message:
          "❌ You have exceeded the maximum attempts. Please request a new OTP.",
      });
      return;
    }

    setLoading(true);
    setBackEndErrors({});

    try {
      const authenticatorDetails = {
        otp: data.otp,
        email: searchParams?.get("email"),
      };

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authenticatorDetails),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ OTP verified -> redirect
        router.push("/dashboard")
      } else {
        // ❌ Wrong OTP -> reduce tries
        setTriesLeft((prev) => prev - 1);
        setBackEndErrors({
          message: `Invalid OTP. You have ${triesLeft - 1} attempt(s) left.`,
        });
      }
    } catch (error) {
      console.error(error);
      setBackEndErrors({
        message: "Something went wrong, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 sm:px-8 sm:mt-[50px] mt-8">
        <p className={`ST-3 text-primary-color-P4 mt-[50px]`}>
          We just sent you an authentication number, please check your email and
          recopy the code below.
        </p>

        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("otp"),
              "otp"
            )}
          >
            <Controller
              name="otp"
              control={control}
              rules={{
                required:
                  "Invalid Authenticator Number --- Authenticator must not be empty.",
                minLength: { value: 6, message: "OTP must be 6 digits" },
              }}
              render={({ field, fieldState }) => (
                <div onBlur={field.onBlur} tabIndex={-1}>
                  <OTPInput
                    {...field}
                    skipDefaultStyles
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value)}
                    numInputs={6}
                    inputType="tel"
                    shouldAutoFocus
                    disabled={triesLeft <= 0} // disable after max attempts
                    containerStyle="otp-inputs-container justify-between gap-4 sm:px-4"
                    inputStyle={`${
                      (fieldState.invalid || backEndErrors?.message) &&
                      "form-input-error"
                    } text-center w-full h-[48px] bg-primary-color-P11 placeholder:text-primary-color-P4 text-primary-color-P4 hover:bg-secondary-color-S9 outline-none ST-3 rounded-2xl p-1.5`}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              )}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
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

        <div className="flex items-center gap-4">
          <Link
            className="btn btn-primary w-full MT-1 rounded-2xl py-3 px-4"
            href={"/login"}
          >
            {"Cancel"}
          </Link>

          <button
            type="submit"
            disabled={loading || triesLeft <= 0}
            className="btn btn-secondary w-full MT-1 rounded-2xl p-1.5 flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none"
          >
            <span className="flex-1">
              {loading
                ? "Loading..."
                : triesLeft <= 0
                ? "Locked"
                : "Log in"}
            </span>
            <InputBGWrapperIcon>
              <ChevronRightDoorIcon
                fillcolor={
                  "fill-tertiary-color-SC5 group-hover:fill-tertiary-color-SC5"
                }
              />
            </InputBGWrapperIcon>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
