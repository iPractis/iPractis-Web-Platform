import ActivityLog from "./ActivityLog";
import LogInID from "./LogInID";
import Password from "./Password";

// External imports
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const TabSecurity = ({ activeTab }) => {
  const { data: session } = useSession();

  const {
    formState: { errors },
    control,
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

      <ActivityLog />
    </form>
  );
};

export default TabSecurity;
