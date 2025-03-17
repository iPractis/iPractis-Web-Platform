const TabNotification = ({ activeTab }) => {
  return (
    <form className={`${activeTab !== 3 && "hidden"}`}>TabNotification</form>
  );
};

export default TabNotification;
