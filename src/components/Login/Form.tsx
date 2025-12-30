import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import SocialMediaButtons from "./SocialMediaButtons";
import DualButton from "../Shared/DualButton";
import { useAuth } from "@/src/hooks/useAuth";
import { errorFormMessages } from "@/src/data/dataLogin";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

import Link from "next/link";

// Images && icons
import {
  LoginIcon,
  EyeWithoutDashIcon,
  EyeWithDashIcon,
  CloseIcon,
  UserProfileIcon,
  PasswordHiddenIcon,
} from "../Icons";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
    setValue,
  } = useForm({ mode: "onSubmit" });
  const [showPassword, setShowPassword] = useState(false);
  const [backEndErrors, setBackEndErrors] = useState("");
  const buttonRef = useRef(null);
 const router = useRouter();
  const { refreshAuth } = useAuth();

const onSubmit = async (data) => {
  buttonRef.current.loading();
 

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important so httpOnly cookie is set
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("result", result)

    if (!response.ok) {
      console.log("api")
      // API returned error
      return setBackEndErrors({
        field: result?.field || "email",
        message: result?.message || "Login failed",
        title: result?.title || "Login Failed",
      });
    }

    // ✅ Success
    await refreshAuth(); // make sure AuthContext is updated
    router.push("/dashboard"); // navigate client-side (no full reload)
  } catch (error) {
    console.error("Login error:", error);
    setBackEndErrors({
      field: "general",
      message: "Something went wrong. Please try again.",
      title: "Error",
    });
  } finally {
    buttonRef.current.notIsLoading();
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[50px]">
      {/* Global Backend Error */}
      {backEndErrors?.field === "general" && (
        <DynamicInputErrorMessage
          errorMessages={{
            general: {
              server: {
                typeError: backEndErrors.title,
                descError: backEndErrors.message,
              },
            },
          }}
          frontEndErrors={{}}
          backEndErrors={{
            field: "general",
            title: backEndErrors.title,
            message: backEndErrors.message,
          }}
          fieldName="general"
          className="mb-8"
        />
      )}

      <div className="mb-8">
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
                <InputBGWrapperIcon>
                  <UserProfileIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                watch("email") && (
                  <InputBGWrapperIcon
                    className="cursor-pointer"
                    onClick={() => setValue("email", "")}
                  >
                    <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                  </InputBGWrapperIcon>
                )
              }
              isClearable
              classNames={{
                inputWrapper:
                  (frontEndErrors?.email?.type || backEndErrors?.field === "email") &&
                  "form-input-error",
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
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
        <div className="mt-2.5">
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
                <InputBGWrapperIcon>
                  <PasswordHiddenIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <div className="flex gap-[6px] transition-all">
                  <Link
                    className="bg-primary-color-P12 px-[12px] py-[6px] rounded-[10px]"
                    href={"/password-recovery"}
                  >
                    <span className="text-xs text-primary-color-P4 whitespace-nowrap">Forgot ?</span>
                  </Link>
                    <InputBGWrapperIcon
                      className=""
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeWithDashIcon fillcolor={"fill-primary-color-P4"} />
                      ) : (
                        <EyeWithoutDashIcon fillcolor={"fill-primary-color-P4"} />
                      )}
                    </InputBGWrapperIcon>

                  {watch("password") && (
                    <InputBGWrapperIcon
                      className="cursor-pointer"
                      onClick={() =>
                        setValue("password", "", {
                          shouldDirty: true,
                          shouldValidate: false,
                        })
                      }
                    >
                      <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  )}
                </div>
              }
              classNames={{
                inputWrapper:
                  (frontEndErrors?.password?.type || backEndErrors?.field === "password") &&
                  "form-input-error",
                input: "!pe-20",
              }}
              {...register("password", {
                required: "Password cannot be empty",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password cannot exceed 30 characters",
                },
                setValueAs: (value) => value.trim(),
              })}
              value={watch("password") || ""}
              onChange={(e) =>
                setValue("password", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: false,
                })
              }
            >
            </CustomNextUiInput>
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="password"
          />
        </div>
      </div>

      {/* Buttons */}
      <DualButton
        leftButtonText={"Presskey"}
        leftButtonClassName={"ST-3 h-[48px] bg-primary-color-P1 hover:bg-primary-color-P2 text-primary-color-P12"}
        leftButtonHref={"#"}
        customSubmitButton={
          <ButtonSubmitForm
            buttonClassName={
              "w-full flex justify-between items-center ST-3 p-[6px] rounded-[16px] bg-tertiary-color-SC6 hover:bg-tertiary-color-SC5 transition-colors"
            }
            ref={buttonRef}
          >
            <span className="ST-3 w-full text-primary-color-P12 text-center">
              Log in
            </span>
            <div className="ml-auto rounded-[10px] p-[8px] bg-primary-color-P12">
              <LoginIcon fillColor="fill-tertiary-color-SC5" />
            </div>
          </ButtonSubmitForm>
        }
      />

      {/* Social Media Buttons */}
      <div className="my-[32px]">
        <SocialMediaButtons />
      </div>

      {/* Help Link */}
      <Link
        className="text-center block ST-3 text-primary-color-P4 hover:text-primary-color-P1 hover:underline"
        href="/account-assistance"
      >
        I need help!
      </Link>
    </form>
  );
};

export default Form;
