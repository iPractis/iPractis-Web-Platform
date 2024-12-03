import AccountPrompt from "../Globals/AccountPrompt";
import TopColumn from "./TopColumn";

// Images && icons
import lockedUser from "@/public/icons/locked-user.png";

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
          iconAlt={"Locked User Icon"}
          btnColor={"btn-primary"}
          hrefLink={"/login"}
          textLink={"Log in"}
          iconSrc={lockedUser}
        />
      </div>
    </section>
  );
};
