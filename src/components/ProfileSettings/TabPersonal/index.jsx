const TabPersonal = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 0 && "hidden"}`}>
      {/* Personal tab content - placeholder */}
      <div className="text-center py-20">
        <h2 className="MT-SB-1 text-primary-color-P4 mb-4">Personal</h2>
        <p className="ST-3 text-primary-color-P6">
          This section is coming soon.
        </p>
      </div>
    </div>
  );
};

export default TabPersonal;
