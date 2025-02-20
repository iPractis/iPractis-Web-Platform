import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import { errorFormMessages } from "@/src/data/dataLogin";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images && icons
import {
  ChevronRightDoorIcon,
  CloseIcon,
  EyeWithDashIcon,
  EyeWithoutDashIcon,
} from "../Icons";

import passwordInput from "@/public/icons/password-input.png";
import userInput from "@/public/icons/user-input.png";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
  } = useForm({ mode: "onBlur" });
  const [showPassword, setShowPassword] = useState(false);
  const [backEndErrors, setBackEndErrors] = useState("");
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      const response = await logInUser(data);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setBackEndErrors({
          message: response.message,
          title: response.title,
        });
      } else {
        router.push(`/authenticator?email=${formData.get("email")}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Form inputs */}
      <div>
        {/* Email Input */}
        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("email"),
              "email"
            )}
          >
            <CustomNextUiInput
              type="text"
              name="email"
              placeholder="Enter your email address"
              startContent={
                <Image className="w-9" src={userInput} alt="User Input" />
              }
              endContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.email?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("email", {
                required: "Invalid Email --- Check your spelling email",
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                maxLength: 254,
              })}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="email"
          />
        </div>

        {/* Password Input */}
        <div className="mt-3">
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("password"),
              "password"
            )}
          >
            <CustomNextUiInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              startContent={
                <Image className="w-9" src={passwordInput} alt="User Input" />
              }
              endContent={
                <>
                  <InputBGWrapperIcon
                    className={"absolute right-10 cursor-pointer"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeWithDashIcon fillColor={"fill-primary-color-P4"} />
                    ) : (
                      <EyeWithoutDashIcon fillColor={"fill-primary-color-P4"} />
                    )}
                  </InputBGWrapperIcon>

                  <InputBGWrapperIcon className={"cursor-pointer"}>
                    <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                  </InputBGWrapperIcon>
                </>
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.password?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("password", {
                required: "Invalid Password --- Password can't be empty",
                setValueAs: (value) => value.trim(),
                maxLength: 30,
                minLength: 8,
              })}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="password"
          />
        </div>
      </div>

      {/* Presskey and submit button */}
      <div className="flex items-center gap-4">
        <button
          className="btn btn-primary w-full MT-1 rounded-2xl py-3 px-4"
          type="button"
        >
          Presskey
        </button>

        <ButtonSubmitForm
          buttonClassName={
            "btn btn-secondary w-full MT-1 rounded-2xl p-1.5 flex items-center justify-center"
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

      {/* Link to account assistance  */}
      <Link
        className="text-center block text-primary-color-P4 ST-4"
        href={"/account-assistance"}
      >
        I can’t sing in, help!
      </Link>
    </form>
  );
};

export default Form;
