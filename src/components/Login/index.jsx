import AccountPrompt from "../Globals/AccountPrompt";
import ContainerForm from "./ContainerForm";
import { UserAddIcon } from "../Icons";

export const Login = () => {
  return (
    <section className="container-page-v2">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Login if there's an account */}
        <ContainerForm />

        {/* Register if user doesn't have an account */}
        <AccountPrompt
          titleText={`You don't have an account yet?`}
          descText={'Press on "Register" to create your account.'}
          titleIcon={<UserAddIcon />}
          btnColor={"btn-primary"}
          hrefLink={"/register"}
          textLink={"Register"}
        />
      </div>
    </section>
  );
};
