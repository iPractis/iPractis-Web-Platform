import AccountPrompt from "../Globals/AccountPrompt";
import ContainerForm from "./ContainerForm";
import { UserAddIcon } from "../Icons";

export const Login = () => {
  return (
    <section className="container-page-v8">
      <div className="my-8 rounded-[32px]">
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
