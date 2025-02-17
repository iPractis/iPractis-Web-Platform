import SelectCountryAreaCode from "../Shared/SelectCountryAreaCode";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import { CloseIcon, MailIcon, PhoneIcon } from "../Icons";

// React imports
import Image from "next/image";

// Images && icons
import userInput from "@/public/icons/user-input.png";
import { useState } from "react";

const EmailPhoneSwitcherLogin = ({
  isValidPhoneNumberError,
  isValidEmailError,
  setToggleInput,
  messageError,
  toggleInput,
  titleError,
}) => {
  const [email, setEmail] = useState("");

  return toggleInput === "email" ? (
    // This is if the user switches to EMAIL (Default ONE)
    <div className="flex justify-between gap-2">
      <div className="flex-1">
        <CustomNextUiInput
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          placeholder="Enter your email address"
          startContent={
            <Image className="w-9" src={userInput} alt="User Input" />
          }
          endContent={
            email?.length > 0 && (
              <InputBGWrapperIcon
                className={"cursor-pointer"}
                onClick={() => setEmail("")}
              >
                <CloseIcon strokeColor={"stroke-primary-color-P4"} />
              </InputBGWrapperIcon>
            )
          }
          classNames={{
            inputWrapper: isValidEmailError && "form-input-error",
          }}
        />

        {isValidEmailError && (
          <ErrorMessageiPractis
            typeError={titleError}
            descError={messageError}
          />
        )}
      </div>

      {/* <button type="button" onClick={() => setToggleInput("phone")}>
        <InputBGWrapperIcon
          className={"bg-primary-color-P11 h-[48px] w-[48px] rounded-2xl"}
        >
          <PhoneIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>
      </button> */}
    </div>
  ) : (
    // This is if the user switches to PHONE NUMBER
    <div className="flex justify-between gap-2">
      <div className="flex-1">
        <CustomNextUiInput
          type="text"
          name="number"
          placeholder="Enter your phone ID"
          startContent={
            <span className="flex items-center gap-1.5">
              <Image className="w-9" src={userInput} alt="User Input" />

              <SelectCountryAreaCode />
            </span>
          }
          classNames={{
            inputWrapper: isValidPhoneNumberError && "form-input-error",
            input: ["ml-5"],
          }}
        />

        {isValidPhoneNumberError && (
          <ErrorMessageiPractis
            typeError={titleError}
            descError={messageError}
          />
        )}
      </div>

      <button type="button" onClick={() => setToggleInput("email")}>
        <InputBGWrapperIcon
          className={"bg-primary-color-P11 h-[48px] w-[48px] rounded-2xl"}
        >
          <MailIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>
      </button>
    </div>
  );
};

export default EmailPhoneSwitcherLogin;
