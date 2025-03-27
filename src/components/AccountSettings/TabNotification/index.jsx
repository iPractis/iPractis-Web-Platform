import BrowserNotifications from "./BrowserNotifications";
import AudioNotification from "./AudioNotification";

// External imports
import { useForm } from "react-hook-form";

const TabNotification = ({ activeTab }) => {
  const {
    formState: { errors },
    control,
    isSubmitted,
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form className={`${activeTab !== 3 && "hidden"} space-y-16 mb-24`}>
      <BrowserNotifications isSubmitted={isSubmitted} control={control} />

      <AudioNotification isSubmitted={isSubmitted} control={control} />
    </form>
  );
};

export default TabNotification;
