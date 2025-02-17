import SelectCountryAreaCode from "../Shared/SelectCountryAreaCode";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import { useState } from "react";

// Icons
import { CloseIcon, MailIcon, PhoneIcon } from "../Icons";

const EmailPhoneSwitcherRegister = ({
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
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          startContent={
            <InputBGWrapperIcon
              className={
                "bg-primary-color-P12 h-[36px] w-[36px] rounded-[10px]"
              }
            >
              <MailIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
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
          <PhoneIcon fillColor={"fill-primary-color-P4"} />
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
          placeholder="Phone number"
          startContent={
            <span className="flex items-center gap-1.5">
              {/* <Image className="w-9" src={userInput} alt="User Input" /> */}
              <InputBGWrapperIcon
                className={
                  "bg-primary-color-P12 h-[36px] w-[36px] rounded-[10px]"
                }
              >
                <PhoneIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>

              <SelectCountryAreaCode />
            </span>
          }
          classNames={{
            inputWrapper: isValidPhoneNumberError && "form-input-error",
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

export default EmailPhoneSwitcherRegister;
