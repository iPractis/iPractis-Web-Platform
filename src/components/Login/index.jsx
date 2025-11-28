import AccountPrompt from "../Shared/AccountPrompt";
import WrapperForm from "./WrapperForm";

// Icons
import { UserAddIcon } from "../Icons";

export const Login = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="space-y-[64px] mt-8">
        {/* Login if there's an account */}
        <WrapperForm />

        {/* Register if user doesn't have an account */}
        <AccountPrompt
          descText={'Press on "Register" to create your account.'}
          titleText={`You don't have an account yet?`}
          headerContainerClassName={"px-0 -ml-[1px]"}
          titleIcon={
            <div className="w-12 h-12 bg-primary-color-P12 rounded-2xl p-3.5 flex items-center justify-center">
              <UserAddIcon />
            </div>
          }
          btnColor={"btn-primary"}
          hrefLink={"/register"}
          textLink={"Register"}
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
