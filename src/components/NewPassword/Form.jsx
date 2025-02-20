"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import getSecurityLevelMessage from "@/src/lib/utils/getSecurityLevelMessage";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import { newPasswordInputs } from "@/src/lib/actions/authAction";
import { errorFormMessages } from "@/src/data/dataNewPassword";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import PasswordLevels from "../Register/PasswordLevels";
import DualButton from "../Shared/DualButton";

// React imports
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// Icons
import { ThreeAstheristiksBiggerIcon } from "../Icons";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
  } = useForm({ mode: "onBlur" });
  const [backEndErrors, setBackEndErrors] = useState("");
  const [securityLevel, setSecurityLevel] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      newPasswordDetails = { ...data, token };

      const response = await newPasswordInputs(newPasswordDetails);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setBackEndErrors({
          message: response.message,
          title: response.title,
        });
      } else {
        router.push(`/password-updated-successfully`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  const password = watch("password");

  useEffect(() => {
   if (!password?.trim()) {
      setSecurityLevel("");
    } else if (password.length < 6) {
      setSecurityLevel(1);
    } else if (password.length < 8) {
      setSecurityLevel(2);
    } else if (password.length < 10) {
      setSecurityLevel(3);
    } else {
      setSecurityLevel(4);
    }
  }, [password]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 mt-[50px]">
      <div className="mb-8">
        {/* New Password */}
        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("password"),
              "password"
            )}
          >
            <CustomNextUiInput
              type="password"
              name="password"
              placeholder="Enter your new password"
              startContent={
                <InputBGWrapperIcon>
                  <ThreeAstheristiksBiggerIcon
                    fillColor={"fill-primary-color-P4"}
                  />
                </InputBGWrapperIcon>
              }
              {...register("password", {
                required: "Invalid Password --- Password can't be empty.",
                setValueAs: (value) => value.trim(),
                maxLength: 30,
                minLength: 8,
              })}
              classNames={{
                inputWrapper:
                  (frontEndErrors?.password?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="password"
          />
        </div>

        {/* Repeat password */}
        <div className="mt-2.5">
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("repeatedPassword"),
              "repeatedPassword"
            )}
          >
            <CustomNextUiInput
              type="password"
              name="repeatedPassword"
              placeholder="Retape your new password"
              {...register("repeatedPassword", {
                required:
                  "Invalid Repeated Password --- Password repeated can't be empty.",
                setValueAs: (value) => value.trim(),
                maxLength: 30,
                minLength: 8,
              })}
              startContent={
                <InputBGWrapperIcon>
                  <ThreeAstheristiksBiggerIcon
                    fillColor={"fill-primary-color-P4"}
                  />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper:
                  (frontEndErrors?.repeatedPassword?.type ||
                    backEndErrors?.message) &&
                  "form-input-error",
              }}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="repeatedPassword"
          />
        </div>

        <PasswordLevels securityLevel={securityLevel} />

        <h3 className="px-2.5 mt-2 ST-4 text-primary-color-P1">
          Password Security Level{securityLevel && ":"}
          <span className="ps-1">{getSecurityLevelMessage(securityLevel)}</span>
        </h3>
      </div>

      <DualButton
        leftButtonText={"Cancel"}
        leftButtonHref={"/login"}
        customSubmitButton={
          <ButtonSubmitForm
            buttonClassName={
              "btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
            }
            ref={buttonRef}
          >
            Change password
          </ButtonSubmitForm>
        }
      />
    </form>
  );
};

export default Form;
