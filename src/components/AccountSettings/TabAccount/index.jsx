const TabAccount = ({ activeTab }) => {
  return <div className={`${activeTab !== 1 && "hidden"}`}>TabAccount</div>;
};

export default TabAccount;
