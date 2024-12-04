import CustomNextUiInput from "../Globals/CustomNextUiInput";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import SectionHeader from "../Globals/SectionHeader";
import Image from "next/image";

// Images && icons
import passwordInput from "@/public/icons/password-input.png";
import circleAlert from "@/public/icons/circle-alert.png";
import userInput from "@/public/icons/user-input.png";

const Form = () => {
  return (
    <article className="flex-1 w-full">
      <SectionHeader
        descriptionText="We need this information to assist you effectively"
        iconAlt={"Locked User Icon"}
        descriptionClassName="mt-1"
        iconClassName="w-[24px]"
        titleClassName="MT-SB-1"
        titleText="Contact ID"
        iconSrc={circleAlert}
      />

      <div className="my-[50px]">
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
            maxLength={32}
            placeholder="Enter your password"
            startContent={
              <Image className="w-9" src={passwordInput} alt="User Input" />
            }
          />
        </div>
      </div>
    </article>
  );
};

export default Form;
