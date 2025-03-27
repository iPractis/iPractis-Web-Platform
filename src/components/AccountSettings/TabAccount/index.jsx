import SyncYourCalendar from "./SyncYourCalendar";
import ActivityLog from "./ActivityLog";
import Preferences from "./Preferences";
import DeleteAccount from "./DeleteAccount";

// External imports
import { useForm } from "react-hook-form";

const TabAccount = ({ activeTab }) => {
  const {
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form className={`${activeTab !== 1 && "hidden"} space-y-16 mb-24`}>
      <Preferences watch={watch} control={control} errors={errors} />

      <SyncYourCalendar />

      <ActivityLog />

      <DeleteAccount />
    </form>
  );
};

export default TabAccount;
