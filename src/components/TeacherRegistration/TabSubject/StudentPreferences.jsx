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
        descriptionText="Select your preferences to connect with suitable students"
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] lg:p-4 p-8 lg:rounded-[30px] rounded-[32px] lg:max-w-[1000px] max-w-[398px] lg:h-[112px] h-[122px] flex items-center justify-between my-16"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[20px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <EyeIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Student preferences"
        titleClassName="MT-SB-1 lg:ml-[80px] md:ml-[60px] ml-[80px]"
        descriptionClassName="lg:ml-[80px] md:ml-[60px] ml-[80px]"
      />

      <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:-mt-[32px] md:-mt-[32px] -mt-[32px]">
        <div className="w-full">
          <div className="flex items-center gap-[10px] mb-[32px] h-[48px]">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F8F7F5] flex items-center justify-center p-[14px]">
              <AnalyticVerticalLinesIcon
                strokeColor={"stroke-primary-color-P1"}
              />
            </div>
            <div className="flex flex-col justify-center h-[48px]">
              <h3 className="MT-SB-1 text-sm leading-none">Student&apos;s level</h3>
              <p className="text-xs leading-none mt-1">Select the level you can teach</p>
            </div>
          </div>

          {/* Multiple Selection Checkboxes */}
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
                      isSelected={Array.isArray(field.value) ? field.value.includes(level.value) : false}
                      onValueChange={(isSelected) => {
                        const currentValues = Array.isArray(field.value) ? field.value : [];
                        if (isSelected) {
                          // Add the level if not already present
                          if (!currentValues.includes(level.value)) {
                            field.onChange([...currentValues, level.value]);
                          }
                        } else {
                          // Remove the level
                          field.onChange(currentValues.filter(val => val !== level.value));
                        }
                      }}
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
    </div>
  );
};

export default StudentPreference;
