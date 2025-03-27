import MultiStepVerification from "./MultiStepVerification";
import ConnectYourAccount from "./ConnectYourAccount";
import Password from "./Password";
import LogInID from "./LogInID";
import Devices from "./Devices";

// External imports
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const TabSecurity = ({ activeTab }) => {
  const { data: session } = useSession();

  const {
    formState: { errors },
    control,
    isSubmitted,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: session?.user?.email,
    },
  });

  return (
    <form className={`${activeTab !== 2 && "hidden"} space-y-16 mb-24`}>
      <LogInID userEmail={session?.user?.email} errors={errors} />

      <Password />

      <MultiStepVerification
        isSubmitted={isSubmitted}
        control={control}
        errors={errors}
      />

      <ConnectYourAccount />

      <Devices />
    </form>
  );
};

export default TabSecurity;
