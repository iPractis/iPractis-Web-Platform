import CalendarCheckUp from "./CalendarCheckUp";
import NotificationsCheckUp from "./NotificationsCheckUp";
import SecurityCheckUp from "./SecurityCheckUp";

const TabDashboard = ({ activeTab }) => {
  return (
    <form className={`${activeTab !== 0 && "hidden"} space-y-16 mb-24`}>
      <SecurityCheckUp />

      <NotificationsCheckUp />

      <CalendarCheckUp />
    </form>
  );
};

export default TabDashboard;
