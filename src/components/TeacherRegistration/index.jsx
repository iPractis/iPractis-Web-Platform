import SectionHeader from "../Globals/SectionHeader";
import { DocumentIcon } from "../Icons";
import Tabs from "./Tabs/index";

export const TeacherRegistration = () => {
  return (
    <section className="container-page px-3 py-12">
      <SectionHeader
        titleText="Complete the application form"
        descriptionText="Fill the form with all the necessary information, we will review them as soon as possible."
        titleIcon={<DocumentIcon />}
        titleClassName="MT-SB-1"
      />

      {/* Tabs */}
      <Tabs />
    </section>
  );
};
