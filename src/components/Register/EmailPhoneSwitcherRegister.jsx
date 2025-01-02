import SelectCountryAreaCode from "../Globals/SelectCountryAreaCode";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../Globals/CustomNextUiInput";
import { MailIcon, PhoneIcon } from "../Icons";

const EmailPhoneSwitcherRegister = ({
  isValidPhoneNumberError,
  isValidEmailError,
  setToggleInput,
  messageError,
  toggleInput,
  titleError,
}) => {
  return toggleInput === "email" ? (
    // This is if the user switches to EMAIL (Default ONE)
    <div className="flex justify-between gap-2">
      <div className="flex-1">
        <CustomNextUiInput
          type="text"
          name="email"
          placeholder="Enter your email address"
          startContent={
            <InputBGWrapperIcon
              className={
                "bg-primary-color-P12 h-[36px] w-[36px] rounded-[10px]"
              }
            >
              <MailIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
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

      <button type="button" onClick={() => setToggleInput("phone")}>
        <InputBGWrapperIcon
          className={"bg-primary-color-P11 h-[48px] w-[48px] rounded-2xl"}
        >
          <PhoneIcon fillColor={"fill-primary-color-P4"} />
        </InputBGWrapperIcon>
      </button>
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
