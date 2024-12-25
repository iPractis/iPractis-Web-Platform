"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import { logInUserOtp } from "@/src/lib/actions/authAction";
import { CheckedShieldIcon, HelpIcon } from "../Icons";
import SectionHeader from "../Globals/SectionHeader";
import {  useSearchParams } from "next/navigation";
import DualAction from "../Globals/DualAction";
import OTPInput from "react-otp-input";

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
      className="bg-primary-color-P12 p-8 mt-8 rounded-2xl"
    >
      <SectionHeader
        descriptionText="Enter your account details to access to your account."
        titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P1"} />}
        titleText={"Authenticator"}
        descriptionClassName={"mt-1"}
        titleClassName={"MT-SB-1"}
      />

      <div className="space-y-8">
        <p className={`ST-3 text-primary-color-P4 mt-[50px]`}>
          We just sent you an authentication number, please check your email and
          recopy the code below.
        </p>

        <OTPInput
          renderInput={(props) => <input {...props} />}
          containerStyle={"justify-between sm:gap-4 gap-2"}
          skipDefaultStyles
          onChange={setOtp}
          shouldAutoFocus
          inputType="tel"
          numInputs={6}
          value={otp}
          inputStyle={
            "text-center w-full h-[48px] bg-primary-color-P11 placeholder:text-primary-color-P4 text-primary-color-P4 hover:bg-secondary-color-S9 outline-none ST-3 rounded-2xl p-1.5"
          }
        />

        <DualAction
          leftLinkText={"Cancel"}
          leftLinkHref={"/login"}
          rightButtonText={isPending ? "Loading..." : "Log in"}
          rightButtonDisabled={isPending}
          rightButtonType={"submit"}
        />

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
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1"
        >
          <div className="flex-1">
            <HelpIcon fillColor={"fill-primary-color-P12"} />
          </div>

          <span className="flex-[90%]">Contact support</span>
        </button>
      </div>
    </form>
  );
};

export default TopColumn;
