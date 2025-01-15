import AccountPrompt from "../Globals/AccountPrompt";
import { PadLockUserIcon } from "../Icons";
import TopColumn from "./TopColumn";

export const Register = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4 rounded-[32px]">
        {/* Create an account if the user doesn't have one */}
        <TopColumn />

        {/* Login if user have an account */}
        <AccountPrompt
          titleText={`You already have an account?`}
          descText={'Press on "Log in" to access to your account.'}
          accountPromptPosition="vertical"
          titleIcon={<PadLockUserIcon />}
          btnColor={"btn-primary"}
          hrefLink={"/login"}
          textLink={"Log in"}
        />
      </div>
    </section>
  );
};
