import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import { studentLevels } from "@/src/data/dataTeacherRegistration";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import IconHeader from "../../Shared/IconHeader";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { PersonWithGraduationCapLikeIcon } from "../../Icons";
import { AnalyticVerticalLinesIcon } from "../../Icons";
import { CheckIcon, CloseBoxIcon, Clock1220Icon, GenderIcon } from "../../Icons";

const StudentPreference = ({ control, isSubmitted }) => {
  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<PersonWithGraduationCapLikeIcon fillcolor="fill-primary-color-P1" />}
        titleText="Student preferences"
        descriptionText="Select your preferences to connect with suitable students"
        titleClassName="MT-SB-1"
      />

      <SectionContent className="space-y-[50px]">
        {/* Student Level */}
        <div>
          <IconHeader
            icon={<AnalyticVerticalLinesIcon strokeColor="stroke-primary-color-P1" />}
            title="Student's level"
            description="Select the level you can teach"
          />

          {/* Multiple Selection Checkboxes */}
          <div className="ml-2 space-y-1">
            <Controller
              name="studentLevel"
              control={control}
              render={({ field, fieldState: { error: studentLevelError } }) => (
                <>
                  {studentLevels?.map((level) => (
                    <div
                      key={level.value}
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

        {/* Age Restriction */}
        <div>
          <IconHeader
            icon={<Clock1220Icon fillcolor="fill-primary-color-P1" />}
            title="Age restriction"
            description="Define your preferred student age groups"
          />

          <div className="mb-2.5">
            <Controller
              name="teachToYoungPersons"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Switch
                    name="teachToYoungPersons"
                    isSelected={value}
                    onValueChange={onChange}
                    size="sm"
                    classNames={{
                      wrapper: `${
                        !value && isSubmitted
                          ? "form-input-error"
                          : "bg-primary-color-P6"
                      } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                      thumb: "bg-primary-color-P12",
                      label: "text-primary-color-P1 ST-4 ml-1",
                    }}
                    thumbIcon={({ isSelected }) =>
                      isSelected ? (
                        <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                      ) : (
                        <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                      )
                    }
                  >
                    I accept to teach to young student
                  </Switch>

                  <SplitDynamicErrorZod message={error?.message} />
                </>
              )}
            />
          </div>

          <div className="mb-2.5">
            <Controller
              name="teachToAmateurPersons"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Switch
                    name="teachToAmateurPersons"
                    isSelected={value}
                    onValueChange={onChange}
                    size="sm"
                    classNames={{
                      wrapper: `${
                        !value && isSubmitted
                          ? "form-input-error"
                          : "bg-primary-color-P6"
                      } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                      thumb: "bg-primary-color-P12",
                      label: "text-primary-color-P1 ST-4 ml-1",
                    }}
                    thumbIcon={({ isSelected }) =>
                      isSelected ? (
                        <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                      ) : (
                        <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                      )
                    }
                  >
                    I accept to teach to mature students
                  </Switch>

                  <SplitDynamicErrorZod message={error?.message} />
                </>
              )}
            />
          </div>
        </div>

        {/* Gender Restriction */}
        <div>
          <IconHeader
            icon={<GenderIcon fillcolor="fill-primary-color-P1" />}
            title="Gender restriction"
            description="Pick your student gender preference."
          />

          <div>
            <Controller
              name="teachToSameGender"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Switch
                    name="teachToSameGender"
                    isSelected={value}
                    onValueChange={onChange}
                    size="sm"
                    classNames={{
                      wrapper: `${
                        !value && isSubmitted
                          ? "form-input-error"
                          : "bg-primary-color-P6"
                      } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                      thumb: "bg-primary-color-P12",
                      label: "text-primary-color-P1 ST-4 ml-1",
                    }}
                    thumbIcon={({ isSelected }) =>
                      isSelected ? (
                        <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                      ) : (
                        <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                      )
                    }
                  >
                    I want only to teach my own gender
                  </Switch>

                  <SplitDynamicErrorZod message={error?.message} />
                </>
              )}
            />
          </div>
        </div>
      </SectionContent>
    </SectionWrapper>
  );
};

export default StudentPreference;
