import LogInID from "./LogInID";

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
    <form className={`${activeTab !== 2 && "hidden"}`}>
      <LogInID
        userEmail={session?.user?.email}
        errors={errors}
      />
    </form>
  );
};

export default TabSecurity;
