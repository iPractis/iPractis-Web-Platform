import { CustomNextUiCheckbox } from "../../Globals/CustomNextUiCheckbox";
import SectionHeader from "../../Globals/SectionHeader";

// Icons
import { AnalyticVerticalLinesIcon } from "../../Icons";

const StudentPreference = () => {
  return (
    <>
      <SectionHeader
        descriptionText="Select the level you can teach"
        titleIcon={
          <AnalyticVerticalLinesIcon strokeColor={"stroke-primary-color-P1"} />
        }
        wrapperSectionHeaderClassName={"mb-[30px]"}
        titleText="Student's level"
        titleClassName="MT-SB-1"
      />

      {/* Checkboxes */}
      <div>
        <CustomNextUiCheckbox
          classNames={{
            label: "ST-4 border-0 ml-1",
            wrapper: "w-[19px] h-[19px]",
          }}
        >
          Beginner
        </CustomNextUiCheckbox>
      </div>

      <div className="my-2">
        <CustomNextUiCheckbox
          classNames={{
            label: "ST-4 border-0 ml-1",
            wrapper: "w-[19px] h-[19px]",
          }}
        >
          Intermediate
        </CustomNextUiCheckbox>
      </div>

      <div>
        <CustomNextUiCheckbox
          classNames={{
            label: "ST-4 border-0 ml-1",
            wrapper: "w-[19px] h-[19px]",
          }}
        >
          Advanced
        </CustomNextUiCheckbox>
      </div>
    </>
  );
};

export default StudentPreference;
