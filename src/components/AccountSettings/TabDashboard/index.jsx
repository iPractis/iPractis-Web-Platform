import SecurityCheckUp from "./SecurityCheckUp";

const TabDashboard = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      <SecurityCheckUp />
    </div>
  );
};

export default TabDashboard;
