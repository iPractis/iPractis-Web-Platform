import MultiStepVerification from "./MultiStepVerification";
import ConnectYourAccount from "./ConnectYourAccount";
import Password from "./Password";
import LogInID from "./LogInID";
import Devices from "./Devices";

// External imports
import { useAuth } from "@/src/hooks/useAuth";
import { useForm } from "react-hook-form";

const TabSecurity = ({ activeTab }) => {
  const { user } = useAuth();

  const {
    formState: { errors },
    control,
    isSubmitted,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: user?.email,
    },
  });

  return (
    <form className={`${activeTab !== 2 && "hidden"} space-y-16 mb-24`}>
      <LogInID userEmail={user?.email} errors={errors} />

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
