import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";

// External imports
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { CheckIcon, CloseBoxIcon, GenderIcon } from "../../Icons";

const GenderRestriction = ({ isSubmitted, control }) => {
  return (
    <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:mt-[40px] md:mt-[40px] mt-[40px]">
      <div className="w-full">
        <div className="flex items-center gap-[10px] mb-[30px] h-[48px]">
          <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F8F7F5] flex items-center justify-center p-[14px]">
            <GenderIcon fillcolor={"black"} />
          </div>
          <div className="flex flex-col justify-center h-[48px]">
            <h3 className="MT-SB-1 text-sm leading-none">Gender 2 restriction</h3>
            <p className="text-xs leading-none mt-1">Pick your student gender preference.</p>
          </div>
        </div>

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
    </div>
  );
};

export default GenderRestriction;
