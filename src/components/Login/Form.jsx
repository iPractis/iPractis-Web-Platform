import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import { useAuth } from "@/src/hooks/useAuth";
import { errorFormMessages } from "@/src/data/dataLogin";
// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

import Link from "next/link";

// Images && icons
import {
  ChevronRightDoorIcon,
  PadLockClosedBigIcon,
  EyeWithoutDashIcon,
  EyeWithDashIcon,
  UserBigIcon,
  CloseIcon,
  UserProfileIcon,
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

    if (!response.ok) {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-8 w-full animate-fade-in"
        style={{
          marginLeft: '0px',
          marginRight: '0px'
        }}
    >
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

      {/* Email Input */}
      <div className="mb-3">
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
            placeholder="Email address"
            startContent={
              <InputBGWrapperIcon className="ml-[1px]">
                <UserProfileIcon fillcolor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              watch("email") && (
                <InputBGWrapperIcon
                  className="cursor-pointer mr-[3px]"
                  onClick={() => setValue("email", "")}
                >
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              )
            }
            isClearable
            classNames={{
              inputWrapper: `!bg-[#F8F7F5] rounded-xl border px-3 py-2 transition-all ${
                frontEndErrors?.email?.type || backEndErrors?.field === "email"
                  ? "form-input-error border-red-500 animate-shake"
                  : watch("email")
                  ? "border-green-500 focus:ring-green-400"
                  : "focus:ring-primary-color-P4"
              }`,
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
      <div className="mb-8">
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
            placeholder="Password"
            startContent={
              <InputBGWrapperIcon className="ml-[1px]">
                <PadLockClosedBigIcon fillcolor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <div className="flex items-center gap-1">
                <InputBGWrapperIcon
                  className="cursor-pointer px-3 py-1 mr-[2.5px] min-w-fit"
                  onClick={() => window.location.href = '/password-recovery'}
                >
                  <span className="text-xs text-primary-color-P4 whitespace-nowrap">Forgot?</span>
                </InputBGWrapperIcon>
                {watch("password") && (
                  <InputBGWrapperIcon
                    className="cursor-pointer mr-[2px]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeWithDashIcon fillcolor={"fill-primary-color-P4"} />
                    ) : (
                      <EyeWithoutDashIcon fillcolor={"fill-primary-color-P4"} />
                    )}
                  </InputBGWrapperIcon>
                )}
                {watch("password") && (
                  <InputBGWrapperIcon
                    className="cursor-pointer mr-[1px]"
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
              inputWrapper: `!bg-[#F8F7F5] rounded-xl border px-3 py-2 transition-all ${
                frontEndErrors?.password?.type || backEndErrors?.field === "password"
                  ? "form-input-error border-red-500 animate-shake"
                  : watch("password")
                  ? "border-green-500 focus:ring-green-400"
                  : "focus:ring-primary-color-P4"
              }`,
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
          />
        </InputLeftStickStatus>

        <DynamicInputErrorMessage
          errorMessages={errorFormMessages}
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="password"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 -ml-1.5 mb-8">
        <button
          className="w-[207px] h-12 rounded-2xl p-1.5 font-medium text-[14.4px] bg-black hover:bg-gray-800 text-white transition flex items-center justify-center"
          type="button"
        >
          Presskey
        </button>

        <ButtonSubmitForm
          buttonClassName="w-[207px] h-12 rounded-2xl p-1.5 flex items-center justify-center font-medium text-[14.4px] bg-[#1A47FF] text-white hover:opacity-90 transition relative"
          ref={buttonRef}
        >
          <span>Log in</span>
          <div className="absolute right-1.5 w-9 h-9 bg-white rounded-[10px] p-2 flex items-center justify-center">
            <ChevronRightDoorIcon fillcolor={"fill-[#1A47FF]"} />
          </div>
        </ButtonSubmitForm>
      </div>

      {/* Help Link */}
      <Link
        className="text-center block text-sm text-gray-500 hover:text-primary-color-P4 hover:underline"
        href="/account-assistance"
      >
        I need help!
      </Link>
    </form>
  );
};

export default Form;
