"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { requestPasswordInput } from "@/src/lib/actions/authAction";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

// Icons && images
import { ChevronRightBiggerIcon, MailIcon } from "../Icons";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const [error, setError] = useState("");
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      const response = await requestPasswordInput(data);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setError({ message: response.message, title: response.title });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLeftStickStatus
        inputColorStatus={getLeftStickInputColorStatus(
          errors,
          error,
          watch("email")
        )}
      >
        <CustomNextUiInput
          startContent={
            <InputBGWrapperIcon>
              <MailIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          placeholder="Enter your email address"
          classNames={{
            inputWrapper:
              (errors?.email?.type || error?.message) && "form-input-error",
          }}
          {...register("email", {
            required: "Invalid Email --- Check your spelling email",
            pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
          })}
          name="email"
          type="text"
        />
      </InputLeftStickStatus>

      {(errors.email?.type === "required" && (
        <ErrorMessageiPractis
          typeError={"Invalid Email"}
          descError={"Email can't be empty."}
        />
      )) ||
        (errors.email?.type === "pattern" && (
          <ErrorMessageiPractis
            typeError={"Invalid Email"}
            descError={"Check your spelling email"}
          />
        )) ||
        (error?.title && (
          <ErrorMessageiPractis
            typeError={error?.title}
            descError={error?.message}
          />
        ))}

      <ButtonSubmitForm
        buttonClassName={
          "btn btn-secondary w-full p-1.5 ps-4 rounded-2xl MT-SB-1 mt-8 flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none"
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
