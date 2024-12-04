import CustomNextUiInput from "../Globals/CustomNextUiInput";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import Image from "next/image";

// Images && icons
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import userInput from "@/public/icons/user-input.png";
import apple from "@/public/icons/apple.png";

const LeftForm = () => {
  return (
    <div className="space-y-8">
      <div className="flex gap-3 sm:mt-[50px] mt-8">
        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
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
        {/* Email Input */}
        <div>
          <CustomNextUiInput
            color="modern"
            type="email"
            placeholder="Enter your phone or email address"
            startContent={
              <Image className="w-9" src={userInput} alt="User Input" />
            }
          />
        </div>

        {/* Password Input */}
        <div className="mt-3">
          <CustomNextUiInput
            color="modern"
            type="password"
            maxLength={32}
            placeholder="Enter your password"
            startContent={
              <Image className="w-9" src={passwordInput} alt="User Input" />
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
      >
        Log in
      </button>

      <p className="text-primary-color-P4 text-center ST-4">
        I can’t sing in, help!
      </p>
    </div>
  );
};

export default LeftForm;
