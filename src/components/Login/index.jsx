import AccountPrompt from "../Globals/AccountPrompt";
import TopColumn from "./TopColumn";

// Images && icons
import userAdd from "@/public/icons/user-add.png";

export const Login = () => {
  return (
    <section className="container-page-v2">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Login if there's an account */}
        <TopColumn />

        {/* Register if user doesn't have an account */}
        <AccountPrompt
          titleText={`You don't have an account yet?`}
          descText={'Press on "Register" to create your account.'}
          iconAlt={"User Add Icon"}
          btnColor={"btn-primary"}
          hrefLink={"/register"}
          textLink={"Register"}
          iconSrc={userAdd}
        />
      </div>
    </section>
  );
};
