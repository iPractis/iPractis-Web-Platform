import AccountPrompt from "../Globals/AccountPrompt";
import { PadLockUserIcon } from "../Icons";
import TopColumn from "./TopColumn";

export const Register = () => {
  return (
    <section className="container-page-v3">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
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
