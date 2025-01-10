import WorkTimePreferences from "./WorkTimePreferences";
import WorkSchedule from "./WorkSchedule";

const TabAvailability = ({ activeTab, saved }) => {
  return (
    <div className={`${activeTab !== 3 && "hidden"}`}>
      {saved ? (
        <div>
          {/* Información que aparece después de hacer clic en Save and Continue */}
          <h2>Availability Information Saved</h2>
          <p>Your availability has been successfully saved!</p>
          <p>Your availability has been successfully saved!</p>
          <p>Your availability has been successfully saved!</p>
          <p>Your availability has been successfully saved!</p>
          <p>Your availability has been successfully saved!</p>
        </div>
      ) : (
        <>
          <WorkTimePreferences />
          <WorkSchedule />
        </>
      )}
    </div>
  );
};

export default TabAvailability;
