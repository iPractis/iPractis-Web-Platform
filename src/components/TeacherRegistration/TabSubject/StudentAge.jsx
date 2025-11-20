import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { CheckIcon, Clock1220Icon, CloseBoxIcon, UserLuggageIcon } from "../../Icons";

const StudentAge = ({ isSubmitted, control }) => {
  return (
    <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:mt-[40px] md:mt-[40px] mt-[40px]">
      <div className="w-full">
        <div className="flex items-center gap-[10px] mb-[30px] h-[48px]">
          <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F8F7F5] flex items-center justify-center p-[14px]">
            <Clock1220Icon fillcolor={"fill-primary-color-P1"} />
          </div>
          <div className="flex flex-col justify-center h-[48px]">
            <h3 className="MT-SB-1 text-sm leading-none">Age restriction</h3>
            <p className="text-xs leading-none mt-1">Define your preferred student age groups</p>
          </div>
        </div>

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
    </div>
  );
};

export default StudentAge;
