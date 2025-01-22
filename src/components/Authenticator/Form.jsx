"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import { logInUserOtp } from "@/src/lib/actions/authAction";
import { CheckedShieldIcon, ChevronRightDoorIcon, HelpIcon } from "../Icons";
import SectionHeader from "../Globals/SectionHeader";
import { useSearchParams } from "next/navigation";
import OTPInput from "react-otp-input";
import Link from "next/link";

const TopColumn = () => {
  const [state, formAction, isPending] = useActionState(logInUserOtp, {});
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");

  // Waiting for sever action response and if everything is SUCCESS we redirect to homepage
  useEffect(() => {
    if (state?.success === "ok") {
      window.location.href = "/";
    }
  }, [state?.success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("otp", otp);
    formData.append("email", searchParams?.get("email"));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      // action={formAction}
    >
      <SectionHeader
        descriptionText="Enter your account details to access to your account."
        titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P1"} />}
        titleText={"Authenticator"}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleClassName={"MT-SB-1"}
      />

      <div className="space-y-8 sm:px-8 sm:mt-[50px] mt-8">
        <p className={`ST-3 text-primary-color-P4 mt-[50px]`}>
          We just sent you an authentication number, please check your email and
          recopy the code below.
        </p>

        <OTPInput
          renderInput={(props) => <input {...props} />}
          containerStyle={"otp-inputs-container justify-between gap-4 sm:px-4"}
          skipDefaultStyles
          onChange={setOtp}
          shouldAutoFocus
          inputType="tel"
          numInputs={6}
          value={otp}
          inputStyle={`${
            state?.formError?.message && "form-input-error"
          } text-center w-full h-[48px] bg-primary-color-P11 placeholder:text-primary-color-P4 text-primary-color-P4 hover:bg-secondary-color-S9 outline-none ST-3 rounded-2xl p-1.5`}
        />

        <div className="flex items-center gap-4">
          <Link
            className="btn btn-primary w-full MT-1 rounded-2xl py-3 px-4"
            href={"/login"}
          >
            {"Cancel"}
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-secondary w-full MT-1 rounded-2xl p-1.5 flex items-center justify-center"
          >
            <span className="flex-1">
              {isPending ? "Loading..." : "Log in"}
            </span>{" "}
            <InputBGWrapperIcon>
              <ChevronRightDoorIcon
                fillColor={
                  "fill-tertiary-color-SC5 group-hover:fill-tertiary-color-SC5"
                }
              />
            </InputBGWrapperIcon>
          </button>
        </div>

        {state?.formError?.message && (
          <ErrorMessageiPractis
            typeError={state?.formError?.title}
            descError={state?.formError?.message}
          />
        )}

        <p className="text-primary-color-P4 ST-4">
          Haven’t receive the code? 3:00 Minutes
        </p>

        {/* Contact Support Details */}
        <p className={`ST-3 text-primary-color-P1`}>
          Recover your account easily using your registered phone number.
          Receive a secure SMS verification code to regain access and reset your
          authentication settings.
        </p>

        <button
          type="button"
          className="btn btn-primary w-full p-1.5 rounded-2xl flex gap-5 items-center MT-SB-1"
        >
          <InputBGWrapperIcon>
            <HelpIcon fillColor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>

          <span>Contact support</span>
        </button>
      </div>
    </form>
  );
};

export default TopColumn;
