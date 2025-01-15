import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../Globals/CustomNextUiInput";
import EmailPhoneSwitcher from "./EmailPhoneSwitcherLogin";
import { signIn } from "next-auth/react";

// React imports
import Image from "next/image";
import Link from "next/link";

// Images && icons
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import apple from "@/public/icons/apple.png";
import { ChevronRightDoorIcon } from "../Icons";

const LeftForm = ({
  handlePasswordChange,
  password,
  error,
  isPending,
  setToggleInput,
  toggleInput,
}) => {
  const validPhoneNumberErrors = ["Invalid Phone Number"];

  const validEmailErrors = [
    "Invalid Email",
    "No account exists for this email address.",
    "Email recently changed",
  ];

  const validPasswordErrors = [
    "Account Locked: Too many login attempts",
    "Invalid Password",
    "Wrong password",
    "Character limit",
  ];

  const isValidEmailError =
    error?.message && validEmailErrors.includes(error?.title);
  const isValidPhoneNumberError =
    error?.message && validPhoneNumberErrors.includes(error?.title);
  const isValidPasswordError =
    error?.message && validPasswordErrors.includes(error?.title);

  return (
    <div className="space-y-8">
      <div className="flex gap-3 mt-8">
        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
          onClick={() => signIn("google", { redirect: false })}
          type="button"
        >
          <Image
            alt="Google Original Icon"
            className="mx-auto w-[22px] h-[22px] object-contain"
            src={google}
          />
        </button>

        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
          type="button"
        >
          <Image
            alt="Microsoft Original Icon"
            className="mx-auto w-[22px] h-[22px] object-contain"
            src={microsoft}
          />
        </button>

        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
          type="button"
        >
          <Image
            alt="Apple Original Icon"
            className="mx-auto w-[22px] h-[22px] object-contain"
            src={apple}
          />
        </button>
      </div>

      <div>
        {/* Email || Phone Number Input */}
        <EmailPhoneSwitcher
          isValidPhoneNumberError={isValidPhoneNumberError}
          isValidEmailError={isValidEmailError}
          setToggleInput={setToggleInput}
          messageError={error?.message}
          toggleInput={toggleInput}
          titleError={error?.title}
        />

        {/* Password Input */}
        <div className="mt-3">
          <CustomNextUiInput
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            startContent={
              <Image className="w-9" src={passwordInput} alt="User Input" />
            }
            classNames={{
              inputWrapper: isValidPasswordError && "form-input-error",
            }}
          />

          {isValidPasswordError && (
            <ErrorMessageiPractis
              typeError={error?.title}
              descError={error?.message}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full MT-1 rounded-2xl py-3 px-4"
        >
          {isPending ? "Loading..." : "Presskey"}
        </button>

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

      <Link
        className="text-center block text-primary-color-P4 ST-4"
        href={"/account-assistance"}
      >
        I can’t sing in, help!
      </Link>
    </div>
  );
};

export default LeftForm;
