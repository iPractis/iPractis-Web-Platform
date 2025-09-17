import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import { logInUser } from "@/src/lib/actions/authAction";

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
} from "../Icons";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
    setValue,
  } = useForm({ mode: "onBlur" });
  const [showPassword, setShowPassword] = useState(false);
  const [backEndErrors, setBackEndErrors] = useState("");
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      const response = await logInUser(data);

      if (response?.message) {
        return setBackEndErrors({
          field: response?.field || "email",
          message: response.message,
          title: response.title || "Login Failed",
        });
      }

      if (response?.token) {
        console.log("Login successful:", response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userId", response.user.id);
        router.push("/dashboard");
      }
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
      className="bg-white rounded-2xl p-8 space-y-8 w-full max-w-md mx-auto animate-fade-in"
    >
      {/* Global Backend Error */}
      {backEndErrors?.field === "general" && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
          <strong className="font-semibold">{backEndErrors.title}:</strong>{" "}
          <span>{backEndErrors.message}</span>
          <button
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            onClick={() => setBackEndErrors("")}
            type="button"
          >
            ×
          </button>
        </div>
      )}

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
            placeholder="Email address"
            startContent={
              <InputBGWrapperIcon>
                <UserBigIcon fillColor={"fill-primary-color-P4"} />
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
              inputWrapper: `rounded-xl border px-3 py-2 transition-all ${
                frontEndErrors?.email?.type || backEndErrors?.field === "email"
                  ? "border-red-500 animate-shake"
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

        {(frontEndErrors?.email || backEndErrors?.field === "email") && (
          <p className="text-red-600 text-xs mt-1">
            {frontEndErrors?.email?.message || backEndErrors?.message}
          </p>
        )}
      </div>

      {/* Password Input */}
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            startContent={
              <InputBGWrapperIcon>
                <PadLockClosedBigIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <InputBGWrapperIcon
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeWithDashIcon fillColor={"fill-primary-color-P4"} />
                ) : (
                  <EyeWithoutDashIcon fillColor={"fill-primary-color-P4"} />
                )}
              </InputBGWrapperIcon>
            }
            isClearable
            classNames={{
              inputWrapper: `rounded-xl border px-3 py-2 transition-all ${
                frontEndErrors?.password?.type || backEndErrors?.field === "password"
                  ? "border-red-500 animate-shake"
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
          />
        </InputLeftStickStatus>

        <div className="flex justify-between items-start mt-1">
          {(frontEndErrors?.password || backEndErrors?.field === "password") && (
            <p className="text-red-600 text-xs">
              {frontEndErrors?.password?.message || backEndErrors?.message}
            </p>
          )}
          <Link href="/password-recovery" className="text-xs text-primary-color-P4 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          className="w-full rounded-xl py-3 font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          type="button"
        >
          Presskey
        </button>

        <ButtonSubmitForm
          buttonClassName="w-full rounded-xl py-3 flex items-center justify-center gap-2 font-medium bg-primary-color-P4 text-white hover:opacity-90 transition relative"
          ref={buttonRef}
        >
          <span>Log in</span>
          <ChevronRightDoorIcon fillColor={"fill-white group-hover:fill-white"} />
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
