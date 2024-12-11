import TabsDisplayedInfo from "./TabsDisplayedInfo";
import TabsButtons from "./TabsButtons";

export const TeacherRegistration = () => {
  return (
    <section className="container-page px-3 py-12">
      {/* Tabs */}
      <TabsButtons />

      {/* Tabs displayed info */}
      <TabsDisplayedInfo />
    </section>
  );
};
