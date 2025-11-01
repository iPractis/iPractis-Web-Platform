import AccountObservationCenter from "./AccountObservationCenter";
import CalendarCheckUp from "./CalendarCheckUp";
import NotificationsCheckUp from "./NotificationsCheckUp";
import RecentActivity from "./RecentActivity";
import SecurityCheckUp from "./SecurityCheckUp";

const TabDashboard = ({ activeTab }) => {
  return (
    <form className={`${activeTab !== 0 && "hidden"} space-y-16 mb-24`}>
      <SecurityCheckUp />
      <AccountObservationCenter/>
      <NotificationsCheckUp />

      <CalendarCheckUp />
    </form>
  );
};

export default TabDashboard;
