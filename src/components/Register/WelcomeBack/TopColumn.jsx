import CustomNextUiInput from "@/src/components/Globals/CustomNextUiInput";
import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Images && icons
import ErrorMessageiPractis from "../../Globals/ErrorMessageiPractis";
import userAddCircle from "@/public/icons/user-add-circle.png";
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import userInput from "@/public/icons/user-input.png";
import sparkle from "@/public/icons/sparkle.png";
import apple from "@/public/icons/apple.png";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="Start using iPractis by signing up quickly."
          titleClassName="MT-SB-1"
          titleText="Create an account"
          iconClassName="w-[20px]"
          iconAlt={"Sparkle Icon"}
          iconSrc={sparkle}
        />
      </div>

      {/* Sign Up Section */}
      <form className="bg-primary-color-P12 p-8 mt-8 rounded-2xl">
        <SectionHeader
          descriptionText="Manually enter your details to create a secure account."
          iconAlt={"Add User Icon"}
          descriptionClassName="mt-1"
          iconClassName="w-[24px]"
          titleClassName="MT-SB-1"
          iconSrc={userAddCircle}
          titleText="Create an account using ID"
        />

        <div className="space-y-[50px]">
          <div className="flex gap-3 mt-[50px]">
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

              <ErrorMessageiPractis
                typeError={"Invalid Email"}
                descError={"Check your spelling email"}
              />
            </div>

            {/* Password Input */}
            <div className="mt-3">
              <CustomNextUiInput
                color="modern"
                type="password"
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
            Create an account
          </button>
        </div>
      </form>
    </article>
  );
};

export default TopColumn;
