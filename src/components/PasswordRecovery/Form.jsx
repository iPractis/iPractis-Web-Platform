"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
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

// Icons && images
import { ChevronRightBiggerIcon, CloseIcon, MailIcon } from "../Icons";

const Form = () => {
  const [backEndErrors, setBackEndErrors] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
  } = useForm({ mode: "onBlur" });
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      const response = await requestPasswordInput(data);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setBackEndErrors({
          message: response.message,
          title: response.title,
        });
      } else {
        router.push(`/new-password-request-sent-sucessfully`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 px-0 mt-[50px]">
      <InputLeftStickStatus
        inputBarStatusClassName={getLeftStickInputColorStatus(
          frontEndErrors,
          backEndErrors,
          watch("email"),
          "email"
        )}
      >
        <CustomNextUiInput
          startContent={
            <InputBGWrapperIcon>
              <MailIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon className={"cursor-pointer"}>
              <CloseIcon strokeColor={"stroke-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          isClearable
          placeholder="Enter your email address"
          classNames={{
            inputWrapper:
              (frontEndErrors?.email?.type || backEndErrors?.message) &&
              "form-input-error",
          }}
          {...register("email", {
            required: "Invalid Email --- Check your spelling email",
            pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
          })}
          name="email"
          type="text"
        />
      </InputLeftStickStatus>

      <DynamicInputErrorMessage
        errorMessages={errorFormMessages}
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        fieldName="email"
      />

      <ButtonSubmitForm
        buttonClassName={
          "btn btn-secondary w-full p-1.5 ps-4 rounded-2xl MT-SB-1 mt-8 flex items-center justify-center"
        }
        ref={buttonRef}
      >
        <span className="flex-1">Send a request</span>

        <InputBGWrapperIcon>
          <ChevronRightBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
        </InputBGWrapperIcon>
      </ButtonSubmitForm>
    </form>
  );
};

export default Form;
