"use client";

import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { logInUserOtp } from "@/src/lib/actions/authAction";

// React imports
import { startTransition, useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OTPInput from "react-otp-input";
import Link from "next/link";

// Icons
import { ChevronRightDoorIcon } from "../Icons";

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
    <form onSubmit={handleSubmit}>
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
      </div>
    </form>
  );
};

export default TopColumn;
