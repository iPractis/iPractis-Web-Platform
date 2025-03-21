import Preferences from "./Preferences";

// External imports
import { useForm } from "react-hook-form";

const TabAccount = ({ activeTab }) => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form className={`${activeTab !== 1 && "hidden"} space-y-16 mb-24`}>
      <Preferences watch={watch} control={control} errors={errors} />
    </form>
  );
};

export default TabAccount;
