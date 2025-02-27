import { DynamicInputErrorMessageWithZod } from "../../../lib/utils/getZodValidations";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { CheckIcon, CloseBoxIcon, UserLuggageIcon } from "../../Icons";

const StudentAge = ({
  control,
  frontEndErrors,
  backEndErrors,
  isSubmitted,
}) => {
  return (
    <div className="md:px-8 mt-[50px]">
      <SectionHeader
        wrapperSectionHeaderClassName={"pb-[30px]"}
        descriptionText="iPractis considers all students aged between 5 and 14 as young students. By activating this option, you agree to teach this age group."
        titleIcon={<UserLuggageIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Student's age"
        titleClassName="MT-SB-1"
      />

      <div className="mb-2.5">
        <Controller
          name="teachToYoungPersons"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Switch
              name="teachToYoungPersons"
              checked={value}
              onChange={onChange}
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
          )}
        />

        <DynamicInputErrorMessageWithZod
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="teachToYoungPersons"
        />
      </div>

      <div>
        <Controller
          name="teachToAmateurPersons"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Switch
              name="teachToAmateurPersons"
              checked={value}
              onChange={onChange}
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
              I accept to teach to mature student
            </Switch>
          )}
        />

        <DynamicInputErrorMessageWithZod
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="teachToAmateurPersons"
        />
      </div>
    </div>
  );
};

export default StudentAge;
