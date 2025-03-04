import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import { studentLevels } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Controller } from "react-hook-form";

// Icons
import { AnalyticVerticalLinesIcon, EyeIcon } from "../../Icons";

const StudentPreference = ({ control, errors }) => {
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
        <Controller
          name="studentLevel"
          control={control}
          render={({ field, fieldState: { error: studentLevelError } }) => (
            <>
              {studentLevels?.map((level) => (
                <div
                  key={level.value}
                  className={level.value === "intermediate" ? "my-2" : ""}
                >
                  <CustomNextUiCheckbox
                    name="studentLevel"
                    classNames={{
                      label: "ST-4 border-0 ml-1",
                      wrapper: `${
                        studentLevelError?.message && "form-input-error"
                      } w-[19px] h-[19px]`,
                    }}
                    isSelected={field.value === level.value}
                    onChange={() => field.onChange(level.value)}
                  >
                    {level.label}
                  </CustomNextUiCheckbox>
                </div>
              ))}

              <SplitDynamicErrorZod message={studentLevelError?.message} />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default StudentPreference;
