const TabNotification = ({ activeTab }) => {
    return <div className={`${activeTab !== 3 && "hidden"}`}>TabNotification</div>;
  };
  
  export default TabNotification;