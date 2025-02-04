import { CustomNextUiCheckbox } from "../../Globals/CustomNextUiCheckbox";
import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import SectionHeader from "../../Globals/SectionHeader";

// Icons
import { AnalyticVerticalLinesIcon, EyeIcon } from "../../Icons";

const StudentPreference = ({ setSelectedLevel, selectedLevel, errors }) => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px] mb-[50px] mt-16"
        descriptionText="You are about to create a teacher’s profile on iPractis platform, please fill the fields with the right information."
        titleIcon={<EyeIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Student preferences"
        titleClassName="MT-SB-1"
      />

      <div className="md:px-8">
        <SectionHeader
          descriptionText="Select the level you can teach"
          titleIcon={
            <AnalyticVerticalLinesIcon
              strokeColor={"stroke-primary-color-P1"}
            />
          }
          wrapperSectionHeaderClassName={"mb-[30px]"}
          titleText="Student's level"
          titleClassName="MT-SB-1"
        />

        {/* Radio Buttons */}
        <div>
          <CustomNextUiCheckbox
            name="studentLevel"
            classNames={{
              label: "ST-4 border-0 ml-1",
              wrapper: "w-[19px] h-[19px]",
            }}
            isSelected={selectedLevel === "Beginner"}
            onChange={() => setSelectedLevel("Beginner")}
          >
            Beginner
          </CustomNextUiCheckbox>
        </div>

        <div className="my-2">
          <CustomNextUiCheckbox
            name="studentLevel"
            classNames={{
              label: "ST-4 border-0 ml-1",
              wrapper: "w-[19px] h-[19px]",
            }}
            isSelected={selectedLevel === "Intermediate"}
            onChange={() => setSelectedLevel("Intermediate")}
          >
            Intermediate
          </CustomNextUiCheckbox>
        </div>

        <div>
          <CustomNextUiCheckbox
            name="studentLevel"
            classNames={{
              label: "ST-4 border-0 ml-1",
              wrapper: "w-[19px] h-[19px]",
            }}
            isSelected={selectedLevel === "Advanced"}
            onChange={() => setSelectedLevel("Advanced")}
          >
            Advanced
          </CustomNextUiCheckbox>
        </div>

        <ErrorZodResponse errors={errors} fieldName={"studentLevel"} />
      </div>
    </div>
  );
};

export default StudentPreference;
