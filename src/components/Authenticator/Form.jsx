"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import { errorFormMessages } from "@/src/data/dataAuthenticator";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import { logInUserOtp } from "@/src/lib/actions/authAction";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";

// React imports
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const buttonRef = useRef(null);

  const {
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
    control,
  } = useForm({ mode: "onBlur" });

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

        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("authNumber"),
              "authNumber"
            )}
          >
            <Controller
              name="authNumber"
              control={control}
              rules={{
                required:
                  "Invalid Authenticator Number --- Authenticator must be not empty.",
                minLength: 6,
              }}
              render={({ field, fieldState }) => (
                <div
                  onBlur={field.onBlur}
                  tabIndex={-1}
                >
                  <OTPInput
                    {...field}
                    skipDefaultStyles
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value)}
                    numInputs={6}
                    inputType="tel"
                    shouldAutoFocus
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
            fieldName="authNumber"
          />
        </div>

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
      </div>
    </form>
  );
};

export default Form;
