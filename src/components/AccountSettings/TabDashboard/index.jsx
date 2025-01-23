const TabDashboard = ({ activeTab }) => {
    return <div className={`${activeTab !== 0 && "hidden"}`}>TabDashboard</div>;
  };
  
  export default TabDashboard;