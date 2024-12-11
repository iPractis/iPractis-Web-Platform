import SectionHeader from "../Globals/SectionHeader";
import { DocumentIcon } from "../Icons";

const TabsButtons = () => {
  return (
    <article>
      <SectionHeader
        titleText="Complete the application form"
        descriptionText="Fill the form with all the necessary information, we will review them as soon as possible."
        titleIcon={<DocumentIcon />}
        titleClassName="MT-SB-1"
      />
    </article>
  );
};

export default TabsButtons;
