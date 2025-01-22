import AccountPrompt from "../Globals/AccountPrompt";
import ContainerForm from "./ContainerForm";
import { UserAddIcon } from "../Icons";

export const Login = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4">
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
