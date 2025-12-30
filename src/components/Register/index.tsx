import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import AccountPrompt from "../Shared/AccountPrompt";
import WrapperForm from "./WrapperForm";

// Icons
import { ChevronRightDoorIcon, UserAvatarIcon } from "../Icons";

export const Register = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4 !rounded-[48px]">
        {/* Create an account if the user doesn't have one */}
        <WrapperForm />

        {/* Login if user have an account */}
        <AccountPrompt
          titleText={`You already have an account?`}
          linkButtonStyles={"!p-1.5 flex justify-center items-center"}
          descText={'Press on "Log in" to access to your account.'}
          headerContainerClassName={"px-0 -ml-1.5"}
          accountPromptPosition="vertical"
          titleIcon={
            <div className="bg-primary-color-P12 p-[14px] rounded-[16px]" >
              <UserAvatarIcon />
            </div>
          }
          btnColor={"btn-primary"}
          hrefLink={"/login"}
          textLink={
            <>
              <span className="flex-1 ST-3">Log in</span>

              <InputBGWrapperIcon>
                <ChevronRightDoorIcon
                  fillcolor={
                    "fill-primary-color-P1"
                  }
                />
              </InputBGWrapperIcon>
            </>
          }
          additionalText={
            <p className="ST-1 text-primary-color-P4 mt-8 px-4">
              By logging in or creating an account, you agree to iPractis&apos;s
              Terms of Service and Privacy Policy.
            </p>
          }
        />
      </div>
    </section>
  );
};
