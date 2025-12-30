const TabDashboard = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 1 && "hidden"}`}>
      {/* Dashboard tab content - placeholder */}
      <div className="text-center py-20">
        <h2 className="MT-SB-1 text-primary-color-P4 mb-4">Dashboard</h2>
        <p className="ST-3 text-primary-color-P6">
          This section is still in the planning phase.
        </p>
      </div>
    </div>
  );
};

export default TabDashboard;
