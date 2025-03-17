import NotificationsCheckUp from "./NotificationsCheckUp";
import SecurityCheckUp from "./SecurityCheckUp";

const TabDashboard = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"} space-y-16`}>
      <SecurityCheckUp />

      <NotificationsCheckUp />
    </div>
  );
};

export default TabDashboard;
