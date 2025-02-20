"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import { errorFormMessages } from "@/src/data/dataAuthenticator";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { logInUserOtp } from "@/src/lib/actions/authAction";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";

// React imports
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import Link from "next/link";

// Icons
import { ChevronRightDoorIcon } from "../Icons";

const Form = () => {
  const [state, formAction] = useActionState(logInUserOtp, {});

  const [backEndErrors, setBackEndErrors] = useState({
    field: state?.formError?.field,
    message: state?.formError?.message,
    title: state?.formError?.title,
  });

  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const buttonRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors: frontEndErrors }, watch, } = useForm({ mode: "onBlur" });

  // Waiting for sever action response and if everything is SUCCESS we redirect to homepage
  useEffect(() => {
    if (state?.success === "ok") {
      window.location.href = "/";
    }
  }, [state?.success]);

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      const authenticatorDetails = {
        ...data,
        email: searchParams?.get("email"),
      };

      startTransition(() => {
        formAction(authenticatorDetails);
      });
    } catch (error) {
      console.log(error);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 sm:px-8 sm:mt-[50px] mt-8">
        <p className={`ST-3 text-primary-color-P4 mt-[50px]`}>
          We just sent you an authentication number, please check your email and
          recopy the code below.
        </p>

        <InputLeftStickStatus
          inputBarStatusClassName={getLeftStickInputColorStatus(
            frontEndErrors,
            backEndErrors,
            watch("authNumber"),
            "authNumber"
          )}
        >
          <OTPInput
            renderInput={(props) => (
              <input
                {...register("authNumber", {
                  required:
                    "Invalid Authenticator Number --- Authenticator must be 6 digits",
                })}
                {...props}
              />
            )}
            containerStyle={
              "otp-inputs-container justify-between gap-4 sm:px-4"
            }
            skipDefaultStyles
            onChange={setOtp}
            shouldAutoFocus
            inputType="tel"
            numInputs={6}
            value={otp}
            inputStyle={`${
              frontEndErrors?.authNumber?.type || backEndErrors?.message && "form-input-error"
            } text-center w-full h-[48px] bg-primary-color-P11 placeholder:text-primary-color-P4 text-primary-color-P4 hover:bg-secondary-color-S9 outline-none ST-3 rounded-2xl p-1.5`}
          />
        </InputLeftStickStatus>

        <div className="flex items-center gap-4">
          <Link
            className="btn btn-primary w-full MT-1 rounded-2xl py-3 px-4"
            href={"/login"}
          >
            {"Cancel"}
          </Link>

          <ButtonSubmitForm
            buttonClassName={
              "btn btn-secondary w-full p-1.5 ps-4 rounded-2xl MT-SB-1 flex items-center justify-center"
            }
            ref={buttonRef}
          >
            <span className="flex-1">Log in</span>

            <InputBGWrapperIcon>
              <ChevronRightDoorIcon
                fillColor={
                  "fill-tertiary-color-SC5 group-hover:fill-tertiary-color-SC5"
                }
              />
            </InputBGWrapperIcon>
          </ButtonSubmitForm>
        </div>

        <DynamicInputErrorMessage
          errorMessages={errorFormMessages}
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="authNumber"
        />
      </div>
    </form>
  );
};

export default Form;
