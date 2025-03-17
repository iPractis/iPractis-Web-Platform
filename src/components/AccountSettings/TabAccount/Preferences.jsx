import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { useController } from "react-hook-form";

// Icons
import { SparkleIcon } from "../../Icons";

const Preferences = ({ control }) => {
  const {
    field: timeZone,
    fieldState: { error: timeZoneError },
  } = useController({
    name: "timeZone",
    control,
  });

  return (
    <>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px]"
        titleIcon={<SparkleIcon fillColor={"fill-primary-color-P1"} />}
        descriptionText={"Customize your account settings."}
        descriptionClassName={"mt-[4px]"}
        titleText={"Preferences"}
        titleClassName="MT-SB-1"
      />
    </>
  );
};

export default Preferences;
